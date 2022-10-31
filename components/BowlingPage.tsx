import { labels, scoreCard } from '@/pages/data'
import { Player } from './Player'

export function BowlingPage() {
  return (
    <>
      <h1 className='mt-4 text-center text-7xl'>Bowling Scorecard</h1>
      {scoreCard.map((player, index) => (
        <Player scoreCard={player} key={index} />
      ))}
      <br />
      <div>
        {labels.map((score, index) => (
          <button className='px-4 py-1 m-1 rounded bg-slate-200' key={index}>
            {score}
          </button>
        ))}
      </div>
      <ol className='p-4'>
        <li> What are these hydration errors, not matching ui? </li>
        <li>Outline css not quite lining up correctly</li>
        <li>Is there a better way of doing the grid?</li>
      </ol>
    </>
  )
}
