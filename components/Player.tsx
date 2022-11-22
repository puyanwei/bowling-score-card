import { ScoreCard } from '@/constants/types'
import { Frame } from './Frame'
import { FrameTitle } from './FrameTitle'

interface PlayerProps {
  scoreCard: ScoreCard
}

export function Player({ scoreCard: { name, frames } }: PlayerProps) {
  if (!name) throw new Error('Player name not found')
  if (!frames || !frames.length) throw new Error('Scorecard data not found')
  return (
    <div className='p-2 text-2xl'>
      <div className='grid grid-cols-11'>
        <span className='col-span-1' />
        {frames.map(({ frameNumber }, index) => (
          <FrameTitle
            frameNumber={frameNumber}
            isLastFrame={index === frames.length - 1}
            key={index}
          />
        ))}
      </div>
      <div className='grid grid-cols-11'>
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
