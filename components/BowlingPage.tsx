import { useState, MouseEvent } from 'react'
import { initialScoreCard, labels } from '@/pages/data'
import { Player } from './Player'
import { Frame, ScoreCard, Scores } from '@/pages/data/types'

export function BowlingPage() {
  const [scoreCard, setScoreCard] = useState<ScoreCard[]>(initialScoreCard)
  const [isFirstBowl, setIsFirstBowl] = useState<boolean>(true)
  const [frameNumber, setFrameNumber] = useState<number>(0)

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const points = e.currentTarget.innerText as Scores

    const newFrames: Frame[] = scoreCard[0].frames.map((frame, index) => {
      if (index === frameNumber) {
        return isFirstBowl
          ? { ...frame, first: `${points}` }
          : { ...frame, second: `${points}` }
      }
      return frame
    })

    const newScoreCard: ScoreCard[] = [{ ...scoreCard[0], frames: newFrames }]
    setScoreCard(newScoreCard)
    setIsFirstBowl(!isFirstBowl)
    if (isFirstBowl === false) setFrameNumber(frameNumber + 1)
  }
  return (
    <>
      <h1 className='mt-4 text-center text-7xl'>Bowling Scorecard</h1>
      {scoreCard.map((player, index) => (
        <Player scoreCard={player} key={index} />
      ))}
      <br />
      <div>
        {labels.map((score, index) => (
          <button
            className='px-4 py-1 m-1 rounded bg-slate-200'
            key={index}
            onClick={handleClick}
          >
            {score}
          </button>
        ))}
      </div>
    </>
  )
}

//  What are these hydration errors, not matching ui?
//  Outline css not quite lining up correctly
//  Is there a better way of doing the grid?
