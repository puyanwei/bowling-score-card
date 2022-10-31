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
  | 'X'
  | 'n/a'

export interface Frame {
  frame: number
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

export const playerScores: Frame[] = [
  {
    frame: 1,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 5,
  },
  {
    frame: 2,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 10,
  },
  {
    frame: 3,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 15,
  },
  {
    frame: 4,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 20,
  },
  {
    frame: 5,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 25,
  },
  {
    frame: 6,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 30,
  },
  {
    frame: 7,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 35,
  },
  {
    frame: 8,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 40,
  },
  {
    frame: 9,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 45,
  },
  {
    frame: 10,
    first: '2',
    second: '3',
    third: 'n/a',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 5,
  },
]

export const scoreCard: ScoreCard[] = [
  { name: 'Player 1', frames: playerScores },
  { name: 'Player 2', frames: playerScores },
]
