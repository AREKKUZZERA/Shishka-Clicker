import { makeAutoObservable, runInAction } from 'mobx'

const LEADERBOARD_REFRESH_MS = 15_000

export const WEBSOCKET_STATE = {
  LOADING: 'LOADING',
  READY: 'READY',
  FAILURE: 'FAILURE',
}

export default class WebsocketStore {
  user = null
  data = []
  state = WEBSOCKET_STATE.LOADING
  rootStore
  refreshIntervalId = null

  constructor(rootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this, { rootStore: false, refreshIntervalId: false }, { autoBind: true })
    this.init()
  }

  init() {
    if (typeof window === 'undefined') {
      return
    }

    void this.refreshLeaderboard()
    this.refreshIntervalId = window.setInterval(() => {
      void this.refreshLeaderboard()
    }, LEADERBOARD_REFRESH_MS)
  }

  async refreshLeaderboard() {
    if (this.state !== WEBSOCKET_STATE.READY) {
      this.state = WEBSOCKET_STATE.LOADING
    }

    try {
      const response = await fetch('/api/leaderboard', {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`leaderboard_request_failed:${response.status}`)
      }

      const payload = await response.json()
      const leaderboard = Array.isArray(payload?.leaderboard) ? payload.leaderboard : []

      runInAction(() => {
        this.data = leaderboard
        this.state = WEBSOCKET_STATE.READY
      })
    } catch {
      runInAction(() => {
        this.state = WEBSOCKET_STATE.FAILURE
      })
    }
  }

  setUser(user) {
    this.user = user
  }
}
