import { describe, expect, it } from 'vitest'
import {
  buildClickerFieldData,
  buildDevConsoleResources,
  buildEconomySnapshot,
} from '../gameStoreSnapshots.js'
import { createFreshState } from '../gameStoreState.js'
import { deriveProduction } from '../../game/economyMath.js'

describe('gameStoreSnapshots', () => {
  it('builds clicker screen summary counts from field items', () => {
    const base = createFreshState()
    const state = {
      ...base,
      currentRunShishki: 1_200,
      totalHeavenlyShishkiEarned: 2,
      buildings: {
        ...base.buildings,
        garagePicker: 2,
        pickupPoint: 1,
      },
      upgrades: {
        ...base.upgrades,
        warehouseRhythm: 1,
        cashbackBug: 1,
      },
      prestigeUpgrades: {
        ...base.prestigeUpgrades,
        heavenlyTar: 1,
      },
      market: {
        ...base.market,
        unlocked: true,
        positions: {
          ...base.market.positions,
          parallelImport: 3,
        },
      },
      activeCampaign: {
        id: 'iceFlexer',
        title: 'Ледяной флексер',
      },
    }

    const fieldData = buildClickerFieldData(state)

    expect(fieldData.summary).toEqual({
      buildingCount: 2,
      upgradeCount: 2,
      metaCount: 1,
      marketExposure: 2,
    })
  })

  it('builds market screen summary values once per economy snapshot', () => {
    const base = createFreshState()
    const state = {
      ...base,
      shishki: 500,
      lifetimeShishkiEarned: 10_000,
      buildings: {
        ...base.buildings,
        garagePicker: 1,
        pickupPoint: 1,
        greySorting: 1,
      },
    }

    const snapshot = buildEconomySnapshot(state, deriveProduction(state))

    expect(snapshot.marketScreen).toEqual({
      unlockPrice: '28K',
      shishkiRemainingToUnlock: 15_200,
      buildingUnlockGoal: 5,
      buildingUnlockProgress: 4,
      unlockProgressPercent: expect.closeTo(39.6825, 4),
    })
  })

  it('builds preformatted dev console resources', () => {
    const base = createFreshState()
    const resources = buildDevConsoleResources({
      ...base,
      shishki: 12_500,
      heavenlyShishki: 7,
      tarLumps: 3,
    })

    expect(resources).toEqual({
      shishki: 12_500,
      shishkiText: '12,5K',
      heavenlyShishki: 7,
      heavenlyShishkiText: '7',
      tarLumps: 3,
      tarLumpsText: '3',
    })
  })
})
