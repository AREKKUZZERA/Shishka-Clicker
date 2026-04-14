import { createServerSupabase } from './_lib/supabase.js'

const PAGE_SIZE = 500
const TOP_LIMIT = 5

function isMissingLeaderboardRpc(error) {
  return (
    error?.code === 'PGRST202' ||
    error?.code === '42883' ||
    error?.message?.includes('get_player_leaderboard')
  )
}

function getGameState(saveData) {
  if (!saveData || typeof saveData !== 'object' || Array.isArray(saveData)) {
    return null
  }

  const payloadGame = saveData.payload?.game
  if (payloadGame && typeof payloadGame === 'object' && !Array.isArray(payloadGame)) {
    return payloadGame
  }

  return saveData
}

function getLifetimeShishki(gameState) {
  if (!gameState || typeof gameState !== 'object') {
    return 0
  }

  const value = Number(gameState.lifetimeShishkiEarned ?? gameState.totalShishkiEarned ?? 0)
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0
}

function formatPlayerName(row, index) {
  if (typeof row.player_username === 'string' && row.player_username.trim()) {
    return row.player_username.trim()
  }

  if (typeof row.player_id === 'string' && row.player_id.startsWith('discord:')) {
    return `Discord ${row.player_id.slice('discord:'.length, 'discord:'.length + 6)}`
  }

  return `Гость #${index + 1}`
}

async function loadLeaderboardRows(supabase) {
  const rows = []
  let from = 0

  while (true) {
    const to = from + PAGE_SIZE - 1
    const { data, error } = await supabase
      .from('player_saves')
      .select('player_id, player_username, save_data, updated_at')
      .range(from, to)

    if (error) {
      throw error
    }

    if (!Array.isArray(data) || data.length === 0) {
      break
    }

    rows.push(...data)

    if (data.length < PAGE_SIZE) {
      break
    }

    from += PAGE_SIZE
  }

  return rows
}

async function loadLeaderboardViaRpc(supabase) {
  const { data, error } = await supabase
    .rpc('get_player_leaderboard', {
      p_limit: TOP_LIMIT,
    })

  if (error) {
    throw error
  }

  return Array.isArray(data)
    ? data.map((row, index) => ({
        username: formatPlayerName(row, index),
        shishki: Number(row.shishki ?? 0),
        updatedAt: row.updated_at ?? null,
      }))
    : []
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'method_not_allowed',
    })
  }

  try {
    const supabase = createServerSupabase()
    let leaderboard

    try {
      leaderboard = await loadLeaderboardViaRpc(supabase)
    } catch (error) {
      if (!isMissingLeaderboardRpc(error)) {
        throw error
      }

      const rows = await loadLeaderboardRows(supabase)

      leaderboard = rows
        .map((row, index) => {
          const gameState = getGameState(row.save_data)

          return {
            username: formatPlayerName(row, index),
            shishki: getLifetimeShishki(gameState),
            updatedAt: row.updated_at ?? null,
          }
        })
        .filter((row) => row.shishki > 0)
        .sort((a, b) => {
          if (b.shishki !== a.shishki) {
            return b.shishki - a.shishki
          }

          return (Date.parse(b.updatedAt ?? '') || 0) - (Date.parse(a.updatedAt ?? '') || 0)
        })
        .slice(0, TOP_LIMIT)
    }

    return res.status(200).json({
      ok: true,
      leaderboard,
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'internal_error',
    })
  }
}
