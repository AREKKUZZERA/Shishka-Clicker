import { useState } from 'react'
import { useDiscordActivity } from '../../context/DiscordActivityContext.jsx'

function formatDate(value) {
  if (!value) return 'нет данных'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'нет данных'

  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatNumber(value) {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
    notation: Number(value ?? 0) >= 100000 ? 'compact' : 'standard',
  }).format(Number(value ?? 0))
}

function Metric({ label, value }) {
  return (
    <div className="sync-conflict__metric">
      <span className="sync-conflict__metric-label">{label}</span>
      <span className="sync-conflict__metric-value">{value}</span>
    </div>
  )
}

function SnapshotCard({ title, snapshot, tone }) {
  return (
    <section className={`sync-conflict__snapshot sync-conflict__snapshot--${tone}`}>
      <div className="sync-conflict__snapshot-head">
        <h4 className="sync-conflict__snapshot-title">{title}</h4>
        <span className="sync-conflict__snapshot-time">{formatDate(snapshot?.updatedAt)}</span>
      </div>

      <div className="sync-conflict__metrics">
        <Metric label="Сила" value={formatNumber(snapshot?.progressScore)} />
        <Metric label="Шишки" value={formatNumber(snapshot?.lifetimeShishkiEarned)} />
        <Metric label="Деньги" value={formatNumber(snapshot?.lifetimeMoneyEarned)} />
        <Metric label="Знания" value={formatNumber(snapshot?.lifetimeKnowledgeEarned)} />
        <Metric label="Ребirth" value={formatNumber(snapshot?.rebirths)} />
        <Metric label="Осколки" value={formatNumber(snapshot?.prestigeShards)} />
        <Metric label="Ачивки" value={formatNumber(snapshot?.achievements)} />
        <Metric label="Апгрейды" value={formatNumber((snapshot?.subscriptions ?? 0) + (snapshot?.upgrades ?? 0))} />
      </div>
    </section>
  )
}

export function SyncConflictDialog() {
  const { conflict, acceptCloudSave, keepLocalSave, clearConflict } = useDiscordActivity()
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!conflict) return null

  const resolve = async (action) => {
    setIsSubmitting(true)
    try {
      await action()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="sync-conflict-overlay" role="dialog" aria-modal="true" aria-label="Конфликт сохранений">
      <div className="sync-conflict">
        <div className="sync-conflict__head">
          <div>
            <h3 className="sync-conflict__title">Выбери версию сохранения</h3>
            <p className="sync-conflict__text">
              Найдены две разные версии прогресса. Автосинхронизация остановлена.
            </p>
          </div>

          <button type="button" className="sync-conflict__close" onClick={clearConflict} disabled={isSubmitting}>
            Позже
          </button>
        </div>

        <div className="sync-conflict__grid">
          <SnapshotCard title="Это устройство" snapshot={conflict.local} tone="local" />
          <SnapshotCard title="Облако Discord" snapshot={conflict.remote} tone="cloud" />
        </div>

        <div className="sync-conflict__actions">
          <button
            type="button"
            className="settings-ghost-btn sync-conflict__button"
            onClick={() => void resolve(keepLocalSave)}
            disabled={isSubmitting}
          >
            Оставить это устройство
          </button>
          <button
            type="button"
            className="settings-ghost-btn sync-conflict__button"
            onClick={() => void resolve(acceptCloudSave)}
            disabled={isSubmitting}
          >
            Загрузить облако Discord
          </button>
        </div>
      </div>
    </div>
  )
}
