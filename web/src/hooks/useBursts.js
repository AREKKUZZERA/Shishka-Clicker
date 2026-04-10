import { useEffect, useState } from 'react'
import { useSettingsContext } from '../context/SettingsContext'

export function useBursts() {
  const [bursts, setBursts] = useState([])
  const { visualEffectCaps, visualEffectsFactor } = useSettingsContext()

  useEffect(() => {
    if (!bursts.length) return

    const timeout = setTimeout(() => {
      setBursts((current) => current.slice(1))
    }, 650)

    return () => clearTimeout(timeout)
  }, [bursts])

  function addBurst(x, y, value) {
    setBursts((current) => [
      ...current.slice(-(Math.max(1, Math.round(visualEffectCaps.burstCap * (0.4 + visualEffectsFactor * 0.35))) - 1)),
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
