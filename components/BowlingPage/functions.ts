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
  return scoreCard[0].frames.map((frame: Frame, index) => {
    if (index !== frameNumber - 1) return frame

    const first: Scores = isFirstBowl ? resolveFirstBowl(points) : frame.first
    const second: Scores = isFirstBowl
      ? frame.second
      : resolveSecondBowl(scoreCard, points, (frameNumber - 1) as FrameNumber)
    const didPrevFrameSpare = resolveDidPrevFrameSpare(scoreCard, index)
    const didPrevFrameStrike = resolveDidPrevFrameStrike(scoreCard, index)

    const nextTwoBowls = updateNextTwoBowls(
      scoreCard[0].frames,
      frameNumber,
      first,
      second,
      didPrevFrameStrike
    )
    // const totalScore = updateTotalscore(scoreCard[0].frames,
    // frameNumber,
    // first,
    // second,
    // didPrevFrameSpare, didPrevFrameStrike, nextTwoBowls)

    return {
      ...frame,
      first,
      second,
      didPrevFrameSpare,
      didPrevFrameStrike,
      // totalScore,
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
  console.log({ previousFrame })
  // No need to update previuos frame if it is the first frame
  if (currentFrame.frameNumber === 1) return ['', '']

  // If current fram is a strike, update previous frame
  if (first === 'X') {
    previousFrame.nextTwoBowls = ['X', '']
  }

  if (isSingleStrike) {
    console.log(82)
    // If previous frame is a strike, update previous frame and the one before it
    previousFrame.nextTwoBowls = [first, second]
    if (currentFrame.frameNumber > 2) twoFramesBack.nextTwoBowls = ['X', first]
  }

  if (isDoubleStrike) {
    console.log(89)
    previousFrame.nextTwoBowls = [first, second]
    twoFramesBack.nextTwoBowls = ['X', first]
    if (currentFrame.frameNumber > 3) threeFramesBack.nextTwoBowls = ['X', 'X']
  }

  if (isTripleStrike) {
    console.log(96)
    previousFrame.nextTwoBowls = [first, second]
    twoFramesBack.nextTwoBowls = ['X', first]
    threeFramesBack.nextTwoBowls = ['X', 'X']
    if (currentFrame.frameNumber > 4) fourFramesBack.nextTwoBowls = ['X', 'X']
  }
  // Default is to update previous frame's next two bowls which is the current frame's first and second bowls if no strikes
  previousFrame.nextTwoBowls = [first, second]
  return ['', '']
}

export function updateTotalScores(
  frames: Frame[],
  isFirstBowl: boolean,
  totalScore: number,
  setTotalScore: Dispatch<SetStateAction<number>>
): Frame[] {
  return frames.map((frame) => {
    const {
      first: firstBowl,
      second: secondBowl,
      didPrevFrameSpare,
      didPrevFrameStrike,
    } = frame
    const first = convertToNumberScore(firstBowl)
    const second = convertToNumberScore(secondBowl)

    const isNormalFirstBowl =
      isFirstBowl && !didPrevFrameSpare && !didPrevFrameStrike
    const isNormalSecondBowl =
      !isFirstBowl && !didPrevFrameSpare && !didPrevFrameStrike
    const isPrevFrameSpareFirstBowl =
      isFirstBowl && didPrevFrameSpare && !didPrevFrameStrike
    const isPrevFrameSpareSecondBowl =
      !isFirstBowl && didPrevFrameSpare && !didPrevFrameStrike
    const isPrevFrameStrikeFirstBowl =
      isFirstBowl && !didPrevFrameSpare && didPrevFrameStrike
    const isPrevFrameStrikeSecondtBowl =
      !isFirstBowl && !didPrevFrameSpare && didPrevFrameStrike

    if (isNormalFirstBowl) {
      setTotalScore(totalScore + first)
      return { ...frame, totalScore }
    }
    if (isNormalSecondBowl) {
      setTotalScore(totalScore + second)
      return { ...frame, totalScore }
    }
    return frame
  })
  //   if (isNormalSecondBowl) return second === 10 ? second : first + second
  //   if (isPrevFrameSpareFirstBowl) {
  //     // Previous frame adjusted total score
  //     scoreCard[0].frames[index - 1].totalScore += first
  //     // Current frame adjusted total score
  //     return scoreCard[0].frames[index].totalScore + first
  //   }
  //   if (isPrevFrameStrikeFirstBowl) {
  //     // Double/triple strike
  //   }
  //   if (isPrevFrameStrikeSecondtBowl) {
  //     // Previous frame adjusted total score
  //     scoreCard[0].frames[index - 1].totalScore += first + second
  //     // Current frame adjusted total score
  //     return scoreCard[0].frames[index].totalScore
  //   }

  //   if (isPrevFrameSpareSecondBowl) return first + second
  //   return 0
  //   // const frameTotal = updateTotalScores(
  //   //   first,
  //   //   second,
  //   //   isFirstBowl,
  //   //   scoreCard,
  //   //   didPrevFrameSpare,
  //   //   didPrevFrameStrike,
  //   //   index
  //   // )
  //   const prevFrameTotalScore = scoreCard[0].frames[index - 1]?.totalScore ?? 0
  //   const totalScore = frameTotal + prevFrameTotalScore
  // }
}

export function convertToNumberScore(points: Scores): Points {
  if (points === 'X') return 10
  if (points === '/') return 10
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
