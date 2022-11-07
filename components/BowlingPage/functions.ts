import { Dispatch, SetStateAction } from 'react'
import {
  FrameNumber,
  Scores,
  ScoreCard,
  Frame,
  Points,
} from '@/pages/data/types'

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

export function resolveNewFrames(
  scoreCard: ScoreCard[],
  points: Scores,
  isFirstBowl: boolean,
  frameNumber: FrameNumber
): Frame[] {
  return scoreCard[0].frames.map((frame, index) => {
    if (index !== frameNumber) return frame

    const first = isFirstBowl ? resolvePotentialStrike(points) : frame.first
    const second = isFirstBowl
      ? frame.second
      : resolvePotentialSpare(scoreCard, points, frameNumber)
    const frameScore = resolveTotalScore(
      first,
      second,
      isFirstBowl,
      frame.totalScore
    )

    const prevFrameTotalScore = scoreCard[0].frames[index - 1]?.totalScore ?? 0
    const totalScore = frameScore + prevFrameTotalScore
    const didPrevFrameSpare = resolveDidPrevFrameSpare(scoreCard, index)
    const didPrevFrameStrike = resolveDidPrevFrameStrike(scoreCard, index)

    return {
      ...frame,
      first,
      second,
      totalScore,
      didPrevFrameSpare,
      didPrevFrameStrike,
    }
  })
  // Add logic to include the bonus points
}

function resolveTotalScore(
  first: Scores,
  second: Scores,
  isFirstBowl: boolean,
  currentTotalScore: number
): Points {
  if (isFirstBowl)
    return (convertToNumberScore(first) + currentTotalScore) as Points
  console.log({ first, second })
  if (second === '/') return 10
  return (convertToNumberScore(first) + convertToNumberScore(second)) as Points
}

export function convertToNumberScore(points: Scores): Points {
  if (points === 'X') return 10
  if (points === '') return 0
  return parseInt(points) as Points
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

export function resolvePotentialStrike(points: Scores) {
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
