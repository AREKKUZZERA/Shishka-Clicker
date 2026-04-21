import { describe, expect, it } from 'vitest'
import { shouldLoadDiscordSdk } from '../discord.js'

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
