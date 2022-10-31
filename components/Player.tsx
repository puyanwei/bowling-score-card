import { playerScores, ScoreCard } from '@/pages/data'
import { ScoreBox } from './ScoreBox'

interface PlayerProps {
  scoreCard: ScoreCard
}

export function Player({ scoreCard: { name, scores } }: PlayerProps) {
  if (!name) throw new Error('Player name not found')
  if (!scores || !scores.length) throw new Error('Scorecard data not found')

  return (
    <table className='mt-[1px] outline-1 outline outline-black'>
      <tr className='grid grid-cols-11'>
        <th />
        {scores.map(({ frame }, index) => (
          <th key={index}>Frame {frame}</th>
        ))}
      </tr>
      <tr className='grid grid-cols-11'>
        <td className='font-bold'>{name}</td>
        {scores.map((score, index) => (
          <ScoreBox key={index} scores={score} />
        ))}
      </tr>
    </table>
  )
}
