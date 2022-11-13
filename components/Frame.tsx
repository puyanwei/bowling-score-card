import { Frame as FrameType, Scores } from '@/pages/data/types'

interface FrameProps {
  className?: string
  testId?: string
  frame: FrameType
  isTenthFrame: boolean
}

export const Frame = ({
  frame,
  isTenthFrame,
  className,
  testId,
}: FrameProps) => {
  if (!frame) throw new Error('Scorecard data not found')

  const { totalScore, first, second, third, frameNumber } = { ...frame }

  function resolveSecondBowl(first: Scores, second: Scores): Scores {
    const isTenthFrameDoubleStrike =
      isTenthFrame && first === '10' && second === '10'
    const isTenthFrameSpare =
      isTenthFrame &&
      first !== '10' &&
      parseInt(first) + parseInt(second) === 10

    if (isTenthFrameDoubleStrike) return 'X'
    if (isTenthFrameSpare) return '/'
    return parseInt(first) + parseInt(second) === 10 ? '/' : second
  }

  const bowlStyle = `w-8 h-8 outline-1 outline outline-black text-center`
  return (
    <div
      className={`flex flex-col outline-1 outline outline-black w-full h-24 ${className}`}
      data-testid={testId}
    >
      <div className='flex'>
        <span
          data-testid={`frame-${frameNumber}-first-bowl`}
          className={bowlStyle}
        >
          {parseInt(first) === 10 ? 'X' : first}
        </span>
        <span
          data-testid={`frame-${frameNumber}-second-bowl`}
          className={bowlStyle}
        >
          {resolveSecondBowl(first, second)}
        </span>
        {isTenthFrame && (
          <span
            data-testid={`frame-${frameNumber}-third-bowl`}
            className={bowlStyle}
          >
            {(!!third && parseInt(third) === 10 ? 'X' : third) || ''}
          </span>
        )}
      </div>
      <div className='flex flex-grow' />
      <div
        data-testid={`frame-${frameNumber}-total-score`}
        className='p-2 text-3xl'
      >
        {totalScore}
      </div>
    </div>
  )
}
