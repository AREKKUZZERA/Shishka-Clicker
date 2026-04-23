import { describe, expect, it } from 'vitest'
import {
  buildDiscordTokenExchangeParams,
  resolveDiscordRedirectUri,
} from '../../../shared/discordOAuth.js'

describe('discord OAuth helpers', () => {
  it('uses the Discord Activity placeholder redirect URI by default', () => {
    expect(resolveDiscordRedirectUri({})).toBe('https://127.0.0.1')
  })

  it('prefers an explicit server redirect URI when provided', () => {
    expect(
      resolveDiscordRedirectUri({
        DISCORD_REDIRECT_URI: 'https://example.com/callback',
        VITE_DISCORD_REDIRECT_URI: 'https://127.0.0.1',
      }),
    ).toBe('https://example.com/callback')
  })

  it('includes redirect_uri in the token exchange payload', () => {
    const params = buildDiscordTokenExchangeParams({
      clientId: '123',
      clientSecret: 'secret',
      code: 'oauth-code',
      redirectUri: 'https://127.0.0.1',
    })

    expect(params.get('client_id')).toBe('123')
    expect(params.get('client_secret')).toBe('secret')
    expect(params.get('grant_type')).toBe('authorization_code')
    expect(params.get('code')).toBe('oauth-code')
    expect(params.get('redirect_uri')).toBe('https://127.0.0.1')
  })
})
