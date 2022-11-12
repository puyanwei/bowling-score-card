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
  currentBowl: Scores,
  isFirstBowl: boolean,
  frameNumber: FrameNumber
): Frame[] {
  return scoreCard[0].frames.map((frame: Frame, index) => {
    if (index !== frameNumber - 1) return frame
    const previousFrame = scoreCard[0].frames[index - 1]

    const first: Scores = isFirstBowl ? currentBowl : frame.first
    const second: Scores = !isFirstBowl ? currentBowl : frame.second

    const didPrevFrameSpare =
      parseInt(previousFrame?.first) + parseInt(previousFrame?.second) === 10
    const didPrevFrameStrike = parseInt(previousFrame?.first) === 10

    const nextTwoBowls: [Scores, Scores] = updateNextTwoBowls(
      scoreCard[0].frames,
      frameNumber,
      first,
      second,
      didPrevFrameStrike
    )
    const totalScore: number = updateTotalScores({
      frames: scoreCard[0].frames,
      isFirstBowl,
      frameNumber,
      first,
      second,
      didPrevFrameSpare,
      didPrevFrameStrike,
      nextTwoBowls,
    })

    return {
      ...frame,
      first,
      second,
      didPrevFrameSpare,
      didPrevFrameStrike,
      totalScore,
      nextTwoBowls,
    }
  })
}

export function updateNextTwoBowls(
  frames: Frame[],
  frameNumber: FrameNumber,
  first: Scores,
  second: Scores,
  didPrevFrameStrike: boolean
): [Scores, Scores] {
  const fourFramesBack = frames[frameNumber - 5]
  const threeFramesBack = frames[frameNumber - 4]
  const twoFramesBack = frames[frameNumber - 3]
  const previousFrame = frames[frameNumber - 2]
  const currentFrame = frames[frameNumber - 1]
  const isSingleStrike = didPrevFrameStrike && !previousFrame.didPrevFrameStrike
  const isDoubleStrike =
    didPrevFrameStrike &&
    previousFrame.didPrevFrameStrike &&
    !twoFramesBack.didPrevFrameStrike
  const isTripleStrike =
    didPrevFrameStrike &&
    previousFrame.didPrevFrameStrike &&
    twoFramesBack.didPrevFrameStrike
  // No need to update previuos frame if it is the first frame
  if (currentFrame.frameNumber === 1) return ['', '']

  // If current fram is a strike, update previous frame
  if (first === 'X') {
    previousFrame.nextTwoBowls = ['X', '']
  }

  if (isSingleStrike) {
    // If previous frame is a strike, update previous frame and the one before it
    previousFrame.nextTwoBowls = [first, second]
    if (currentFrame.frameNumber > 2) twoFramesBack.nextTwoBowls = ['X', first]
  }

  if (isDoubleStrike) {
    previousFrame.nextTwoBowls = [first, second]
    twoFramesBack.nextTwoBowls = ['X', first]
    if (currentFrame.frameNumber > 3) threeFramesBack.nextTwoBowls = ['X', 'X']
  }

  if (isTripleStrike) {
    previousFrame.nextTwoBowls = [first, second]
    twoFramesBack.nextTwoBowls = ['X', first]
    threeFramesBack.nextTwoBowls = ['X', 'X']
    if (currentFrame.frameNumber > 4) fourFramesBack.nextTwoBowls = ['X', 'X']
  }
  // Default is to update previous frame's next two bowls which is the current frame's first and second bowls if no strikes
  previousFrame.nextTwoBowls = [first, second]
  return ['', '']
}

interface UpdateTotalScores {
  frames: Frame[]
  isFirstBowl: boolean
  frameNumber: FrameNumber
  first: Scores
  second: Scores
  didPrevFrameSpare: boolean
  didPrevFrameStrike: boolean
  nextTwoBowls: [Scores, Scores]
}

export function updateTotalScores({
  frames,
  isFirstBowl,
  frameNumber,
  first: resolvedFirst,
  second: resolvedSecond,
  didPrevFrameSpare,
  didPrevFrameStrike,
  nextTwoBowls,
}: UpdateTotalScores): number {
  const first = convertToNumberScore(resolvedFirst)
  const second = convertToNumberScore(resolvedSecond)

  const previousFrame = frames[frameNumber - 2]
  const currentFrame = frames[frameNumber - 1]

  if (frameNumber === 1) {
    // If first frame, return the total score
    currentFrame.totalScore = first + second
    return first + second
  }

  if (didPrevFrameSpare) {
    console.log(123)
    // If previous frame is a spare, add the first bowl of the current frame to the previous frame's total score
    if (isFirstBowl) previousFrame.totalScore += first
    return previousFrame.totalScore + first + second
  }

  if (didPrevFrameStrike) {
    // If previous frame is a strike, add the first and second bowls of the current frame to the previous frame's total score
    previousFrame.totalScore += first + second
  }

  // double and triple strikes

  currentFrame.totalScore = previousFrame.totalScore + first + second
  return previousFrame.totalScore + first + second
}

export function convertToNumberScore(points: Scores): Points {
  if (points === 'X') return 10
  if (points === '/') return 10
  if (points === '') return 0
  return parseInt(points) as Points
}

export function resolveFirstBowlSymbol(points: Scores) {
  return points === '10' ? 'X' : points
}

export function isStrike(points: Scores): boolean {
  return points === '10'
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
