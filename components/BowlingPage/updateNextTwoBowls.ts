import { Frame, FrameNumber, Points } from '@/constants/types'

export function updateNextTwoBowls(
  frames: Frame[],
  frameNumber: FrameNumber,
  first: Points,
  second: Points,
  didPrevFrameStrike: boolean
): [Points, Points] {
  const currentFrame = frames[frameNumber - 1]
  const previousFrame = frames[frameNumber - 2]
  const twoFramesBack = frames[frameNumber - 3]
  const threeFramesBack = frames[frameNumber - 4]
  const fourFramesBack = frames[frameNumber - 5]
  const isSingleStrike = didPrevFrameStrike && !previousFrame.didPrevFrameStrike
  const isDoubleStrike =
    didPrevFrameStrike &&
    previousFrame.didPrevFrameStrike &&
    !twoFramesBack.didPrevFrameStrike
  const isTripleStrike =
    didPrevFrameStrike &&
    previousFrame.didPrevFrameStrike &&
    twoFramesBack.didPrevFrameStrike
  // No need to update previuos frame if it is the first frame
  if (currentFrame.frameNumber === 1) return ['', '']

  // If current fram is a strike, update previous frame
  if (first === 10) previousFrame.nextTwoBowls = [10, '']

  if (isSingleStrike) {
    // If previous frame is a strike, update previous frame and the one before it
    previousFrame.nextTwoBowls = [first, second]
    if (currentFrame.frameNumber > 2) twoFramesBack.nextTwoBowls = [10, first]
  }

  if (isDoubleStrike) {
    previousFrame.nextTwoBowls = [first, second]
    twoFramesBack.nextTwoBowls = [10, first]
    if (currentFrame.frameNumber > 3) threeFramesBack.nextTwoBowls = [10, 10]
  }

  if (isTripleStrike) {
    previousFrame.nextTwoBowls = [first, second]
    twoFramesBack.nextTwoBowls = [10, first]
    threeFramesBack.nextTwoBowls = [10, 10]
    if (currentFrame.frameNumber > 4) fourFramesBack.nextTwoBowls = [10, 10]
  }
  // Default is to update previous frame's next two bowls which is the current frame's first and second bowls if no strikes
  previousFrame.nextTwoBowls = [first, second]
  return ['', '']
}
