import { Dispatch, SetStateAction } from 'react'
import {
  FrameNumber,
  Scores,
  ScoreCard,
  Frame,
  Points,
} from '@/pages/data/types'

export function resolveNewFrames(
  scoreCard: ScoreCard[],
  points: Scores,
  isFirstBowl: boolean,
  frameNumber: FrameNumber
): Frame[] {
  return scoreCard[0].frames.map((frame, index) => {
    if (index !== frameNumber - 1) return frame

    const first: Scores = isFirstBowl ? resolveFirstBowl(points) : frame.first
    const second: Scores = isFirstBowl
      ? frame.second
      : resolveSecondBowl(scoreCard, points, (frameNumber - 1) as FrameNumber)

    const didPrevFrameSpare = resolveDidPrevFrameSpare(scoreCard, index)
    const didPrevFrameStrike = resolveDidPrevFrameStrike(scoreCard, index)

    const frameScore = resolveTotalScore(
      first,
      second,
      isFirstBowl,
      frame.totalScore,
      didPrevFrameSpare,
      didPrevFrameStrike
    )

    const prevFrameTotalScore = scoreCard[0].frames[index - 1]?.totalScore ?? 0
    const totalScore = frameScore + prevFrameTotalScore

    return {
      ...frame,
      first,
      second,
      totalScore,
      didPrevFrameSpare,
      didPrevFrameStrike,
    }
  })
}

export function resolveRemainingPins(
  points: Scores,
  isFirstBowl: boolean,
  remainingPins: FrameNumber,
  setRemainingPins: Dispatch<SetStateAction<FrameNumber>>
): void {
  isFirstBowl
    ? setRemainingPins((remainingPins - parseInt(points)) as FrameNumber)
    : setRemainingPins(10)
}

export function updateNextTwoBowls(
  frames: Frame[],
  frameNumber: FrameNumber
): Frame[] {
  const fourFramesBack = frames[frameNumber - 5]
  const threeFramesBack = frames[frameNumber - 4]
  const twoFramesBack = frames[frameNumber - 3]
  const previousFrame = frames[frameNumber - 2]
  const currentFrame = frames[frameNumber - 1]
  const isSingleStrike =
    currentFrame.didPrevFrameStrike && !previousFrame.didPrevFrameStrike
  const isDoubleStrike =
    currentFrame.didPrevFrameStrike &&
    previousFrame.didPrevFrameStrike &&
    !twoFramesBack.didPrevFrameStrike
  const isTripleStrike =
    currentFrame.didPrevFrameStrike &&
    previousFrame.didPrevFrameStrike &&
    twoFramesBack.didPrevFrameStrike

  // No need to update previuos frame if it is the first frame
  if (currentFrame.frameNumber === 1) return frames

  // If current fram is a strike, update previous frame
  if (currentFrame.first === 'X') {
    previousFrame.nextTwoBowls = ['X', '']
  }

  if (isSingleStrike) {
    // If previous frame is a strike, update previous frame and the one before it
    previousFrame.nextTwoBowls = [currentFrame.first, currentFrame.second]
    if (currentFrame.frameNumber > 2)
      twoFramesBack.nextTwoBowls = ['X', currentFrame.first]
    return frames
  }

  if (isDoubleStrike) {
    previousFrame.nextTwoBowls = [currentFrame.first, currentFrame.second]
    twoFramesBack.nextTwoBowls = ['X', currentFrame.first]
    if (currentFrame.frameNumber > 3) threeFramesBack.nextTwoBowls = ['X', 'X']
    return frames
  }

  if (isTripleStrike) {
    previousFrame.nextTwoBowls = [currentFrame.first, currentFrame.second]
    twoFramesBack.nextTwoBowls = ['X', currentFrame.first]
    threeFramesBack.nextTwoBowls = ['X', 'X']
    if (currentFrame.frameNumber > 4) fourFramesBack.nextTwoBowls = ['X', 'X']
    return frames
  }

  // Default is to update previous frame's next two bowls which is the current frame's first and second bowls if no strikes
  previousFrame.nextTwoBowls = [currentFrame?.first, currentFrame?.second]
  return frames
}

function updateFrameTotal(
  scoreCard: ScoreCard[],
  targetFrameFromIndex: number,
  totalScore: number
) {
  if (!scoreCard || !scoreCard.length) return null
  scoreCard[0].frames[targetFrameFromIndex].totalScore = totalScore
}

function resolveTotalScore(
  firstBowl: Scores,
  secondBowl: Scores,
  isFirstBowl: boolean,
  currentTotalScore: number,
  didPrevFrameSpare: boolean,
  didPrevFrameStrike: boolean
): Points {
  const first = convertToNumberScore(firstBowl)
  const second = convertToNumberScore(secondBowl)

  if (isFirstBowl) return (first + currentTotalScore) as Points
  if (secondBowl === '/') return 10
  return (first + second) as Points
}

export function convertToNumberScore(points: Scores): Points {
  if (points === 'X') return 10
  if (points === '') return 0
  return parseInt(points) as Points
}

export function resolveSecondBowl(
  scoreCard: ScoreCard[],
  points: string,
  frameNumber: FrameNumber
): Scores {
  const firstBowl = scoreCard[0].frames[frameNumber].first
  const secondBowl = points
  return parseInt(firstBowl) + parseInt(secondBowl) === 10
    ? '/'
    : (secondBowl as Scores)
}

export function resolveFirstBowl(points: Scores) {
  return points === '10' ? 'X' : points
}

export function isStrike(points: Scores): boolean {
  return points === '10'
}
export function resolveDidPrevFrameSpare(
  scoreCard: ScoreCard[],
  index: number
): boolean {
  return scoreCard[0].frames[index - 1]?.second === '/'
}

export function resolveDidPrevFrameStrike(
  scoreCard: ScoreCard[],
  index: number
): boolean {
  return scoreCard[0].frames[index - 1]?.first === 'X'
}
