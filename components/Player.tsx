import { PlayerNumber, ScoreCard } from '@/constants/types'
import { ReactNode } from 'react'
import { Frame } from './Frame'

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
      <PlayerName>
        <span className={`px-2 break-words self-center text-center col-span-1`}>
          <p
            data-testid={`${playerNumberId}-name`}
            className={currentPlayerStyle}
          >
            {name}
          </p>
        </span>
      </PlayerName>
      {frames.map((frame, index) => (
        <Frame
          testId={`${playerNumberId}-frame-${index + 1}`}
          frame={frame}
          isTenthFrame={frame.frameNumber === 10}
          key={index}
        />
      ))}
    </>
  )
}

function PlayerName({ children }: { children: ReactNode }) {
  return <>{children}</>
}
