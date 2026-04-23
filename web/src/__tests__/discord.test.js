import { describe, expect, it } from 'vitest'
import {
  buildDiscordAuthorizeParams,
  formatDiscordCommandError,
  shouldLoadDiscordSdk,
} from '../discord.js'

describe('shouldLoadDiscordSdk', () => {
  it('loads the Discord SDK whenever a browser runtime and client id are available', () => {
    expect(
      shouldLoadDiscordSdk({
        hasWindow: true,
        clientId: '1234567890',
      }),
    ).toBe(true)
  })

  it('does not load the Discord SDK without a browser runtime', () => {
    expect(
      shouldLoadDiscordSdk({
        hasWindow: false,
        clientId: '1234567890',
      }),
    ).toBe(false)
  })

  it('does not load the Discord SDK without a client id', () => {
    expect(
      shouldLoadDiscordSdk({
        hasWindow: true,
        clientId: '',
      }),
    ).toBe(false)
  })
})

describe('formatDiscordCommandError', () => {
  it('includes status, code, method, and path when available', () => {
    const error = {
      message: 'Forbidden',
      status: 403,
      code: 50001,
      method: 'POST',
      path: '/interactions',
    }

    expect(formatDiscordCommandError(error)).toBe(
      'Forbidden [status=403, code=50001, POST /interactions]',
    )
  })

  it('falls back to a stable unknown error message', () => {
    expect(formatDiscordCommandError(null)).toBe('unknown_error')
  })
})

describe('buildDiscordAuthorizeParams', () => {
  it('does not include redirect_uri in the RPC authorize payload', () => {
    expect(
      buildDiscordAuthorizeParams({
        clientId: '1491615613993488454',
      }),
    ).toEqual({
      client_id: '1491615613993488454',
      response_type: 'code',
      state: 'discord-activity',
      prompt: 'none',
      scope: ['identify', 'rpc.activities.write'],
    })
  })
})
