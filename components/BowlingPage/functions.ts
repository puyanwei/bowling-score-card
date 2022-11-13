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

    const first: Scores = resolveFirstBowl(currentBowl, frame, isFirstBowl)
    const second: Scores = resolveSecondBowl(currentBowl, frame, isFirstBowl)
    const third: Scores = resolveThirdBowl(currentBowl, frame, isFirstBowl)

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
    })

    return {
      ...frame,
      first,
      second,
      third,
      didPrevFrameSpare,
      didPrevFrameStrike,
      totalScore,
      nextTwoBowls,
    }
  })
}

function resolveFirstBowl(
  currentBowl: Scores,
  frame: Frame,
  isFirstBowl: boolean
): Scores {
  if (frame.frameNumber !== 10) return isFirstBowl ? currentBowl : frame.first
  return isFirstBowl && frame.first === '' ? currentBowl : frame.first
}

function resolveSecondBowl(
  currentBowl: Scores,
  frame: Frame,
  isFirstBowl: boolean
): Scores {
  if (frame.frameNumber !== 10) !isFirstBowl ? currentBowl : frame.second
  return !isFirstBowl && frame.second === '' ? currentBowl : frame.second
}
function resolveThirdBowl(
  currentBowl: Scores,
  frame: Frame,
  isFirstBowl: boolean
): Scores {
  if (frame.frameNumber !== 10) return ''
  return isFirstBowl && frame.first !== '' && frame.second !== ''
    ? currentBowl
    : ''
}

export function updateNextTwoBowls(
  frames: Frame[],
  frameNumber: FrameNumber,
  first: Scores,
  second: Scores,
  didPrevFrameStrike: boolean
): [Scores, Scores] {
  const currentFrame = frames[frameNumber - 1]
  const previousFrame = frames[frameNumber - 2]
  const twoFramesBack = frames[frameNumber - 3]
  const threeFramesBack = frames[frameNumber - 4]
  const fourFramesBack = frames[frameNumber - 5]
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
  if (first === '10') {
    previousFrame.nextTwoBowls = ['10', '']
  }

  if (isSingleStrike) {
    // If previous frame is a strike, update previous frame and the one before it
    previousFrame.nextTwoBowls = [first, second]
    if (currentFrame.frameNumber > 2) twoFramesBack.nextTwoBowls = ['10', first]
  }

  if (isDoubleStrike) {
    previousFrame.nextTwoBowls = [first, second]
    twoFramesBack.nextTwoBowls = ['10', first]
    if (currentFrame.frameNumber > 3)
      threeFramesBack.nextTwoBowls = ['10', '10']
  }

  if (isTripleStrike) {
    previousFrame.nextTwoBowls = [first, second]
    twoFramesBack.nextTwoBowls = ['10', first]
    threeFramesBack.nextTwoBowls = ['10', '10']
    if (currentFrame.frameNumber > 4) fourFramesBack.nextTwoBowls = ['10', '10']
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
}

export function updateTotalScores({
  frames,
  isFirstBowl,
  frameNumber,
  first: resolvedFirst,
  second: resolvedSecond,
  didPrevFrameSpare,
  didPrevFrameStrike,
}: UpdateTotalScores): number {
  const currentFrameFirst = convertToNumberScore(resolvedFirst)
  const currentFrameSecond = convertToNumberScore(resolvedSecond)

  const currentFrame = frames[frameNumber - 1]
  const previousFrame = frames[frameNumber - 2]
  const twoFramesBack = frames[frameNumber - 3]
  const didPrevFrameSingleStrike =
    didPrevFrameStrike && !previousFrame?.didPrevFrameStrike
  const didPrevFrameDoubleStrike =
    didPrevFrameStrike &&
    previousFrame?.didPrevFrameStrike &&
    !twoFramesBack?.didPrevFrameStrike
  const didPrevFrameTripleStrike =
    didPrevFrameStrike &&
    previousFrame?.didPrevFrameStrike &&
    twoFramesBack?.didPrevFrameStrike

  // If first frame, return the total score
  if (frameNumber === 1) {
    currentFrame.totalScore = currentFrameFirst + currentFrameSecond
    return currentFrameFirst + currentFrameSecond
  }

  // If previous frame is a spare, add the first bowl of the current frame to the previous frame's total score
  if (didPrevFrameSpare) {
    if (isFirstBowl) previousFrame.totalScore += currentFrameFirst
    return previousFrame.totalScore + currentFrameFirst + currentFrameSecond
  }

  // If previous frame is a strike, add the first and second bowls of the current frame to the previous frame's total score
  if (didPrevFrameSingleStrike) {
    const [first, second] = previousFrame.nextTwoBowls
    const nextFirst = convertToNumberScore(first)
    const nextSecond = convertToNumberScore(second)

    isFirstBowl
      ? (previousFrame.totalScore += nextFirst)
      : (previousFrame.totalScore += nextSecond)
    return previousFrame.totalScore + nextFirst + nextSecond
  }

  if (didPrevFrameDoubleStrike) {
    if (isFirstBowl) {
      twoFramesBack.totalScore += currentFrameFirst
      previousFrame.totalScore += currentFrameFirst
      return previousFrame.totalScore + currentFrameFirst
    }
    previousFrame.totalScore += currentFrameFirst + currentFrameSecond
  }

  if (didPrevFrameTripleStrike) {
    if (isFirstBowl) {
      twoFramesBack.totalScore +=
        convertToNumberScore(previousFrame.first) + currentFrameFirst
      previousFrame.totalScore +=
        convertToNumberScore(previousFrame.first) + currentFrameFirst
      return previousFrame.totalScore + currentFrameFirst
    }
    previousFrame.totalScore += currentFrameFirst + currentFrameSecond
  }

  currentFrame.totalScore =
    previousFrame.totalScore + currentFrameFirst + currentFrameSecond
  return previousFrame.totalScore + currentFrameFirst + currentFrameSecond
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
