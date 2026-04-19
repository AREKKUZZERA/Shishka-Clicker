import { describe, expect, it } from 'vitest'
import {
  getBuildingCost,
  getQuotaTarget,
  resolveQuotaClosures,
} from '../economyMath.js'

describe('economyMath', () => {
  it('scales building cost by 15 percent per purchase', () => {
    expect(getBuildingCost(100, 0)).toBe(100)
    expect(getBuildingCost(100, 1)).toBe(115)
    expect(getBuildingCost(100, 2)).toBe(132)
  })

  it('closes multiple quotas inside one life', () => {
    const result = resolveQuotaClosures({
      quotaIndex: 0,
      currentRunShishki: 3_500,
      heavenlyShishki: 0,
      totalHeavenlyShishkiEarned: 0,
      baseQuota: 1_000,
      quotaGrowth: 2,
    })

    expect(result.closedQuotas).toBe(2)
    expect(result.quotaIndex).toBe(2)
    expect(result.heavenlyShishki).toBe(2)
    expect(getQuotaTarget(1_000, 2, result.quotaIndex)).toBe(4_000)
  })
})
