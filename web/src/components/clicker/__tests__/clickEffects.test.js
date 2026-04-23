import { describe, expect, it } from 'vitest'
import { appendWithCapInPlace, hasActiveCanvasEffects } from '../clickEffects'

describe('appendWithCapInPlace', () => {
  it('keeps only the newest effects when the cap is exceeded', () => {
    const current = [{ id: 'a' }, { id: 'b' }]
    const incoming = [{ id: 'c' }, { id: 'd' }]
    const pool = []

    appendWithCapInPlace(current, incoming, 3, pool)

    expect(current).toEqual([{ id: 'b' }, { id: 'c' }, { id: 'd' }])
    expect(pool).toEqual([{ id: 'a' }])
  })

  it('fully clears active effects when the cap is zero', () => {
    const current = [{ id: 'a' }, { id: 'b' }]
    const pool = []

    appendWithCapInPlace(current, [{ id: 'c' }], 0, pool)

    expect(current).toEqual([])
    expect(pool).toEqual([{ id: 'a' }, { id: 'b' }])
  })
})

describe('hasActiveCanvasEffects', () => {
  it('returns true when any effect bucket has entries', () => {
    expect(
      hasActiveCanvasEffects({
        particles: [],
        coneSprites: [{ id: 'cone' }],
        shockwaves: [],
        bursts: [],
      }),
    ).toBe(true)
  })

  it('returns false when all effect buckets are empty', () => {
    expect(
      hasActiveCanvasEffects({
        particles: [],
        coneSprites: [],
        shockwaves: [],
        bursts: [],
      }),
    ).toBe(false)
  })
})
