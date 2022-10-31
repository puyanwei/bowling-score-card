import { Frame as FrameType } from '@/pages/data'

interface FrameProps {
  className?: string
  frame: FrameType
  isTenthFrame: boolean
}

export const Frame = ({ frame, isTenthFrame, className }: FrameProps) => {
  if (!frame) throw new Error('Scorecard data not found')

  const { currentScore, first, second, third } = { ...frame }

  const bowlStyle = `w-8 h-8 outline-1 outline outline-black text-center row-start-1 row-end-2 items-start`
  return (
    <tr className={`outline-1 outline outline-black w-full h-24 ${className}`}>
      <td className={bowlStyle}>{first}</td>
      <td className={bowlStyle}>{second}</td>
      {isTenthFrame && <td className={bowlStyle}>{third}</td>}
      <td className='flex text-3xl'>{currentScore}</td>
    </tr>
  )
}
