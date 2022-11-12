import { ScoreCard } from '@/pages/data/types'
import { Frame } from './Frame'

interface PlayerProps {
  scoreCard: ScoreCard
}

export function Player({ scoreCard: { name, frames } }: PlayerProps) {
  if (!name) throw new Error('Player name not found')
  if (!frames || !frames.length) throw new Error('Scorecard data not found')
  return (
    <div className='grid grid-cols-11 grid-rows-2 text-2xl '>
      <div className='self-center col-start-1 col-end-2 row-start-1 row-end-3 font-bold'>
        <div className='mt-20'>{name}</div>
      </div>
      {frames.map(({ frameNumber }, index) => (
        <div
          className='h-26 text-center self-end mb-[1px] ml-[1px] outline-1 outline outline-black p-2'
          key={index}
        >
          Frame {frameNumber}
        </div>
      ))}
      {frames.map((frame, index) => (
        <Frame
          testId={`${name} frame-${index + 1}`}
          className='row-start-2 row-end-3'
          key={index}
          frame={frame}
          isTenthFrame={frame.frameNumber === 10}
        />
      ))}
    </div>
  )
}
