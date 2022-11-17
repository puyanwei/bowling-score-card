import { Frame as FrameType, Points } from '@/constants/types'

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
  function resolveSecondBowl(first: Points, second: Points): string {
    const isTenthFrameDoubleStrike =
      frame.frameNumber === 10 && first === 10 && second === 10
    const isTenthFrameSpare =
      frame.frameNumber === 10 &&
      first !== 10 &&
      first !== '' &&
      second !== '' &&
      first + second === 10

    if (isTenthFrameDoubleStrike) return 'X'
    if (isTenthFrameSpare) return '/'
    return first !== '' && second !== '' && first + second === 10
      ? '/'
      : `${second}`
  }
  const borderEndsX = isTenthFrame
    ? 'border-r-[1px] border-l-[1px]'
    : 'border-l-[1px]'
  const bowlStyle = `w-8 h-8 border-r-[1px] border-b-[1px] border-black text-center`
  return (
    <div
      className={`flex flex-col border-black border-b-[1px] w-full h-24 ${borderEndsX} ${className}`}
      data-testid={testId}
    >
      <div className='flex'>
        <span
          data-testid={`frame-${frameNumber}-first-bowl`}
          className={bowlStyle}
        >
          {first === 10 ? 'X' : first}
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
            {(!!third && third === 10 ? 'X' : third) || ''}
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
