import { useState, MouseEvent } from 'react'
import { initialScoreCard, labels } from '@/pages/data'
import { Player } from '../Player'
import { FrameNumber, ScoreCard, Scores } from '@/pages/data/types'
import { resolveRemainingPins, resolveNewFrames, isStrike } from './functions'

export function BowlingPage() {
  const [scoreCard, setScoreCard] = useState<ScoreCard[]>(initialScoreCard)
  const [isFirstBowl, setIsFirstBowl] = useState<boolean>(true)
  const [frameNumber, setFrameNumber] = useState<FrameNumber>(1)
  const [remainingPins, setRemainingPins] = useState<FrameNumber>(10)

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

    setScoreCard([{ ...scoreCard[0], frames }])
    updateBoardPosition(currentBowl)
  }

  function updateBoardPosition(currentBowl: Scores) {
    if (isStrike(currentBowl)) {
      setRemainingPins(10)
      setFrameNumber((frameNumber + 1) as FrameNumber)
    } else {
      setIsFirstBowl(!isFirstBowl)
      if (isFirstBowl === false)
        setFrameNumber((frameNumber + 1) as FrameNumber)
    }
  }

  function reset() {
    setScoreCard(initialScoreCard)
    setIsFirstBowl(true)
    setFrameNumber(1)
    setRemainingPins(10)
  }

  return (
    <div data-testid='bowling-page'>
      <h1 className='mt-4 text-center text-7xl'>Bowling Scorecard</h1>
      {scoreCard.map((player, index) => (
        <Player scoreCard={player} key={index} />
      ))}
      <br />
      <div>
        {labels.map((score, index) => (
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
