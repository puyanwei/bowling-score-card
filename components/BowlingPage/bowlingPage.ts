import { Dispatch, SetStateAction } from 'react'
import { FrameNumber, Scores, ScoreCard, Frame } from '@/pages/data/types'

export function resolveBowlScorePosition(
  isFirstBowl: boolean,
  frameNumber: FrameNumber,
  setFrameNumber: Dispatch<SetStateAction<FrameNumber>>
) {
  if (isFirstBowl === false) setFrameNumber((frameNumber + 1) as FrameNumber)
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

export function resolveNewFrame(
  scoreCard: ScoreCard[],
  points: Scores,
  isFirstBowl: boolean,
  frameNumber: FrameNumber
): Frame[] {
  return scoreCard[0].frames.map((frame, index) => {
    if (index !== frameNumber) return frame

    const resolvedPoints = isFirstBowl
      ? points
      : resolvePotentialSpare(scoreCard, points, frameNumber)

    return isFirstBowl
      ? { ...frame, first: `${resolvedPoints}` }
      : { ...frame, second: `${resolvedPoints}` }
  })
}

export function resolvePotentialSpare(
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
