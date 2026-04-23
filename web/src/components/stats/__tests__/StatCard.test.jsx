import { describe, expect, it } from 'vitest'
import { getChangedDigitIndexes } from '../StatCard.jsx'

describe('getChangedDigitIndexes', () => {
  it('returns no changed indexes when the value text is identical', () => {
    expect(getChangedDigitIndexes('5,1K', '5,1K')).toEqual([])
  })

  it('returns changed indexes only for updated digits', () => {
    expect(getChangedDigitIndexes('12.3K', '12.9K')).toEqual([3])
  })
})
