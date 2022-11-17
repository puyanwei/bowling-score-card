import { updateNextTwoBowls } from '@/components/BowlingPage/updateNextTwoBowls'
import { expect } from '@jest/globals'
import {
  frames,
  framesWithADoubleStrike,
  framesWithATripleStrike,
  framesWithOneStrike,
  strikeFrame2,
  strikeFrame3,
} from './functions.mock'

describe('updateNextTwoBowls()', () => {
  it(`should apply the current frame's two bowls to the previous frames' tuple array`, () => {
    updateNextTwoBowls(frames, 2, 3, 3, false)
    expect(frames[0].nextTwoBowls).toEqual([3, 3])
  })
  it(`previous frame's next2bowls temporarily has an X when the current frame has one strike`, () => {
    updateNextTwoBowls(framesWithOneStrike, 3, 10, '', false)
    expect(framesWithOneStrike[1].nextTwoBowls).toEqual([10, ''])
  })
  it(`applies 2 bowls to the tuple array when the previous frame had one strike`, () => {
    updateNextTwoBowls(framesWithOneStrike, 4, 8, 1, true)
    expect(framesWithOneStrike[2].nextTwoBowls).toEqual([8, 1])
    expect(framesWithOneStrike[1].nextTwoBowls).toEqual([10, 8])
  })
  it(`single strike frame 2`, () => {
    updateNextTwoBowls(strikeFrame2, 3, 2, 2, true)
    expect(strikeFrame2[0].nextTwoBowls).toEqual([10, 2])
    expect(strikeFrame2[1].nextTwoBowls).toEqual([2, 2])
  })
  it(`single strike frame 3`, () => {
    updateNextTwoBowls(strikeFrame3, 4, 8, 1, true)
    expect(strikeFrame3[1].nextTwoBowls).toEqual([10, 8])
    expect(strikeFrame3[2].nextTwoBowls).toEqual([8, 1])
  })
  it(`applies 2 bowls to the tuple array when there is a double strike`, () => {
    updateNextTwoBowls(framesWithADoubleStrike, 5, 4, 4, true)
    expect(framesWithADoubleStrike[1].nextTwoBowls).toEqual([10, 10])
    expect(framesWithADoubleStrike[2].nextTwoBowls).toEqual([10, 4])
    expect(framesWithADoubleStrike[3].nextTwoBowls).toEqual([4, 4])
  })
  it(`applies 2 bowls to the tuple array when there is a triple strike`, () => {
    updateNextTwoBowls(framesWithATripleStrike, 5, 4, 4, true)
    expect(framesWithATripleStrike[0].nextTwoBowls).toEqual([10, 10])
    expect(framesWithATripleStrike[1].nextTwoBowls).toEqual([10, 10])
    expect(framesWithATripleStrike[2].nextTwoBowls).toEqual([10, 4])
    expect(framesWithATripleStrike[3].nextTwoBowls).toEqual([4, 4])
  })
})
