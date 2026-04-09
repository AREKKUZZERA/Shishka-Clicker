import { ClickerButton } from './ClickerButton'
import { ProgressOverview } from './ProgressOverview'

export function ClickerScreen() {
  return (
    <section className="screen clicker-screen">
      <div className="screen__glow" />

      <div className="screen__header">
        <span className="screen__kicker">Главный экран</span>
        <h2 className="screen__title">Добыча и прогресс</h2>
        <p className="screen__desc">
          Кликай, держи темп экономики и смотри, какие ветки развития откроются следующими.
        </p>
      </div>

      <div className="clicker-layout">
        <div className="clicker-layout__left">
          <ClickerButton />
        </div>
        <div className="clicker-layout__right">
          <ProgressOverview />
        </div>
      </div>
    </section>
  )
}
