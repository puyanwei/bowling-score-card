import { Frame as FrameType, Points } from '@/constants/types'
import { ReactNode } from 'react'

interface FrameProps {
  className?: string
  testId?: string
  player: string
  frame: FrameType
  isTenthFrame: boolean
}

export function Frame({
  frame,
  isTenthFrame,
  className,
  testId,
  player,
}: FrameProps) {
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
        <Bowl className={bowlStyle} data-testid={`${player}-first-bowl`}>
          {first === 10 ? 'X' : first}
        </Bowl>
        <Bowl data-testid={`${player}-second-bowl`} className={bowlStyle}>
          {resolveSecondBowl(first, second)}
        </Bowl>
        {isTenthFrame && (
          <Bowl data-testid={`${player}-third-bowl`} className={bowlStyle}>
            {(!!third && third === 10 ? 'X' : third) || ''}
          </Bowl>
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

interface BowlProps {
  className?: string
  testId?: string
  children: ReactNode
}

function Bowl({ children, className, testId }: BowlProps) {
  console.log({ testId })
  return (
    <span className={className} data-testid={testId}>
      {children}
    </span>
  )
}
