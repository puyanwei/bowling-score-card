export type Scores =
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
  | 'X'
  | '/'
  | ''

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

export type FrameNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type Points = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface Frame {
  frameNumber: number
  first: Scores
  second: Scores
  third?: Scores
  didPrevFrameStrike: boolean
  didPrevFrameSpare: boolean
  totalScore: number
  nextTwoBowls: [Scores, Scores]
}

export interface ScoreCard {
  name: string
  frames: Frame[]
}
