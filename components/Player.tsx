import { ScoreCard } from '@/constants/types'
import { ReactNode } from 'react'
import { Frame } from './Frame'

interface PlayerProps {
  scoreCard: ScoreCard
  isCurrentPlayer: boolean
}

export function Player({
  scoreCard: { name, frames },
  isCurrentPlayer,
}: PlayerProps) {
  if (!name) throw new Error('Player name not found')
  if (!frames || !frames.length) throw new Error('Scorecard data not found')

  const currentPlayerStyle = isCurrentPlayer
    ? 'border-[1px] border-slate-400 rounded p-2'
    : 'none'
  return (
    <>
      <PlayerName>
        <span className={`px-2 break-words self-center text-center col-span-1`}>
          <p data-testid={`name-${name}`} className={currentPlayerStyle}>
            {name}
          </p>
        </span>
      </PlayerName>
      {frames.map((frame, index) => (
        <Frame
          testId={`${name} frame-${index + 1}`}
          className=''
          player={name}
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
