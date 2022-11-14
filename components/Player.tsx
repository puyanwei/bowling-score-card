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
        <div className='pl-2 mt-20 '>{name}</div>
      </div>
      {frames.map(({ frameNumber }, index) => {
        const borderEndsX =
          index === frames.length - 1
            ? 'border-r-[1px] border-l-[1px]'
            : 'border-l-[1px]'
        return (
          <div
            className={`self-end p-2 text-center border-black border-y-[1px] border-solid h-26 ${borderEndsX}`}
            key={index}
          >
            Frame {frameNumber}
          </div>
        )
      })}
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
