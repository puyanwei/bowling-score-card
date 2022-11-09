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
    if (index !== frameNumber) return frame

    const first: Scores = isFirstBowl ? resolveFirstBowl(points) : frame.first
    const second: Scores = isFirstBowl
      ? frame.second
      : resolveSecondBowl(scoreCard, points, frameNumber)

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

    if (didPrevFrameSpare && isFirstBowl)
      updatePreviousFrameTotalScoreIfSpare(scoreCard, index, first)

    if (didPrevFrameStrike && !isFirstBowl)
      updatePreviousFrameTotalScoreIfStrike(scoreCard, index, first, second)

    // Need to account for 2 strikes in a row as another condition

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

function updatePreviousFrameTotalScoreIfSpare(
  scoreCard: ScoreCard[],
  index: number,
  first: Scores
): void {
  const prevFrameTotalScore = scoreCard[0].frames[index - 1].totalScore
  scoreCard[0].frames[index - 1].totalScore =
    prevFrameTotalScore + parseInt(first)
}

function updatePreviousFrameTotalScoreIfStrike(
  scoreCard: ScoreCard[],
  index: number,
  first: Scores,
  second: Scores
): void {
  const prevFrameTotalScore = scoreCard[0].frames[index - 1].totalScore
  scoreCard[0].frames[index - 1].totalScore =
    prevFrameTotalScore + parseInt(first) + parseInt(second)
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
