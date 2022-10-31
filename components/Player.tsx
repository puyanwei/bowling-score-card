import { playerScores, ScoreCard } from '@/pages/data'

interface PlayerProps {
  data: ScoreCard
}

export function Player(data: PlayerProps) {
  const { name, scores } = data.data
  return (
    <table className='w-full'>
      <tr>
        {scores.map(({ frame }, index) => (
          <th key={index}>{frame}</th>
        ))}
      </tr>
      {scores.map((frame, index) => (
        <tr key={index}>
          <th>{name}</th>
          <td>data</td>
          <td>data</td>
          <td>data</td>
        </tr>
      ))}
    </table>
  )
}
