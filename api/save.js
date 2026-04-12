import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'method_not_allowed',
    })
  }

  try {
    const { playerId, appVersion, save } = req.body ?? {}

    if (!playerId || !save) {
      return res.status(400).json({
        ok: false,
        error: 'playerId and save are required',
      })
    }

    const { error } = await supabase
      .from('player_saves')
      .upsert(
        {
          player_id: String(playerId),
          app_version: appVersion ?? null,
          save_version: 1,
          save_data: save,
        },
        {
          onConflict: 'player_id',
        }
      )

    if (error) {
      console.error('SAVE_ERROR', error)
      return res.status(500).json({
        ok: false,
        error: error.message,
      })
    }

    return res.status(200).json({
      ok: true,
    })
  } catch (error) {
    console.error('SAVE_FATAL', error)
    return res.status(500).json({
      ok: false,
      error: 'internal_error',
    })
  }
}