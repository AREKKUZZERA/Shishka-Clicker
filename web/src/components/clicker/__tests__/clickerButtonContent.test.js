import { describe, expect, it } from 'vitest'
import { getVisualStateForResult } from '../clickerButtonContent.js'

describe('getVisualStateForResult', () => {
  it('always returns tap for live click flow', () => {
    expect(getVisualStateForResult()).toBe('tap')
    expect(getVisualStateForResult({})).toBe('tap')
  })
})
