import { Suspense, lazy, useEffect } from 'react'
import { setupDiscord } from '../../discord'
import { useNav } from '../../context/NavContext'
import { useBackgroundMusic } from '../../hooks/useBackgroundMusic'
import { Header } from './Header'
import { BottomNav } from './BottomNav'
import { AchievementToast } from '../ui/AchievementToast'
import { StatsBar } from '../stats/StatsBar'
import backgroundMusic from '../../assets/audio/music/background.mp3'

const ClickerScreen = lazy(() => import('../clicker/ClickerScreen').then((module) => ({ default: module.ClickerScreen })))
const ShopScreen = lazy(() => import('../shop/ShopScreen').then((module) => ({ default: module.ShopScreen })))
const SettingsScreen = lazy(() => import('../settings/SettingsScreen').then((module) => ({ default: module.SettingsScreen })))
const MetaScreen = lazy(() => import('../meta/MetaScreen').then((module) => ({ default: module.MetaScreen })))

function ScreenFallback() {
  return (
    <section className="screen">
      <div className="screen__glow" />
      <div className="screen__header">
        <span className="screen__kicker">Загрузка</span>
        <h2 className="screen__title">Подготавливаем экран</h2>
        <p className="screen__desc">
          UI теперь грузится по вкладкам, поэтому первый переход может занять долю секунды.
        </p>
      </div>
    </section>
  )
}

export function AppShell() {
  const { activeTab } = useNav()
  const statsBarClassName = activeTab === 'subscriptions' || activeTab === 'upgrades'
    ? 'stats-bar--shop'
    : ''

  useBackgroundMusic(backgroundMusic)

  useEffect(() => {
    void setupDiscord()
  }, [])

  return (
    <div className="app-shell">
      <div className="ambient ambient--a" />
      <div className="ambient ambient--b" />
      <div className="ambient ambient--c" />
      <div className="noise-overlay" />

      <div className="app-content">
        <Header />
        <main className="app-main">
          {activeTab !== 'clicker' && <StatsBar className={statsBarClassName} />}
          <Suspense fallback={<ScreenFallback />}>
            {activeTab === 'clicker' && <ClickerScreen />}
            {activeTab === 'subscriptions' && <ShopScreen type="subscriptions" />}
            {activeTab === 'upgrades' && <ShopScreen type="upgrades" />}
            {activeTab === 'meta' && <MetaScreen />}
            {activeTab === 'settings' && <SettingsScreen />}
          </Suspense>
        </main>
      </div>

      <AchievementToast />
      <BottomNav />
    </div>
  )
}
