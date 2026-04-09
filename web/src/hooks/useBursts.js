import { useEffect, useState } from 'react'

export function useBursts() {
  const [bursts, setBursts] = useState([])

  useEffect(() => {
    if (!bursts.length) return

    const timeout = window.setTimeout(() => {
      setBursts((current) => current.slice(1))
    }, 650)

    return () => window.clearTimeout(timeout)
  }, [bursts])

  function addBurst(x, y, value) {
    setBursts((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        x,
        y,
        value,
      },
    ])
  }

  return { bursts, addBurst }
}
