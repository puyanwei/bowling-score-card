interface FrameTitleProps {
  frameNumber: number
  isLastFrame: boolean
}

export function FrameTitle({ frameNumber, isLastFrame }: FrameTitleProps) {
  const borderEndsX = isLastFrame
    ? 'border-l-[1px] border-r-[1px]'
    : 'border-l-[1px]'
  return (
    <div
      className={`p-2 text-center border-black border-y-[1px] border-solid h-26 ${borderEndsX}`}
    >
      Frame {frameNumber}
    </div>
  )
}
