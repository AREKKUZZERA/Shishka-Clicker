import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { ConeIcon } from '../components/ui/ConeIcon'
import { PrizeIcon } from '../components/ui/GameIcon'

export const TABS = [
  {
    id: 'clicker',
    icon: <ConeIcon />,
    label: 'Кликер',
    description: 'Кликай шишку, следи за прогрессом',
  },
  {
    id: 'subscriptions',
    icon: '🧠',
    label: 'Подписки',
    description: 'AI-сервисы для пассивного дохода',
  },
  {
    id: 'upgrades',
    icon: '⚙️',
    label: 'Апгрейды',
    description: 'Инвестиции, автоматизация и мемы',
  },
  {
    id: 'meta',
    icon: <PrizeIcon />,
    label: 'Мета',
    description: 'Достижения, ребёрс и престиж',
  },
  {
    id: 'settings',
    icon: '🔊',
    label: 'Настройки',
    description: 'Звук, музыка и управление сохранением',
  },
]

const NavContext = createContext(null)

export function NavProvider({ children }) {
  const [activeTab, setActiveTab] = useState('clicker')
  const [transitionDirection, setTransitionDirection] = useState('forward')
  const currentTab = TABS.find((t) => t.id === activeTab) ?? TABS[0]
  const setActiveTabWithDirection = useCallback((nextTab) => {
    setActiveTab((currentTabId) => {
      if (currentTabId === nextTab) return currentTabId

      const currentIndex = TABS.findIndex((tab) => tab.id === currentTabId)
      const nextIndex = TABS.findIndex((tab) => tab.id === nextTab)
      setTransitionDirection(nextIndex >= currentIndex ? 'forward' : 'backward')
      return nextTab
    })
  }, [])

  const value = useMemo(
    () => ({ activeTab, setActiveTab: setActiveTabWithDirection, currentTab, tabs: TABS, transitionDirection }),
    [activeTab, currentTab, setActiveTabWithDirection, transitionDirection],
  )

  return (
    <NavContext.Provider value={value}>
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNav must be used within NavProvider')
  return ctx
}
