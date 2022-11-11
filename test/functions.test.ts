import { expect } from '@jest/globals'
import { updateNextTwoBowls } from '@/components/BowlingPage/functions'
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
    const result = updateNextTwoBowls(frames, 2)
    expect(result[0].nextTwoBowls).toEqual(['3', '3'])
  })
  it(`previous frame's next2bowls temporarily has an X when the current frame has one strike`, () => {
    const result = updateNextTwoBowls(framesWithOneStrike, 3)
    expect(result[1].nextTwoBowls).toEqual(['X', ''])
  })
  it(`applies 2 bowls to the tuple array when there is one strike`, () => {
    const result = updateNextTwoBowls(framesWithOneStrike, 4)
    expect(result[2].nextTwoBowls).toEqual(['8', '1'])
    expect(result[1].nextTwoBowls).toEqual(['X', '8'])
  })
  it(`single strike frame 2`, () => {
    const result = updateNextTwoBowls(strikeFrame2, 3)
    expect(result[0].nextTwoBowls).toEqual(['X', '2'])
    expect(result[1].nextTwoBowls).toEqual(['2', '2'])
  })
  it(`single strike frame 3`, () => {
    const result = updateNextTwoBowls(strikeFrame3, 4)
    expect(result[1].nextTwoBowls).toEqual(['X', '8'])
    expect(result[2].nextTwoBowls).toEqual(['8', '1'])
  })
  it(`applies 2 bowls to the tuple array when there is a double strike`, () => {
    const result = updateNextTwoBowls(framesWithADoubleStrike, 5)
    expect(result[1].nextTwoBowls).toEqual(['X', 'X'])
    expect(result[2].nextTwoBowls).toEqual(['X', '4'])
    expect(result[3].nextTwoBowls).toEqual(['4', '4'])
  })
  it(`applies 2 bowls to the tuple array when there is a triple strike`, () => {
    const result = updateNextTwoBowls(framesWithATripleStrike, 5)
    expect(result[0].nextTwoBowls).toEqual(['X', 'X'])
    expect(result[1].nextTwoBowls).toEqual(['X', 'X'])
    expect(result[2].nextTwoBowls).toEqual(['X', '4'])
    expect(result[3].nextTwoBowls).toEqual(['4', '4'])
  })
})
