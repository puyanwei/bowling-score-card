import { Frame as FrameType } from '@/pages/data'

interface FrameProps {
  className?: string
  frame: FrameType
}

export const Frame = ({ frame, className }: FrameProps) => {
  if (!frame) throw new Error('Scorecard data not found')

  const { currentScore, first, second, third } = { ...frame }

  const bowlStyle = `w-8 h-8 outline-1 outline outline-black text-center`
  return (
    <td className={`outline-1 outline outline-black w-full h-24 ${className}`}>
      <td className={bowlStyle}>{first}</td>
      <td className={bowlStyle}>{second}</td>
      {third && <td className={bowlStyle}>{third}</td>}
      {currentScore}
    </td>
  )
}
