interface GameOverBannerProps {
  reset: () => void
}

export function GameOverBanner({ reset }: GameOverBannerProps) {
  return (
    <div className='text-center'>
      <div className='my-4 text-5xl' data-testid='game-over'>
        <h2>Game over - player X wins!!</h2>
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
