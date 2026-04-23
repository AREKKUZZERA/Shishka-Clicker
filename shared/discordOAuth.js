export const DISCORD_ACTIVITY_PLACEHOLDER_REDIRECT_URI = 'https://127.0.0.1'

export function resolveDiscordRedirectUri(env = {}) {
  return (
    env.DISCORD_REDIRECT_URI ??
    env.VITE_DISCORD_REDIRECT_URI ??
    DISCORD_ACTIVITY_PLACEHOLDER_REDIRECT_URI
  )
}

export function buildDiscordTokenExchangeParams({
  clientId,
  clientSecret,
  code,
  redirectUri = DISCORD_ACTIVITY_PLACEHOLDER_REDIRECT_URI,
}) {
  return new URLSearchParams({
    client_id: String(clientId),
    client_secret: String(clientSecret),
    grant_type: 'authorization_code',
    code: String(code),
    redirect_uri: String(redirectUri),
  })
}
