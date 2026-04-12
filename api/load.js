import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'method_not_allowed',
    })
  }

  try {
    const { playerId } = req.query

    if (!playerId) {
      return res.status(400).json({
        ok: false,
        error: 'playerId is required',
      })
    }

    const { data, error } = await supabase
      .from('player_saves')
      .select('save_data, updated_at, app_version')
      .eq('player_id', String(playerId))
      .maybeSingle()

    if (error) {
      console.error('LOAD_ERROR', error)
      return res.status(500).json({
        ok: false,
        error: error.message,
      })
    }

    if (!data) {
      return res.status(404).json({
        ok: false,
        error: 'save_not_found',
      })
    }

    return res.status(200).json({
      ok: true,
      save: data.save_data,
      updatedAt: data.updated_at,
      appVersion: data.app_version,
    })
  } catch (error) {
    console.error('LOAD_FATAL', error)
    return res.status(500).json({
      ok: false,
      error: 'internal_error',
    })
  }
}