import { useState, MouseEvent } from 'react'
import { initialScoreCard, labels } from '@/pages/data/initialScoreCard'
import { Player } from '../Player'
import { Frame, FrameNumber, ScoreCard, Scores } from '@/pages/data/types'
import { resolveRemainingPins, resolveNewFrames, isStrike } from './functions'
import { parse } from 'path'

export function BowlingPage() {
  const [scoreCard, setScoreCard] = useState<ScoreCard[]>(initialScoreCard)
  const [isFirstBowl, setIsFirstBowl] = useState<boolean>(true)
  const [frameNumber, setFrameNumber] = useState<FrameNumber>(1)
  const [remainingPins, setRemainingPins] = useState<FrameNumber>(10)
  const [gameOver, setGameOver] = useState<boolean>(false)

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const currentBowl = e.currentTarget.innerText as Scores
    resolveRemainingPins(
      currentBowl,
      isFirstBowl,
      remainingPins,
      setRemainingPins
    )
    const frames = resolveNewFrames(
      scoreCard,
      currentBowl,
      isFirstBowl,
      frameNumber
    )

    console.log({ frames })
    setScoreCard([{ ...scoreCard[0], frames }])
    updateBoardPosition(currentBowl)
    if (isGameOver(frames, frameNumber)) setGameOver(true)
  }

  function isGameOver(frames: Frame[], frameNumber: FrameNumber): boolean {
    const { first, second, third } = frames[frameNumber - 1]
    const isNotSpare =
      (parseInt(first) + parseInt(second) === 10 && second !== '') ||
      parseInt(second)
    console.log(
      '%cindex.tsx line:38 first, second, third',
      'color: #007acc;',
      first,
      Boolean(first),
      second,
      Boolean(second),
      third,
      Boolean(third)
    )
    if (frameNumber !== 10) return false

    if (second === '' && third === '') return false
    if (first === '10' && third === '') return false
    if (parseInt(first) + parseInt(second) === 10 && third === '') return false
    if (!!first && !!second && !!third) return true
    return true
  }

  function updateBoardPosition(currentBowl: Scores) {
    if (isStrike(currentBowl) && frameNumber !== 10) {
      setRemainingPins(10)
      setFrameNumber((frameNumber + 1) as FrameNumber)
      return
    }
    setIsFirstBowl(!isFirstBowl)
    if (!isFirstBowl && frameNumber !== 10)
      setFrameNumber((frameNumber + 1) as FrameNumber)

    // Tenth frame first bowl strike
    if (isStrike(currentBowl) && frameNumber === 10) setRemainingPins(10)
    return
  }

  function reset() {
    setScoreCard([...initialScoreCard])
    setIsFirstBowl(true)
    setFrameNumber(1)
    setRemainingPins(10)
    setGameOver(false)
    console.log(scoreCard)
  }
  return (
    <div data-testid='bowling-page'>
      <h1 className='mt-4 text-center text-7xl'>Bowling Scorecard</h1>
      {scoreCard.map((player, index) => (
        <Player scoreCard={player} key={index} />
      ))}
      <br />
      <div className='text-center'>
        {!gameOver &&
          labels.map((score, index) => (
            <button
              data-testid={`button-${index}`}
              className='px-4 py-1 m-1 rounded enabled:hover:text-white bg-slate-200 enabled:hover:bg-slate-800 disabled:opacity-50 disabled:hover:none'
              key={index}
              onClick={handleClick}
              disabled={index > remainingPins}
            >
              {score}
            </button>
          ))}
        {gameOver && (
          <div className='my-4 text-5xl' data-testid='game-over'>
            <h2>Game Over!</h2>
          </div>
        )}
        <button
          data-testid='button-reset'
          className='px-4 py-1 mx-2 rounded bg-slate-200 hover:bg-slate-800 hover:text-white'
          onClick={() => reset()}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

//  Outline css not quite lining up correctly
//  Is there a better way of doing the grid?
