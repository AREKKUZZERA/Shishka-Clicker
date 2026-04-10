const formatter = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 })

const NUMBER_SUFFIXES = ["", "K", "M", "B", "T", "QD", "QN", "SX", "SP"]

export function formatNumber(number) {
  let k = 1000
  let i = 0

  while (number > k) {
    number /= k
    i++
  }

  let sym

  if (i > 8) {
    const zeros = i * 3
    sym = `e${zeros}`
  } else {
    sym = NUMBER_SUFFIXES[i]
  }

  const shortNumber = formatter.format(number)
  return `${shortNumber}${sym}`
}
