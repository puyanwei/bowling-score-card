import { ScoreCard } from '@/constants/types'
import { Button } from './Button'

interface GameOverBannerProps {
  reset: () => void
  scoreCard: ScoreCard[]
}

export function GameOverBanner({ reset, scoreCard }: GameOverBannerProps) {
  function resolveWinner(scoreCard: ScoreCard[]): string {
    const finalScores = scoreCard.map((player) => player.frames[9].totalScore)

    if (isTiedTopScores(finalScores)) return `Game over - it's a tie!`
    const topScore = Math.max(...finalScores)
    const winningPlayerIndex = finalScores.indexOf(topScore)
    const winner = scoreCard[winningPlayerIndex].name
    const winningStatement = `Game over - the winner is ${winner}`
    return winningStatement
  }

  function isTiedTopScores(array: number[]): boolean {
    const hasDuplicates = new Set(array).size !== array.length
    const highestNumberElement = Math.max(...array)
    const ascendingArray = array.sort((a, b) => a - b)
    const lastElementOfArray = ascendingArray[ascendingArray.length - 1]
    const secondToLastElementOfArray = ascendingArray[ascendingArray.length - 1]

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
      <div className='my-4 text-3xl' data-testid='game-over'>
        <h2>{winningText}</h2>
      </div>
      <Button testId='button-reset-game-end' onClick={reset}>
        Reset
      </Button>
    </div>
  )
}
