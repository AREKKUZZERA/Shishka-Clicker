import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'method_not_allowed',
    })
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl) {
      return res.status(500).json({
        ok: false,
        error: 'missing_SUPABASE_URL',
      })
    }

    if (!serviceRoleKey) {
      return res.status(500).json({
        ok: false,
        error: 'missing_SUPABASE_SERVICE_ROLE_KEY',
      })
    }

    const { playerId, appVersion, save } = req.body ?? {}

    if (!playerId || !save) {
      return res.status(400).json({
        ok: false,
        error: 'playerId and save are required',
      })
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)
    const normalizedPlayerId = String(playerId)

    const { data: existingRows, error: selectError } = await supabase
      .from('player_saves')
      .select('id')
      .eq('player_id', normalizedPlayerId)
      .order('updated_at', { ascending: false })

    if (selectError) {
      console.error('SAVE_SELECT_ERROR', selectError)
      return res.status(500).json({
        ok: false,
        error: selectError.message,
      })
    }

    const payload = {
      player_id: normalizedPlayerId,
      app_version: appVersion ?? null,
      save_version: 1,
      save_data: save,
    }

    let error = null

    if (existingRows?.length) {
      const newestRow = existingRows[0]
      const updateResult = await supabase
        .from('player_saves')
        .update(payload)
        .eq('id', newestRow.id)

      error = updateResult.error
    } else {
      const insertResult = await supabase
        .from('player_saves')
        .insert(payload)

      error = insertResult.error
    }

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
