import { useRef, useState } from 'react'
import { useGameContext } from '../../context/GameContext'
import { useSettingsContext } from '../../context/SettingsContext'
import {
  buildSaveFileName,
  createSaveBundle,
  normalizeImportedBundle,
} from '../../lib/saveTransfer'

const APP_VERSION = '1.5.46'
const REPOSITORY_URL = 'https://github.com/AREKKUZZERA/Shishka-Clicker'
const CHANGELOG_URL = 'https://github.com/AREKKUZZERA/Shishka-Clicker/releases'
const PRIVACY_URL = 'https://arekkuzzera.github.io/privacy-policy-terms-of-service/privacy-policy.html'
const TERMS_URL = 'https://arekkuzzera.github.io/privacy-policy-terms-of-service/terms-of-service.html'

function ToggleRow({ label, hint, checked, onChange }) {
  return (
    <label className="settings-toggle">
      <div>
        <div className="settings-card__label">{label}</div>
        <div className="settings-card__hint">{hint}</div>
      </div>
      <button
        type="button"
        className={`settings-switch ${checked ? 'settings-switch--active' : ''}`}
        onClick={onChange}
        aria-pressed={checked}
      >
        <span className="settings-switch__thumb" />
      </button>
    </label>
  )
}

function RangeRow({ label, hint, value, onChange, min = 0, max = 100, step = 1, suffix = '%' }) {
  return (
    <label className="settings-range">
      <div className="settings-range__head">
        <div>
          <div className="settings-card__label">{label}</div>
          <div className="settings-card__hint">{hint}</div>
        </div>
        <div className="settings-range__value">{value}{suffix}</div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  )
}

function LinkTile({ title, hint, href }) {
  return (
    <a className="settings-link-tile" href={href} target="_blank" rel="noreferrer">
      <span className="settings-link-tile__title">{title}</span>
      <span className="settings-link-tile__hint">{hint}</span>
    </a>
  )
}

export function SettingsScreen() {
  const { resetGame, markSilenceLover, exportGameSave, importGameSave } = useGameContext()
  const {
    settings,
    setVolume,
    toggle,
    resetSettings,
    visualEffectCaps,
    exportSettings,
    importSettings,
  } = useSettingsContext()
  const importInputRef = useRef(null)
  const [transferStatus, setTransferStatus] = useState(null)

  const handleMusicToggle = () => {
    if (settings.musicEnabled) markSilenceLover()
    toggle('musicEnabled')
  }

  const handleMusicVolume = (value) => {
    if (value <= 5) markSilenceLover()
    setVolume('musicVolume', value)
  }

  const handleExportSave = () => {
    try {
      const bundle = createSaveBundle({
        gameState: exportGameSave(),
        settings: exportSettings(),
        appVersion: APP_VERSION,
      })
      const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = buildSaveFileName()
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      setTransferStatus({ type: 'success', text: 'Сохранение экспортировано в JSON-файл со всем прогрессом и настройками.' })
    } catch (error) {
      console.error(error)
      setTransferStatus({ type: 'error', text: 'Не удалось экспортировать сохранение.' })
    }
  }

  const handleImportClick = () => {
    importInputRef.current?.click()
  }

  const handleImportSave = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const rawText = await file.text()
      const imported = normalizeImportedBundle(JSON.parse(rawText))
      importGameSave(imported.game)
      if (imported.settings) {
        importSettings(imported.settings)
      }

      setTransferStatus({
        type: 'success',
        text: imported.isLegacy
          ? 'Старое сохранение импортировано. Игровой прогресс восстановлен.'
          : 'Сохранение импортировано. Восстановлены игровой прогресс и локальные настройки.',
      })
    } catch (error) {
      console.error(error)
      setTransferStatus({
        type: 'error',
        text: error instanceof Error ? error.message : 'Не удалось импортировать сохранение.',
      })
    } finally {
      event.target.value = ''
    }
  }

  return (
    <section className="screen settings-screen">
      <div className="screen__glow" />

      <div className="screen__header">
        <span className="screen__kicker">Настройки</span>
        <h2 className="screen__title">Звук, эффекты и информация о приложении</h2>
      </div>

      <div className="settings-grid">
        <article className="settings-card settings-card--wide">
          <div className="settings-card__head">
            <h3 className="settings-card__title">Аудио</h3>
            <span className="settings-chip">Основное</span>
          </div>

          <div className="settings-stack">
            <ToggleRow
              label="Звуковые эффекты"
              hint="Клики, покупки и переключение вкладок"
              checked={settings.soundEnabled}
              onChange={() => toggle('soundEnabled')}
            />

            <ToggleRow
              label="Фоновая музыка"
              hint="Выключение откроет секретное достижение для любителей тишины"
              checked={settings.musicEnabled}
              onChange={handleMusicToggle}
            />

            <RangeRow
              label="Общая громкость"
              hint="Главный множитель для всех звуков"
              value={settings.masterVolume}
              onChange={(value) => setVolume('masterVolume', value)}
            />

            <RangeRow
              label="Громкость эффектов"
              hint="Клики, покупки и UI"
              value={settings.effectsVolume}
              onChange={(value) => setVolume('effectsVolume', value)}
            />

            <RangeRow
              label="Громкость музыки"
              hint="Опусти почти в ноль, если хочешь тишины"
              value={settings.musicVolume}
              onChange={handleMusicVolume}
            />
          </div>

          <button type="button" className="settings-ghost-btn" onClick={resetSettings}>
            Сбросить настройки звука
          </button>
        </article>

        <article className="settings-card">
          <div className="settings-card__head">
            <h3 className="settings-card__title">Визуальные эффекты</h3>
            <span className="settings-chip">Производительность</span>
          </div>

          <RangeRow
            label="Плотность эффектов"
            hint="Один ползунок управляет общим лимитом шишек, эмодзи и всплывающих чисел на экране."
            value={settings.visualEffectsDensity}
            min={20}
            max={200}
            suffix="%"
            onChange={(value) => setVolume('visualEffectsDensity', value)}
          />

          <div className="settings-info-box">
            <div className="settings-info-box__title">Текущий лимит эффектов</div>
            <div className="settings-info-box__grid">
              <div>
                <span>Эмодзи и шишки</span>
                <strong>до {visualEffectCaps.particleCap}</strong>
              </div>
              <div>
                <span>Всплывающие числа</span>
                <strong>до {visualEffectCaps.burstCap}</strong>
              </div>
              <div>
                <span>Доп. спрайты шишек</span>
                <strong>до {visualEffectCaps.coneCap}</strong>
              </div>
              <div>
                <span>Общий бюджет</span>
                <strong>{visualEffectCaps.totalHint}</strong>
              </div>
            </div>
          </div>
        </article>

        <article className="settings-card">
          <div className="settings-card__head">
            <h3 className="settings-card__title">Экспорт и импорт сейвов</h3>
            <span className="settings-chip">Backup</span>
          </div>

          <p className="settings-card__hint settings-card__hint--block">
            Экспорт создаёт JSON-файл с полным прогрессом игрока, достижениями, престижем и локальными настройками.
            Импорт заменяет текущий сейв данными из файла.
          </p>

          <div className="settings-transfer-actions">
            <button type="button" className="settings-ghost-btn" onClick={handleExportSave}>
              Экспортировать сейв
            </button>
            <button type="button" className="settings-ghost-btn" onClick={handleImportClick}>
              Импортировать сейв
            </button>
          </div>

          <input
            ref={importInputRef}
            type="file"
            accept="application/json,.json,.shishka-save.json"
            className="settings-file-input"
            onChange={handleImportSave}
          />

          {transferStatus ? (
            <div className={`settings-transfer-status settings-transfer-status--${transferStatus.type}`}>
              {transferStatus.text}
            </div>
          ) : null}
        </article>

        <article className="settings-card">
          <div className="settings-card__head">
            <h3 className="settings-card__title">О приложении</h3>
            <span className="settings-chip">v{APP_VERSION}</span>
          </div>

          <div className="settings-about-grid">
            <div className="settings-about-item">
              <span>Версия</span>
              <strong>{APP_VERSION}</strong>
            </div>
            <div className="settings-about-item">
              <span>Репозиторий</span>
              <strong>GitHub</strong>
            </div>
          </div>

          <div className="settings-links-grid">
            <LinkTile title="Репозиторий" hint="Исходный код проекта на GitHub" href={REPOSITORY_URL} />
            <LinkTile title="Changelog" hint="Последние changelogs и обновления" href={CHANGELOG_URL} />
          </div>
        </article>

        <article className="settings-card">
          <div className="settings-card__head">
            <h3 className="settings-card__title">Документы</h3>
            <span className="settings-chip">Policy</span>
          </div>

          <div className="settings-links-grid">
            <LinkTile title="Privacy Policy" hint="Политика конфиденциальности" href={PRIVACY_URL} />
            <LinkTile title="Terms of Service" hint="Пользовательское соглашение" href={TERMS_URL} />
          </div>
        </article>

        <article className="settings-card settings-card--danger">
          <div className="settings-card__head">
            <h3 className="settings-card__title">Игра</h3>
            <span className="settings-chip settings-chip--danger">Опасно</span>
          </div>

          <p className="settings-card__hint settings-card__hint--block">
            Кнопка ниже очищает только игровое сохранение. Аудио и остальные локальные настройки останутся как есть.
          </p>

          <button type="button" className="reset-btn" onClick={resetGame}>
            Сбросить весь прогресс
          </button>
        </article>
      </div>
    </section>
  )
}
