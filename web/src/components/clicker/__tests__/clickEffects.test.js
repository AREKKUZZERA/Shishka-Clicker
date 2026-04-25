import { describe, expect, it } from 'vitest'
import {
  appendWithCapInPlace,
  buildClickSpawnState,
  hasActiveCanvasEffects,
} from '../clickEffects'

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
        particles: [{ id: 'particle' }],
        bursts: [],
      }),
    ).toBe(true)
  })

  it('returns false when all effect buckets are empty', () => {
    expect(
      hasActiveCanvasEffects({
        particles: [],
        bursts: [],
      }),
    ).toBe(false)
  })
})

describe('buildClickSpawnState', () => {
  it('keeps regular click burst text and shishka particle payload', () => {
    const spawnState = buildClickSpawnState({
      result: {
        amount: 12,
        particleCount: 12,
        symbols: ['🌰', '✨'],
      },
      pointerPoint: { x: 100, y: 120 },
      particlePoint: { x: 100, y: 120 },
      burstPoint: { x: 100, y: 120 },
      config: {
        visualEffectCaps: {
          burstCap: 10,
          particleCap: 10,
        },
        visualEffectScaling: {
          burstSpawnScale: 1,
          particleSpawnScale: 1,
        },
        visualEffectToggles: {
          floatingNumbers: true,
          particles: true,
        },
      },
      now: 1_000,
      pools: {
        particles: [],
        bursts: [],
      },
    })

    expect(spawnState.burst?.entry.value).toBe('+12')
    expect(spawnState.particles).toHaveLength(1)
    expect(spawnState.particles[0]).toMatchObject({
      symbol: 'shishka',
      iconData: null,
    })
  })

  it('uses the configured floating number cap without density downscaling', () => {
    const spawnState = buildClickSpawnState({
      result: {
        amount: 12,
        particleCount: 12,
        symbols: ['shishka'],
      },
      pointerPoint: { x: 100, y: 120 },
      particlePoint: { x: 100, y: 120 },
      burstPoint: { x: 100, y: 120 },
      config: {
        visualEffectCaps: {
          burstCap: 6,
          particleCap: 10,
        },
        visualEffectScaling: {
          burstSpawnScale: 0.5,
          particleSpawnScale: 1,
        },
        visualEffectToggles: {
          floatingNumbers: true,
          particles: true,
        },
      },
      now: 1_000,
      pools: {
        particles: [],
        bursts: [],
      },
    })

    expect(spawnState.burst?.cap).toBe(6)
  })
})
