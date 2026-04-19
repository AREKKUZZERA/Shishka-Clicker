export function getBuildingCost(baseCost, owned) {
  return Math.round(baseCost * Math.pow(1.15, owned))
}

export function getQuotaTarget(baseQuota, quotaGrowth, quotaIndex) {
  return Math.floor(baseQuota * Math.pow(quotaGrowth, quotaIndex))
}

export function resolveQuotaClosures({
  quotaIndex,
  currentRunShishki,
  heavenlyShishki,
  totalHeavenlyShishkiEarned,
  baseQuota,
  quotaGrowth,
}) {
  let nextQuotaIndex = quotaIndex
  let nextHeavenly = heavenlyShishki
  let nextTotalHeavenly = totalHeavenlyShishkiEarned
  let closedQuotas = 0

  while (
    currentRunShishki >= getQuotaTarget(baseQuota, quotaGrowth, nextQuotaIndex)
  ) {
    nextQuotaIndex += 1
    nextHeavenly += 1
    nextTotalHeavenly += 1
    closedQuotas += 1
  }

  return {
    closedQuotas,
    quotaIndex: nextQuotaIndex,
    heavenlyShishki: nextHeavenly,
    totalHeavenlyShishkiEarned: nextTotalHeavenly,
  }
}
