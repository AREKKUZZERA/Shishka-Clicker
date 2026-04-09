import { DiscordSDK } from "@discord/embedded-app-sdk"

export let discordSdk = null
try {
	discordSdk = new DiscordSDK(import.meta.env.VITE_CLIENT_ID)
} catch (e) {
	console.warn("Not running inside Discord:", e)
}

export async function setupDiscord() {
	if (!discordSdk) {
		console.warn("DiscordSDK not initialized")
		return null
	}
	try {
		await discordSdk.ready()
		const { user } = await discordSdk.commands.getUser()
		return user
	} catch (e) {
		console.warn("Failed to get Discord user:", e)
		return null
	}
}