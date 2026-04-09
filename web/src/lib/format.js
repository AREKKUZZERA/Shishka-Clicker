const formatter = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 })

const COMPACT_SUFFIXES = [
  { value: 1e15, suffix: 'квд' },
  { value: 1e12, suffix: 'трлн' },
  { value: 1e9, suffix: 'млрд' },
  { value: 1e6, suffix: 'м' },
  { value: 1e3, suffix: 'к' },
]

export function formatNumber(value) {
  const numeric = Number(value ?? 0)
  if (!Number.isFinite(numeric)) return '0'

  const abs = Math.abs(numeric)
  const compact = COMPACT_SUFFIXES.find((entry) => abs >= entry.value)

  if (!compact) {
    return formatter.format(abs >= 100 ? Math.round(numeric) : numeric)
  }

  const scaled = numeric / compact.value
  const fractionDigits = Math.abs(scaled) >= 100 ? 0 : Math.abs(scaled) >= 10 ? 1 : 2
  const short = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  }).format(scaled)

  return `${short}${compact.suffix}`
}
