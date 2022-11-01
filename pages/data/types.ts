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
  | '/'
  | 'X'
  | ''

export interface Frame {
  frameNumber: number
  first: Scores
  second: Scores
  third?: Scores
  didPrevFrameStrike: boolean
  didPrevFrameSpare: boolean
  currentScore: number
}

export interface ScoreCard {
  name: string
  frames: Frame[]
}
