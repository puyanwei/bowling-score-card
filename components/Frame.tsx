import { Frame as FrameType, Points } from '@/constants/types'
import { ReactNode } from 'react'

interface FrameProps {
  testId?: string
  frame: FrameType
  isTenthFrame: boolean
}

export function Frame({ frame, isTenthFrame, testId }: FrameProps) {
  if (!frame) throw new Error('Scorecard data not found')

  const { totalScore, first, second, third } = { ...frame }
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
      className={`flex flex-col border-black border-b-[1px] w-full h-24 ${borderEndsX}`}
      data-testid={testId}
    >
      <div className='flex'>
        <Bowl className={bowlStyle} testId={`${testId}-first-bowl`}>
          {first === 10 ? 'X' : first}
        </Bowl>
        <Bowl testId={`${testId}-second-bowl`} className={bowlStyle}>
          {resolveSecondBowl(first, second)}
        </Bowl>
        {isTenthFrame && (
          <Bowl testId={`${testId}-third-bowl`} className={bowlStyle}>
            {(!!third && third === 10 ? 'X' : third) || ''}
          </Bowl>
        )}
      </div>
      <div className='flex flex-grow' />
      <div data-testid={`${testId}-total-score`} className='p-2 text-3xl'>
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
  return (
    <span className={className} data-testid={testId}>
      {children}
    </span>
  )
}
