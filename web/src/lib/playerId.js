const PLAYER_ID_KEY = 'shishka_player_id'

export function getOrCreatePlayerId() {
  let playerId = window.localStorage.getItem(PLAYER_ID_KEY)

  if (!playerId) {
    playerId = crypto.randomUUID()
    window.localStorage.setItem(PLAYER_ID_KEY, playerId)
  }

  return playerId
}