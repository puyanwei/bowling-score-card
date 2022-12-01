export type ButtonLabels =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'

export type BowlNumber = 1 | 2 | 3
export type FrameNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type PlayerNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type Points = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | ''

export interface Frame {
  frameNumber: number
  first: Points
  second: Points
  third?: Points
  didPrevFrameStrike: boolean
  didPrevFrameSpare: boolean
  totalScore: number
  nextTwoBowls: [Points, Points]
}

export interface ScoreCard {
  name: string
  frames: Frame[]
}
