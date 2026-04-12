import { useStores } from '../stores/StoresProvider.jsx'

export function useGameContext() {
  const stores = useStores()
  const ctx = stores?.gameStore
  if (!ctx) throw new Error('useGameContext must be used within StoresProvider')
  return ctx
}
