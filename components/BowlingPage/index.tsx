import { useState, MouseEvent, Dispatch, SetStateAction } from 'react'
import { initialScoreCard, labels } from '@/constants/initialScoreCard'
import { Player } from '../Player'
import {
  BowlNumber,
  Frame,
  FrameNumber,
  Points,
  ScoreCard,
} from '@/constants/types'
import { updateNextTwoBowls } from './updateNextTwoBowls'
import { updateTotalScores } from './updateTotalScores'
import { PointsButtons } from '../PointsButtons'

export function BowlingPage() {
  const [scoreCard, setScoreCard] = useState<ScoreCard[]>(initialScoreCard)
  const [bowlNumber, setBowlNumber] = useState<BowlNumber>(1)
  const [frameNumber, setFrameNumber] = useState<FrameNumber>(1)
  const [remainingPins, setRemainingPins] = useState<number>(10)
  const [gameOver, setGameOver] = useState<boolean>(false)

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const currentBowl = parseInt(e.currentTarget.innerText) as Points
    resolveRemainingPins(currentBowl, bowlNumber)
    const frames = resolveNewFrames(
      scoreCard,
      currentBowl,
      bowlNumber,
      frameNumber
    )

    setScoreCard([{ ...scoreCard[0], frames }])
    updateBoardPosition(currentBowl)
    if (isGameOver(frames, frameNumber)) setGameOver(true)
  }

  function isGameOver(frames: Frame[], frameNumber: FrameNumber): boolean {
    const { first, second, third } = frames[frameNumber - 1]
    if (first === '') return false
    if (!!first && second === '') return false
    if (frameNumber !== 10) return false
    if (second === '' && third === '') return false
    if (first === 10 && third === '') return false
    if (second !== '' && first + second === 10 && third === '') return false
    if (!!first && !!second && !!third) return true
    return true
  }

  function updateBoardPosition(currentBowl: Points) {
    // Tenth frame first bowl strike
    if (frameNumber === 10) {
      if (bowlNumber === 1 && isStrike(currentBowl)) setRemainingPins(10)
      if (bowlNumber === 1) setBowlNumber((bowlNumber + 1) as BowlNumber)
      if (bowlNumber === 2) setBowlNumber((bowlNumber + 1) as BowlNumber)
      return
    }

    // Strike on first bowl
    if (isStrike(currentBowl)) {
      setRemainingPins(10)
      setFrameNumber((frameNumber + 1) as FrameNumber)
      return
    }
    setBowlNumber(bowlNumber === 1 ? 2 : 1)
    if (bowlNumber === 2) setFrameNumber((frameNumber + 1) as FrameNumber)
    return
  }

  function reset() {
    window.location.reload()
  }

  function resolveNewFrames(
    scoreCard: ScoreCard[],
    currentBowl: Points,
    bowlNumber: BowlNumber,
    frameNumber: FrameNumber
  ): Frame[] {
    return scoreCard[0].frames.map((frame: Frame, index) => {
      if (index !== frameNumber - 1) return frame
      const previousFrame = scoreCard[0].frames[index - 1]
      const first = resolveFirstBowl(currentBowl, frame, bowlNumber)
      const second = resolveSecondBowl(currentBowl, frame, bowlNumber)
      const third = resolveThirdBowl(currentBowl, frame, bowlNumber)

      const didPrevFrameSpare = resolveDidPrevFrameSpare(previousFrame)
      const didPrevFrameStrike = previousFrame?.first === 10

      const nextTwoBowls: [Points, Points] = updateNextTwoBowls(
        scoreCard[0].frames,
        frameNumber,
        first,
        second,
        didPrevFrameStrike
      )
      const totalScore: number = updateTotalScores({
        frames: scoreCard[0].frames,
        bowlNumber,
        frameNumber,
        first,
        second,
        third,
        didPrevFrameSpare,
        didPrevFrameStrike,
      })

      const newFrame: Frame = {
        ...frame,
        first,
        second,
        third,
        didPrevFrameSpare,
        didPrevFrameStrike,
        totalScore,
        nextTwoBowls,
      }

      return newFrame
    })
  }

  function resolveDidPrevFrameSpare(previousFrame: Frame): boolean {
    if (previousFrame?.first === '') return false
    if (previousFrame?.second === '') return false
    return previousFrame?.first + previousFrame?.second === 10
  }

  function resolveFirstBowl(
    currentBowl: Points,
    frame: Frame,
    bowlNumber: BowlNumber
  ): Points {
    const isFirstBowl = bowlNumber === 1
    if (frame.frameNumber !== 10) return isFirstBowl ? currentBowl : frame.first
    return isFirstBowl && frame.first === '' ? currentBowl : frame.first
  }

  function resolveSecondBowl(
    currentBowl: Points,
    frame: Frame,
    bowlNumber: BowlNumber
  ): Points {
    const isSecondBowl = bowlNumber === 2
    if (frame.frameNumber !== 10) isSecondBowl ? currentBowl : frame.second
    return isSecondBowl && frame.second === '' ? currentBowl : frame.second
  }
  function resolveThirdBowl(
    currentBowl: Points,
    frame: Frame,
    bowlNumber: BowlNumber
  ): Points {
    const isThirdBowl = bowlNumber === 3
    if (frame.frameNumber !== 10) return ''
    return isThirdBowl && frame.first !== '' && frame.second !== ''
      ? currentBowl
      : ''
  }

  function isStrike(points: Points): boolean {
    return points === 10
  }

  function resolveRemainingPins(points: Points, bowlNumber: BowlNumber): void {
    if (points === '') return
    if (bowlNumber === 1) setRemainingPins(10 - points)
    if (bowlNumber === 2) setRemainingPins(10)
    return
  }

  return (
    <div data-testid='bowling-page border-2'>
      <h1 className='mt-4 text-center text-7xl'>Bowling Scorecard</h1>
      <PlayerForm />
      <div className='p-2 m-2 border-2 rounded-md'>
        {gameOver ? (
          <div className='my-4 text-5xl' data-testid='game-over'>
            <h2>Game Over!</h2>
          </div>
        ) : (
          <PointsButtons
            className='grid grid-cols-11'
            handleClick={handleClick}
            remainingPins={remainingPins}
            reset={reset}
          />
        )}
        {scoreCard.map((player, index) => (
          <Player scoreCard={player} key={index} />
        ))}
      </div>
      <br />
    </div>
  )
}

function PlayerForm() {
  const buttonStyle = `px-4 py-1 mx-2 rounded bg-slate-200 hover:bg-slate-800 hover:text-white text-sm`
  return (
    <div className='p-2 m-2 space-y-2 text-xl border-2 rounded-md'>
      <div>
        <label>{`First player's name?`}</label>
        <input className='border-[1px] border-slate-200 rounded-md ml-2' />
        <button className={buttonStyle}>Submit</button>
      </div>
      <div>
        <label>Add another player</label>
        <button className={buttonStyle}>Add</button>
      </div>
    </div>
  )
}
