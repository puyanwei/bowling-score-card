interface FrameTitleProps {
  frameNumber: number
  isLastFrame: boolean
}

export function FrameTitle({ frameNumber, isLastFrame }: FrameTitleProps) {
  const borderEndsX = isLastFrame ? 'border-l-2 border-r-2' : 'border-l-2'
  return (
    <div
      className={`p-2 text-center border-white border-y-2 h-26 ${borderEndsX}`}
    >
      Frame {frameNumber}
    </div>
  )
}
