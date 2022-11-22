import { ScoreCard } from '@/constants/types'
import { Frame } from './Frame'

interface PlayerProps {
  scoreCard: ScoreCard
}

export function Player({ scoreCard: { name, frames } }: PlayerProps) {
  if (!name) throw new Error('Player name not found')
  if (!frames || !frames.length) throw new Error('Scorecard data not found')
  return (
    <div className='grid grid-cols-11 text-2xl'>
      <PlayerName className='col-span-1' name={name} />
      {frames.map((frame, index) => (
        <Frame
          testId={`${name} frame-${index + 1}`}
          className=''
          frame={frame}
          isTenthFrame={frame.frameNumber === 10}
          key={index}
        />
      ))}
    </div>
  )
}

interface PlayerName {
  name: string
  className: string
}

function PlayerName({ name, className }: PlayerName) {
  return <div className={`pl-2 break-words ${className}`}>{name}</div>
}
