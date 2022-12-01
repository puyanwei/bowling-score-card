import { MouseEvent } from 'react'
import { labels } from '@/constants/initialScoreCard'

interface PointsButtonProps {
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void
  reset: () => void
  remainingPins: number
  className: string
}

export function PointsButtons({
  className,
  handleClick,
  reset,
  remainingPins,
}: PointsButtonProps) {
  const leftMarginInverted = '-ml-[1px]'

  return (
    <div className={`my-4 ${className}`}>
      <span className='col-span-1' />
      <div className='col-start-2 col-end-11'>
        {labels.map((score, index) => (
          <button
            data-testid={`button-${index}`}
            className={`px-4 py-1 mx-1 rounded text-blue-500  enabled:hover:text-white bg-slate-200 enabled:hover:bg-slate-800 disabled:opacity-50 disabled:hover:none 
            ${index === 0 && leftMarginInverted}`}
            key={index}
            onClick={handleClick}
            disabled={index > remainingPins}
          >
            {score}
          </button>
        ))}
        <button
          data-testid='button-reset'
          className='px-4 py-1 mx-2 text-blue-500 rounded bg-slate-200 hover:bg-slate-800 hover:text-white'
          onClick={() => reset()}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
