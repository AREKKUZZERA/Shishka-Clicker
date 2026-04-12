import {BottomNav} from "../bottom/BottomNav.jsx"
import {AchievementToast} from "../ui/AchievementToast.jsx"
import {DevConsole} from "../ui/DevConsole.jsx"
import {StatsBar} from "../stats/StatsBar.jsx"
import {lazy, memo, Suspense, useEffect} from "react"
import {Header} from "../header/Header.jsx"
import {setupDiscord} from "../../discord.js"
import {useNav} from "../../context/NavContext.jsx"
import {useSettingsContext} from "../../context/SettingsContext.jsx"
import {ScreenFallback} from "./ScreenFallback.jsx"


export const loadClickerScreen = () => import('../clicker/ClickerScreen')
export const loadShopScreen = () => import('../shop/ShopScreen')
export const loadSettingsScreen = () => import('../settings/SettingsScreen')
export const loadMetaScreen = () => import('../meta/MetaScreen')

const ClickerScreen = lazy(() => loadClickerScreen().then((module) => ({ default: module.ClickerScreen })))
const ShopScreen = lazy(() => loadShopScreen().then((module) => ({ default: module.ShopScreen })))
const SettingsScreen = lazy(() => loadSettingsScreen().then((module) => ({ default: module.SettingsScreen })))
const MetaScreen = lazy(() => loadMetaScreen().then((module) => ({ default: module.MetaScreen })))

function renderScreen(tabId) {
	switch (tabId) {
		case 'clicker':
			return <ClickerScreen />
		case 'subscriptions':
			return <ShopScreen type="subscriptions" />
		case 'upgrades':
			return <ShopScreen type="upgrades" />
		case 'meta':
			return <MetaScreen />
		case 'settings':
			return <SettingsScreen />
		default:
			return <ScreenFallback />
	}
}

const AppBackground = memo(function AppBackground({ visualEffectToggles }) {
	const showAmbientOrbs = visualEffectToggles.ambientEffects
	const showNoiseOverlay = visualEffectToggles.noiseOverlay

	return (
		<>
			{showAmbientOrbs && <div className="ambient ambient--a" />}
			{showAmbientOrbs && <div className="ambient ambient--b" />}
			{showAmbientOrbs && <div className="ambient ambient--c" />}
			{showNoiseOverlay && <div className="noise-overlay" />}
		</>
	)
})

export const AppWrapper = memo(function AppWrapper() {
	const { activeTab, transitionDirection } = useNav()
	const { visualEffectToggles } = useSettingsContext()

	useEffect(() => {
		void setupDiscord()
	}, [])

	useEffect(() => {
		const preloadScreens = () => {
			void loadClickerScreen()
			void loadShopScreen()
			void loadSettingsScreen()
			void loadMetaScreen()
		}

		if (typeof window === 'undefined') return undefined

		if (typeof window.requestIdleCallback === 'function') {
			const idleId = window.requestIdleCallback(preloadScreens, { timeout: 1200 })
			return () => window.cancelIdleCallback?.(idleId)
		}

		const timeoutId = window.setTimeout(preloadScreens, 250)
		return () => window.clearTimeout(timeoutId)
	}, [])

	return (
		<div className="app-shell">
			<AppBackground visualEffectToggles={visualEffectToggles} />

			<div className="app-content">
				<Header />
				<main className="app-main">
					<StatsBar className="stats-bar--shop" />
					<div className="screen-bg">
						<div className="screen__glow" />
						<div
							key={activeTab}
							className={`screen-stage ${visualEffectToggles.revealAnimations ? 'screen-stage--animate' : ''}`}
							data-direction={transitionDirection}
						>
							<Suspense fallback={<ScreenFallback />}>
								{renderScreen(activeTab)}
							</Suspense>
						</div>
					</div>
				</main>
			</div>

			<AchievementToast />
			<DevConsole />
			<BottomNav />
		</div>
	)
})
