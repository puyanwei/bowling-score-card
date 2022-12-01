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

  function resolveThirdBowl(
    first: Points,
    second: Points,
    third: Points | undefined
  ) {
    if (typeof second === 'string') return ''
    if (typeof third === 'string') return ''
    if (typeof third === 'undefined') return ''
    if (first === 10 && second + third === 10) return '/'
    return (!!third && third === 10 ? 'X' : third) || ''
  }
  const borderEndsX = isTenthFrame ? 'border-r-2 border-l-2' : 'border-l-2'
  const bowlStyle = `w-8 h-8 border-r-2 border-b-2 border-white`
  return (
    <div
      className={`flex flex-col w-full h-24 border-b-2 ${borderEndsX}`}
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
            {resolveThirdBowl(first, second, third)}
          </Bowl>
        )}
      </div>
      <div className='flex flex-grow' />
      <div
        data-testid={`${testId}-total-score`}
        className='p-2 text-3xl text-left'
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
  return (
    <span className={className} data-testid={testId}>
      {children}
    </span>
  )
}
