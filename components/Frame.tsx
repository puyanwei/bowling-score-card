import { Frame as FrameType } from '@/pages/data/types'

interface FrameProps {
  className?: string
  frame: FrameType
  isTenthFrame: boolean
}

export const Frame = ({ frame, isTenthFrame, className }: FrameProps) => {
  if (!frame) throw new Error('Scorecard data not found')

  const { currentScore, first, second, third } = { ...frame }

  const bowlStyle = `w-8 h-8 outline-1 outline outline-black text-center`
  return (
    <div
      className={`flex flex-col outline-1 outline outline-black w-full h-24 ${className}`}
    >
      <div className='flex'>
        <span className={bowlStyle}>{first}</span>
        <span className={bowlStyle}>{second}</span>
        {isTenthFrame && <span className={bowlStyle}>{third}</span>}
      </div>
      <div className='flex flex-grow' />
      <div className='p-2 text-3xl'>{currentScore}</div>
    </div>
  )
}
