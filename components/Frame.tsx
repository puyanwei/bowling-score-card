import { Frame as FrameType } from '@/pages/data/types'

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

  const { totalScore, first, second, third } = { ...frame }

  const bowlStyle = `w-8 h-8 outline-1 outline outline-black text-center`
  return (
    <div
      className={`flex flex-col outline-1 outline outline-black w-full h-24 ${className}`}
      data-testid={testId}
    >
      <div className='flex'>
        <span data-testId='first-bowl' className={bowlStyle}>
          {first}
        </span>
        <span data-testId='second-bowl' className={bowlStyle}>
          {second}
        </span>
        {isTenthFrame && (
          <span data-testId='third-bowl' className={bowlStyle}>
            {third}
          </span>
        )}
      </div>
      <div className='flex flex-grow' />
      <div data-testId='total-score' className='p-2 text-3xl'>
        {totalScore}
      </div>
    </div>
  )
}
