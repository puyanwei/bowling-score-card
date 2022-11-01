import { useState, MouseEvent } from 'react'
import { initialScoreCard, labels } from '@/pages/data'
import { Player } from './Player'
import { Frame, ScoreCard, Scores } from '@/pages/data/types'

export function BowlingPage() {
  const [scoreCard, setScoreCard] = useState<ScoreCard[]>(initialScoreCard)
  const [isFirstBowl, setIsFirstBowl] = useState<boolean>(true)
  const [frameNumber, setFrameNumber] = useState<number>(0)
  const [remainingPins, setRemainingPins] = useState<number>(10)

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const points = e.currentTarget.innerText as Scores

    isFirstBowl
      ? setRemainingPins(remainingPins - parseInt(points))
      : setRemainingPins(10)

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
  console.log({ remainingPins })
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
            className='px-4 py-1 m-1 rounded enabled:hover:text-white bg-slate-200 enabled:hover:bg-slate-800 disabled:opacity-50 disabled:hover:none'
            key={index}
            onClick={handleClick}
            disabled={index > remainingPins}
          >
            {score}
          </button>
        ))}
      </div>
    </>
  )
}

//  Outline css not quite lining up correctly
//  Is there a better way of doing the grid?
