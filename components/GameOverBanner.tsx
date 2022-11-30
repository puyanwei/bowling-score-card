import { ScoreCard } from '@/constants/types'

interface GameOverBannerProps {
  reset: () => void
  scoreCard: ScoreCard[]
}

export function GameOverBanner({ reset, scoreCard }: GameOverBannerProps) {
  function resolveWinner(scoreCard: ScoreCard[]): string {
    const finalScores = scoreCard.map((player) => player.frames[9].totalScore)

    if (isTiedTopScores(finalScores)) return `Game over - it's a tie!`
    const topScore = Math.max(...finalScores)
    const winningPlayerIndex = finalScores.reverse().indexOf(topScore)
    // Why is this mapping reversed?
    const winner = scoreCard[winningPlayerIndex].name
    const winningStatement = `Game over - the winner is ${winner}`
    return winningStatement
  }

  function isTiedTopScores(array: number[]): boolean {
    const hasDuplicates = new Set(array).size !== array.length
    const highestNumberElement = Math.max(...array)
    const sortedArray = array.sort((a, b) => b - a)
    const lastElementOfArray = sortedArray[sortedArray.length - 1]
    const secondToLastElementOfArray = sortedArray[sortedArray.length - 1]

    if (!hasDuplicates) return false
    if (
      lastElementOfArray === secondToLastElementOfArray &&
      lastElementOfArray === highestNumberElement
    )
      return true
    return false
  }

  const winningText = resolveWinner(scoreCard)

  return (
    <div className='text-center'>
      <div className='my-4 text-5xl' data-testid='game-over'>
        <h2>{winningText}</h2>
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
