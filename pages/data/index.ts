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

export const playerScores: Frame[] = [
  {
    frameNumber: 1,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 5,
  },
  {
    frameNumber: 2,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 10,
  },
  {
    frameNumber: 3,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 15,
  },
  {
    frameNumber: 4,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 20,
  },
  {
    frameNumber: 5,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 25,
  },
  {
    frameNumber: 6,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 30,
  },
  {
    frameNumber: 7,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 35,
  },
  {
    frameNumber: 8,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 40,
  },
  {
    frameNumber: 9,
    first: '2',
    second: '3',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 45,
  },
  {
    frameNumber: 10,
    first: '2',
    second: '3',
    third: '',
    didPrevFrameStrike: false,
    didPrevFrameSpare: false,
    currentScore: 5,
  },
]

export const scoreCard: ScoreCard[] = [
  { name: 'Player 1', frames: playerScores },
  { name: 'Player 2', frames: playerScores },
]
