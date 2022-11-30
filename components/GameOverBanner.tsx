import { ScoreCard } from '@/constants/types'

interface GameOverBannerProps {
  reset: () => void
  scoreCard: ScoreCard[]
}

export function GameOverBanner({ reset, scoreCard }: GameOverBannerProps) {
  function resolveWinner(scoreCard: ScoreCard[]): string {
    const winningScores = scoreCard.map((player) => player.frames[9].totalScore)
    const topScore = Math.max(...winningScores)
    const winningPlayerIndex = winningScores.indexOf(topScore)
    const winner = scoreCard[winningPlayerIndex].name
    return winner
  }

  const winner = resolveWinner(scoreCard)
  const winningStatement = `Game over - the winner is ${winner}`

  return (
    <div className='text-center'>
      <div className='my-4 text-5xl' data-testid='game-over'>
        <h2>{winningStatement}</h2>
      </div>
      <button
        data-testid='button-reset-game-end'
        className='px-4 py-1 mx-2 rounded bg-slate-200 hover:bg-slate-800 hover:text-white'
        onClick={() => reset()}
      >
        Reset
      </button>
    </div>
  )
}
