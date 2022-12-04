import { PlayerNumber, ScoreCard } from '@/constants/types'
import { ReactNode } from 'react'
import { Frame } from './Frame'
import PlayerName from './PlayerName'

interface PlayerProps {
  scoreCard: ScoreCard
  isCurrentPlayer: boolean
  index: PlayerNumber
  totalPlayers: PlayerNumber
}

export function Player({
  scoreCard,
  isCurrentPlayer,
  index,
  totalPlayers,
}: PlayerProps) {
  const { name, frames } = scoreCard
  if (!name) throw new Error('Player name not found')
  if (!frames || !frames.length) throw new Error('Scorecard data not found')

  const currentPlayerStyle = isCurrentPlayer ? 'underline' : 'none'
  const playerNumberId = `player-${index + 1}`
  return (
    <>
      <PlayerName
        testId={`${playerNumberId}-name`}
        name={name}
        className={currentPlayerStyle}
      />
      {frames.map((frame, index) => (
        <>
          <Frame
            testId={`${playerNumberId}-frame-${index + 1}`}
            frame={frame}
            isTenthFrame={frame.frameNumber === 10}
            key={index}
          />
        </>
      ))}
    </>
  )
}
