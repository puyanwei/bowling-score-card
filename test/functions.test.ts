import { scoreCard } from './functions.mock'

describe('Functions', () => {
  it('updateNextTwoBowls() should fill in the tuple when 2 bowls are available', () => {
    expect(updateNextTwoBowls(scoreCard)).toEqual(
      updatedScoreCardWithNextTwoBowls
    )
  })
})
