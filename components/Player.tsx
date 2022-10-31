import { playerScores, ScoreCard } from '@/pages/data'
import { Frame } from './Frame'

interface PlayerProps {
  scoreCard: ScoreCard
}

export function Player({ scoreCard: { name, frames } }: PlayerProps) {
  if (!name) throw new Error('Player name not found')
  if (!frames || !frames.length) throw new Error('Scorecard data not found')

  return (
    <table className='grid grid-cols-11 grid-rows-2 text-2xl '>
      <th className='self-center col-start-1 col-end-2 row-start-1 row-end-3 font-bold'>
        <div className='mt-20'>{name}</div>
      </th>
      {frames.map(({ frame }, index) => (
        <th
          className='h-12 self-end mb-[1px] ml-[1px] outline-1 outline outline-black p-2'
          key={index}
        >
          Frame {frame}
        </th>
      ))}
      {frames.map((frame, index) => (
        <Frame className='row-start-2 row-end-3' key={index} frame={frame} />
      ))}
    </table>
  )
}
