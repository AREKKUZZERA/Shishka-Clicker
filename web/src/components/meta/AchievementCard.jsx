import { PrizeIcon } from '../ui/GameIcon'

function getCardToneClass(achievement) {
  const tone = achievement.theme?.tone ?? 'slate'
  return `achievement-card--tone-${tone}`
}

function renderStatus(achievement) {
  if (achievement.kind === 'group') {
    if (achievement.currentLevel >= achievement.maxLevel) {
      return (
        <>
          <PrizeIcon /> Макс.
        </>
      )
    }

    if (achievement.currentLevel > 0) {
      return <>Прогресс {achievement.currentLevel}/{achievement.maxLevel}</>
    }

    return achievement.secret ? '🕶️ Скрыто' : '🔒 Не начато'
  }

  return achievement.unlocked ? (
    <>
      <PrizeIcon /> Открыто
    </>
  ) : achievement.secret ? '🕶️ Скрыто' : '🔒 В процессе'
}

export const AchievementCard = ({ achievement }) => {
  const toneClass = getCardToneClass(achievement)
  const icon = achievement.theme?.icon ?? '✦'

  if (achievement.kind === 'group') {
    const isDone = achievement.currentLevel >= achievement.maxLevel
    const nextPercent = achievement.nextTarget > 0
      ? Math.max(0, Math.min(100, (achievement.progressValue / achievement.nextTarget) * 100))
      : 100

    return (
      <article className={`meta-card achievement-card achievement-card--group ${toneClass} ${achievement.unlocked ? 'achievement-card--done' : ''}`}>
        <div className="achievement-card__head">
          <span className="achievement-card__eyebrow">
            <span className="achievement-card__icon" aria-hidden="true">{icon}</span>
            {achievement.category}
          </span>
          <span className="achievement-card__level">ур. {achievement.levelLabel}</span>
        </div>

        <h3 className="achievement-card__title">{achievement.title}</h3>

        <p className="achievement-card__desc">
          {isDone ? 'Линейка закрыта полностью.' : achievement.nextDescription}
        </p>

        <div className="achievement-card__progress">
          <div className="achievement-card__progress-meta">
            <span>{isDone ? 'Финальный уровень' : `До ${achievement.nextLevelLabel}`}</span>
            <span>{achievement.progressText}</span>
          </div>
          <div className="achievement-card__track">
            <div className="achievement-card__track-fill" style={{ width: `${isDone ? 100 : nextPercent}%` }} />
          </div>
        </div>

        <div className="achievement-card__status">
          {renderStatus(achievement)}
        </div>
      </article>
    )
  }

  return (
    <article className={`meta-card achievement-card ${toneClass} ${achievement.unlocked ? 'achievement-card--done' : ''} ${achievement.secret ? 'achievement-card--secret' : ''}`}>
      <div className="achievement-card__head">
        <span className="achievement-card__eyebrow">
          <span className="achievement-card__icon" aria-hidden="true">{icon}</span>
          {achievement.category}
        </span>
        <span className="achievement-card__level">ур. {achievement.tier}</span>
      </div>
      <h3 className="achievement-card__title">
        {achievement.unlocked ? achievement.title : achievement.secret ? '??? Секретное достижение' : achievement.title}
      </h3>
      <p className="achievement-card__desc">
        {achievement.unlocked || !achievement.secret
          ? achievement.description
          : 'Откроется только после выполнения скрытого условия.'}
      </p>
      <div className="achievement-card__status">
        {renderStatus(achievement)}
      </div>
    </article>
  )
}
