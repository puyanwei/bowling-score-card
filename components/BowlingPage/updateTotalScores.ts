import { BowlNumber, Frame, FrameNumber, Points } from '@/constants/types'

interface UpdateTotalScores {
  frames: Frame[]
  bowlNumber: BowlNumber
  frameNumber: FrameNumber
  first: Points
  second: Points
  third: Points
  didPrevFrameSpare: boolean
  didPrevFrameStrike: boolean
}

export function updateTotalScores({
  frames,
  bowlNumber,
  frameNumber,
  first: resolvedFirst,
  second: resolvedSecond,
  third: resolvedThird,
  didPrevFrameSpare,
  didPrevFrameStrike,
}: UpdateTotalScores): number {
  const currentFrameFirst = convertToNumberScore(resolvedFirst)
  const currentFrameSecond = convertToNumberScore(resolvedSecond)
  const currentFrameThird = convertToNumberScore(resolvedThird)
  const currentFrame = frames[frameNumber - 1]
  const previousFrame = frames[frameNumber - 2]
  const twoFramesBack = frames[frameNumber - 3]
  const isFirstBowl = bowlNumber === 1
  const isThirdBowl = bowlNumber === 3
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
  const isTenthFrameThirdBowl =
    frameNumber === 10 &&
    isThirdBowl &&
    currentFrame.first !== '' &&
    currentFrame.second !== ''

  // If first frame, return the total score
  if (frameNumber === 1) {
    currentFrame.totalScore = currentFrameFirst + currentFrameSecond
    return currentFrameFirst + currentFrameSecond
  }

  // If previous frame is a spare, add the first bowl of the current frame to the previous frame's total score, then use that as the current frame's total score, which is what is returned
  if (didPrevFrameSpare) {
    if (isFirstBowl) previousFrame.totalScore += currentFrameFirst
    if (isTenthFrameThirdBowl)
      return (
        previousFrame.totalScore +
        currentFrameFirst +
        currentFrameSecond +
        currentFrameThird
      )
    return (
      previousFrame.totalScore +
      currentFrameFirst +
      currentFrameSecond +
      currentFrameThird
    )
  }

  // If previous frame is a strike, add the first and second bowls of the current frame to the previous frame's total score
  if (didPrevFrameSingleStrike) {
    const [first, second] = previousFrame.nextTwoBowls
    const nextFirst = convertToNumberScore(first)
    const nextSecond = convertToNumberScore(second)

    isFirstBowl
      ? (previousFrame.totalScore += nextFirst)
      : (previousFrame.totalScore += nextSecond)
    return previousFrame.totalScore + nextFirst + nextSecond + currentFrameThird
  }

  if (didPrevFrameDoubleStrike) {
    if (isFirstBowl) {
      twoFramesBack.totalScore += currentFrameFirst
      previousFrame.totalScore += currentFrameFirst
      return previousFrame.totalScore + currentFrameFirst
    }
    previousFrame.totalScore +=
      currentFrameFirst + currentFrameSecond + currentFrameThird
  }

  if (didPrevFrameTripleStrike) {
    if (isFirstBowl) {
      twoFramesBack.totalScore +=
        convertToNumberScore(previousFrame.first) + currentFrameFirst
      previousFrame.totalScore +=
        convertToNumberScore(previousFrame.first) + currentFrameFirst
      return previousFrame.totalScore + currentFrameFirst
    }
    isTenthFrameThirdBowl
      ? previousFrame.totalScore +
        currentFrameFirst +
        currentFrameSecond +
        currentFrameThird
      : (previousFrame.totalScore +=
          currentFrameFirst + currentFrameSecond + currentFrameThird)
  }

  currentFrame.totalScore =
    previousFrame.totalScore +
    currentFrameFirst +
    currentFrameSecond +
    currentFrameThird

  return (
    previousFrame.totalScore +
    currentFrameFirst +
    currentFrameSecond +
    currentFrameThird
  )
}

export function convertToNumberScore(points: Points): number {
  if (points === '') return 0
  return points as number
}
