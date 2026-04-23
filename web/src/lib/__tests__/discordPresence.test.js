import { describe, expect, it } from 'vitest'
import {
  buildDiscordPresenceSource,
  buildDiscordRichPresence,
  getExternalPresenceImageUrl,
} from '../discordPresence.js'

describe('buildDiscordRichPresence', () => {
  it('uses market copy and shishka metrics for the market tab', () => {
    const presence = buildDiscordRichPresence({
      activeTab: 'market',
      gameState: {
        shishki: 5120,
        market: {
          positions: {
            pickupPointLeftovers: 2,
            parallelImport: 4,
            neuroCover: 1,
          },
        },
      },
      economy: {
        shishkiPerSecond: 32,
        clickPower: 5,
      },
      startedAt: 1_700_000_000,
    })

    expect(presence.details).toBe('Торгует серым дефицитом')
    expect(presence.state).toBe('Позиции: 7 • Шишки: 5,1K')
  })

  it('can build presence from a preformatted presence source', () => {
    const presence = buildDiscordRichPresence({
      activeTab: 'clicker',
      presenceSource: {
        shishkiPerSecondText: '32',
        clickPowerText: '5',
      },
      startedAt: 1_700_000_000,
    })

    expect(presence.state).toBe('Шишки/с: 32 • Клик: 5')
  })

  it('uses heavenly shishki and tar lumps on the meta tab', () => {
    const presence = buildDiscordRichPresence({
      activeTab: 'meta',
      gameState: {
        heavenlyShishki: 9,
        tarLumps: 4,
        rebirths: 3,
      },
      economy: {
        shishkiPerSecond: 128,
        clickPower: 2,
      },
      startedAt: 1_700_000_000,
    })

    expect(presence.details).toBe('Следит за мета-прогрессом')
    expect(presence.state).toBe('Небесные: 9 • Комки: 4')
  })

  it('does not attach external assets by default', () => {
    const presence = buildDiscordRichPresence({
      activeTab: 'clicker',
      gameState: {
        shishki: 100,
      },
      economy: {
        shishkiPerSecond: 2,
        clickPower: 1,
      },
      startedAt: 1_700_000_000,
    })

    expect(presence.assets).toBeUndefined()
  })
})

describe('buildDiscordPresenceSource', () => {
  it('normalizes economy values to display-level strings', () => {
    expect(
      buildDiscordPresenceSource({
        gameState: {
          shishki: 5_129,
          heavenlyShishki: 9,
          tarLumps: 4,
          buildings: {
            garagePicker: 3,
          },
          upgrades: {
            warehouseRhythm: 1,
          },
          market: {
            positions: {
              parallelImport: 2,
            },
          },
          achievements: {
            firstQuota: true,
          },
        },
        economy: {
          shishkiPerSecond: 32,
          clickPower: 5,
        },
      }),
    ).toEqual(
      expect.objectContaining({
        shishkiText: '5,1K',
        heavenlyShishkiText: '9',
        tarLumpsText: '4',
        marketPositionsText: '2',
        shishkiPerSecondText: '32',
        clickPowerText: '5',
      }),
    )
  })
})

describe('getExternalPresenceImageUrl', () => {
  it('returns the explicit env override when provided', () => {
    expect(
      getExternalPresenceImageUrl({
        env: {
          VITE_DISCORD_ACTIVITY_LARGE_IMAGE_URL:
            'https://cdn.example.com/presence.png',
        },
      }),
    ).toBe('https://cdn.example.com/presence.png')
  })
})
