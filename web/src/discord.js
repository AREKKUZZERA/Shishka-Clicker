import { DiscordSDK } from '@discord/embedded-app-sdk'

function createDiscordSdk() {
  try {
    return new DiscordSDK(import.meta.env.VITE_CLIENT_ID)
  } catch (error) {
    console.warn('Not running inside Discord:', error)
    return null
  }
}

const discordSdk = createDiscordSdk()

export async function setupDiscord() {
  if (!discordSdk) return null

  try {
    await discordSdk.ready()
    const { user } = await discordSdk.commands.getUser()
    return user
  } catch (error) {
    console.warn('Failed to get Discord user:', error)
    return null
  }
}
