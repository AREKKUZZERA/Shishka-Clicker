import { useCallback, useState } from 'react'
import { useSettingsContext } from '../context/SettingsContext'

export function useBursts() {
  const [bursts, setBursts] = useState([])
  const { visualEffectCaps, visualEffectsFactor } = useSettingsContext()

  const removeBurst = useCallback((id) => {
    setBursts((current) => current.filter((b) => b.id !== id))
  }, [])

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

  return { bursts, addBurst, removeBurst }
}
