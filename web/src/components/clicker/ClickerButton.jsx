import { useRef } from 'react'
import { useGameContext } from '../../context/GameContext'
import { useBursts } from '../../hooks/useBursts'
import { useSound } from '../../hooks/useSound'
import { ClickBurst } from '../ui/ClickBurst'
import { formatNumber } from '../../lib/format'
import buttonImage from '../../assets/disco.gif'
import vityaImage from '../../assets/v4.png'
import shishkaSound from '../../assets/shishka.mp3'

export function ClickerButton() {
  const { state, mineShishki } = useGameContext()
  const containerRef = useRef(null)
  const { bursts, addBurst } = useBursts()
  const { play } = useSound(shishkaSound, { volume: 0.5 })

  function handleClick(e) {
    if (e.detail === 0) { e.preventDefault(); return }
    play()
    mineShishki()

    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Number.isFinite(e.clientX) ? e.clientX - rect.left : rect.width / 2
    const y = Number.isFinite(e.clientY) ? e.clientY - rect.top : rect.height / 2
    addBurst(x, y, `+${formatNumber(state.clickPower)}`)
  }

  function preventKeyboard(e) {
    if (e.key === 'Enter' || e.key === ' ') e.preventDefault()
  }

  const isActive = state.shishkiPerSecond > 0

  return (
    <div ref={containerRef} className="clicker-wrap">
      <button
        className="clicker-btn"
        onClick={handleClick}
        onKeyDown={preventKeyboard}
        aria-label="Добыть шишки"
      >
        <div className="clicker-btn__halo" />
        <div className="clicker-btn__ring clicker-btn__ring--outer" />
        <div className="clicker-btn__ring clicker-btn__ring--inner" />
        <img
          src={isActive ? buttonImage : vityaImage}
          alt="Шишка"
          className="clicker-btn__hero"
          draggable={false}
        />
        <div className="clicker-btn__label">Кликни и добудь вышку</div>
        <div className="clicker-btn__sub">За клик: +{formatNumber(state.clickPower)} 🌰</div>
      </button>

      <ClickBurst bursts={bursts} />
    </div>
  )
}
