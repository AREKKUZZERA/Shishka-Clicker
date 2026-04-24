import { describe, expect, it } from 'vitest'
import {
  SAVE_EXPORT_VERSION,
  createSaveBundle,
  isObsoleteSaveBundle,
  normalizeImportedBundle,
} from '../saveTransfer.js'

function createGameState(overrides = {}) {
  return {
    shishki: 123,
    manualClicks: 7,
    totalShishkiEarned: 456,
    lifetimeShishkiEarned: 456,
    heavenlyShishki: 3,
    totalHeavenlyShishkiEarned: 3,
    tarLumps: 1,
    quotaIndex: 0,
    currentRunShishki: 123,
    buildings: { garagePicker: 1 },
    buildingLevels: { garagePicker: 0 },
    upgrades: { warehouseRhythm: 0 },
    prestigeUpgrades: { heavenlyTar: 0 },
    market: {
      unlocked: false,
      brokerLevel: 0,
      prices: { parallelImport: 100 },
      positions: { parallelImport: 0 },
      averageBuyPrice: { parallelImport: 0 },
    },
    achievements: {},
    ...overrides,
  }
}

describe('saveTransfer', () => {
  it('exports the current save bundle version', () => {
    const bundle = createSaveBundle({
      gameState: createGameState(),
      includeSettings: false,
      appVersion: 'test-build',
    })

    expect(SAVE_EXPORT_VERSION).toBe(2)
    expect(bundle.version).toBe(2)
    expect(normalizeImportedBundle(bundle).game.heavenlyShishki).toBe(3)
  })

  it('rejects raw legacy save imports', () => {
    expect(() =>
      normalizeImportedBundle(
        createGameState({
          money: 999,
          knowledge: 111,
        }),
      ),
    ).toThrow(/устарев|поддерж/i)
  })

  it('rejects older bundle versions even with the new schema', () => {
    const bundle = createSaveBundle({
      gameState: createGameState(),
      includeSettings: false,
    })

    expect(() =>
      normalizeImportedBundle({
        ...bundle,
        version: 1,
      }),
    ).toThrow(/устарев|поддерж/i)
  })

  it('flags obsolete bundles before sync tries to import them', () => {
    expect(
      isObsoleteSaveBundle(
        createGameState({
          money: 999,
          knowledge: 111,
        }),
      ),
    ).toBe(true)

    expect(
      isObsoleteSaveBundle({
        ...createSaveBundle({
          gameState: createGameState(),
          includeSettings: false,
        }),
        version: 1,
      }),
    ).toBe(true)
  })
})
