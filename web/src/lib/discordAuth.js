export async function exchangeDiscordCode(code) {
  const response = await fetch('/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Discord token exchange failed: ${text}`)
  }

  return response.json()
}
