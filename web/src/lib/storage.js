const SAVE_KEY = 'shishka-clicker-save-v4'

function normalizeStoredGame(rawValue) {
  if (!rawValue || typeof rawValue !== 'object' || Array.isArray(rawValue)) {
    return {
      state: null,
      updatedAt: null,
    }
  }

  if ('state' in rawValue && rawValue.state && typeof rawValue.state === 'object') {
    return {
      state: rawValue.state,
      updatedAt: typeof rawValue.updatedAt === 'string' ? rawValue.updatedAt : null,
    }
  }

  return {
    state: rawValue,
    updatedAt: null,
  }
}

export function loadGameRecord() {
  if (typeof window === 'undefined') {
    return {
      state: null,
      updatedAt: null,
    }
  }

  try {
    const raw = window.localStorage.getItem(SAVE_KEY)
    if (!raw) {
      return {
        state: null,
        updatedAt: null,
      }
    }

    return normalizeStoredGame(JSON.parse(raw))
  } catch (error) {
    console.warn('Failed to load save:', error)
    return {
      state: null,
      updatedAt: null,
    }
  }
}

export function loadGame() {
  return loadGameRecord().state
}

export function saveGame(state) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({
        version: 1,
        updatedAt: new Date().toISOString(),
        state,
      }),
    )
  } catch (error) {
    console.warn('Failed to save game:', error)
  }
}

export function clearGame() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(SAVE_KEY)
}
