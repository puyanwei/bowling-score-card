import { MouseEvent } from 'react'
import { labels } from '@/constants/initialScoreCard'
import { Button } from './Button'

interface PointsButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  reset: () => void
  remainingPins: number
  className: string
}

export function PointsButtons({
  className,
  onClick,
  reset,
  remainingPins,
}: PointsButtonProps) {
  const leftMarginInverted = '-ml-[1px]'

  return (
    <div className={`my-4 ${className}`}>
      <span className='col-span-1' />
      <div className='col-start-2 col-end-11'>
        {labels.map((score, index) => (
          <Button
            testId={`button-${index}`}
            className={` enabled:hover:bg-slate-800 disabled:opacity-50 disabled:hover:none mx-1
            ${index === 0 && leftMarginInverted}`}
            key={index}
            onClick={onClick}
            disabled={index > remainingPins}
          >
            {score}
          </Button>
        ))}
        <Button testId='button-reset' onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  )
}
