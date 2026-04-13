import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useStores } from '../stores/StoresProvider.jsx'
import { useSettingsContext } from './SettingsContext.jsx'
import { setupDiscord } from '../discord.js'
import { APP_VERSION } from '../config/appMeta.js'
import { createSaveBundle, normalizeImportedBundle } from '../lib/saveTransfer.js'
import { downloadCloudSave, uploadCloudSave } from '../lib/cloudSave.js'
import { loadGameRecord } from '../lib/storage.js'
import { buildDiscordPlayerId } from '../lib/playerId.js'

const DiscordActivityContext = createContext(null)
const AUTO_SYNC_INTERVAL_MS = 15000

function getTimeValue(value) {
  const time = Date.parse(value ?? '')
  return Number.isFinite(time) ? time : 0
}

export function DiscordActivityProvider({ children }) {
  const stores = useStores()
  const { exportSettings, importSettings } = useSettingsContext()
  const [state, setState] = useState({
    isActivity: false,
    status: 'idle',
    user: null,
    playerId: null,
    error: null,
    syncState: 'idle',
    syncError: null,
    lastSyncedAt: null,
    syncSource: null,
  })
  const lastUploadedLocalUpdatedAtRef = useRef(null)

  const setSyncState = useCallback((patch) => {
    setState((current) => ({
      ...current,
      ...patch,
    }))
  }, [])

  const uploadLatestSave = useCallback(async ({ force = false, playerIdOverride = null } = {}) => {
    const playerId = playerIdOverride ?? state.playerId

    if (!playerId) return false

    const localRecord = loadGameRecord()
    const localUpdatedAt = localRecord.updatedAt

    if (!force && (!localUpdatedAt || lastUploadedLocalUpdatedAtRef.current === localUpdatedAt)) {
      return false
    }

    const save = createSaveBundle({
      gameState: stores.gameStore.exportGameSave(),
      settings: exportSettings(),
      appVersion: APP_VERSION,
    })

    setSyncState({
      syncState: 'syncing',
      syncError: null,
    })

    await uploadCloudSave({
      playerId,
      appVersion: APP_VERSION,
      save,
    })

    lastUploadedLocalUpdatedAtRef.current = localUpdatedAt ?? new Date().toISOString()

    setSyncState({
      syncState: 'synced',
      syncError: null,
      lastSyncedAt: new Date().toISOString(),
      syncSource: 'upload',
    })

    return true
  }, [exportSettings, setSyncState, state.playerId, stores.gameStore])

  useEffect(() => {
    let cancelled = false

    const bootstrap = async () => {
      setState((current) => ({
        ...current,
        status: 'connecting',
        error: null,
        syncError: null,
      }))

      try {
        const session = await setupDiscord()

        if (cancelled || !session?.isActivity || !session.user?.id) {
          setState((current) => ({
            ...current,
            isActivity: false,
            status: 'idle',
          }))
          return
        }

        const playerId = buildDiscordPlayerId(session.user.id)

        setState((current) => ({
          ...current,
          isActivity: true,
          status: 'ready',
          user: session.user,
          playerId,
          error: null,
          syncState: 'loading',
          syncError: null,
        }))

        const localRecord = loadGameRecord()
        const cloudSave = await downloadCloudSave(playerId)

        if (cancelled) return

        if (!cloudSave?.save) {
          lastUploadedLocalUpdatedAtRef.current = null
          await uploadLatestSave({ force: true, playerIdOverride: playerId })
          return
        }

        const localUpdatedAt = getTimeValue(localRecord.updatedAt)
        const remoteUpdatedAt = getTimeValue(cloudSave.updatedAt)

        if (remoteUpdatedAt > localUpdatedAt) {
          const imported = normalizeImportedBundle(cloudSave.save)
          stores.gameStore.importGameSave(imported.game)

          if (imported.settings) {
            importSettings(imported.settings)
          }

          lastUploadedLocalUpdatedAtRef.current = loadGameRecord().updatedAt

          setState((current) => ({
            ...current,
            syncState: 'synced',
            syncError: null,
            lastSyncedAt: cloudSave.updatedAt ?? new Date().toISOString(),
            syncSource: 'download',
          }))

          return
        }

        await uploadLatestSave({ force: true, playerIdOverride: playerId })
      } catch (error) {
        if (cancelled) return

        setState((current) => ({
          ...current,
          status: current.isActivity ? current.status : 'error',
          error: error instanceof Error ? error.message : 'discord_activity_init_failed',
          syncState: 'error',
          syncError: error instanceof Error ? error.message : 'discord_activity_init_failed',
        }))
      }
    }

    void bootstrap()

    return () => {
      cancelled = true
    }
  }, [importSettings, stores.gameStore, uploadLatestSave])

  useEffect(() => {
    if (!state.playerId) return undefined

    const intervalId = window.setInterval(() => {
      void uploadLatestSave()
    }, AUTO_SYNC_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [state.playerId, uploadLatestSave])

  const manualSync = useCallback(async () => {
    try {
      await uploadLatestSave({ force: true })
      return true
    } catch (error) {
      setState((current) => ({
        ...current,
        syncState: 'error',
        syncError: error instanceof Error ? error.message : 'manual_sync_failed',
      }))

      return false
    }
  }, [uploadLatestSave])

  const value = useMemo(() => ({
    ...state,
    manualSync,
  }), [manualSync, state])

  return <DiscordActivityContext.Provider value={value}>{children}</DiscordActivityContext.Provider>
}

export function useDiscordActivity() {
  const ctx = useContext(DiscordActivityContext)

  if (!ctx) {
    throw new Error('useDiscordActivity must be used within DiscordActivityProvider')
  }

  return ctx
}
