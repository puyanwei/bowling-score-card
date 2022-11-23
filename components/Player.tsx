import { ScoreCard } from '@/constants/types'
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
  const currentPlayerStyle = isCurrentPlayer ? 'underline' : 'none'
  return (
    <>
      <PlayerName className={`${currentPlayerStyle} col-span-1`} name={name} />
      {frames.map((frame, index) => (
        <Frame
          testId={`${name} frame-${index + 1}`}
          className=''
          frame={frame}
          isTenthFrame={frame.frameNumber === 10}
          key={index}
        />
      ))}
    </>
  )
}

interface PlayerName {
  name: string
  className: string
}

function PlayerName({ name, className }: PlayerName) {
  return (
    <div className={`px-2 break-words self-center ${className}`}>{name}</div>
  )
}
