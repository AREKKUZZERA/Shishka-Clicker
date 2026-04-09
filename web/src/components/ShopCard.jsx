import { DESIGN_SYSTEM } from '../ui/designSystem'
import { formatNumber } from '../lib/format'

const currencyMeta = {
  money: { icon: '💵', label: 'деньги' },
  shishki: { icon: '🌰', label: 'шишки' },
  knowledge: { icon: '📚', label: 'знания' },
}

export function ShopCard({ item, level, cost, canBuy, onBuy, delay = 0 }) {
  const isLocked = item.unlocked === false
  const currency = currencyMeta[item.currency] ?? { icon: '✨', label: 'ресурс' }

  return (
    <article
      className="shop-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-4 text-left shadow-sm"
      style={{ animationDelay: `${delay * DESIGN_SYSTEM.motion.shopStaggerMs}ms` }}
    >
      <div className="shop-card__glow" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="shop-card__tier rounded-full border border-cyan-400/25 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold uppercase text-cyan-100">
              тир {item.tier}
            </div>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
          <p className="mt-1 text-sm text-white/65">{item.description}</p>
        </div>

        <div className="shop-card__level rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-100">
          ур. {level}
        </div>
      </div>

      <div className="relative mt-4 grid gap-3 shop-card__content">
        <div className="shop-card__info rounded-2xl border border-white/8 bg-white/4 px-3 py-3">
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/42">Эффект</div>
          <div className="shop-card__effect mt-2 font-medium text-fuchsia-100">
            {item.effectPreview?.currentText ?? item.effectLabel}
          </div>
          <div className="shop-card__next mt-1 text-xs text-white/45">{item.effectPreview?.nextText ?? 'Следующий уровень усилит этот слот'}</div>
        </div>

        <div className="shop-card__info rounded-2xl border border-white/8 bg-white/4 px-3 py-3">
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/42">Цена уровня</div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="font-semibold text-white">
              {formatNumber(cost)} {currency.icon}
            </div>
            <div className="shop-card__currency rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] font-semibold uppercase text-white/60">
              {currency.label}
            </div>
          </div>
        </div>

        {isLocked ? (
          <div className="shop-card__lock rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            <div className="font-semibold">Заблокировано</div>
            <div className="mt-1 text-amber-50/80">{item.unlockText}</div>
            <div className="mt-2 text-xs text-amber-50/70">
              Прогресс: {formatNumber(item.unlockProgress.shishki)} / {formatNumber(item.unlockRule.shishki)} 🌰 ·{' '}
              {formatNumber(item.unlockProgress.knowledge)} / {formatNumber(item.unlockRule.knowledge)} 📚
            </div>
          </div>
        ) : null}
      </div>

      <div className="relative mt-4 flex items-center gap-3 shop-card__footer">
        <button
          type="button"
          className="shop-button relative min-h-12 flex-1 overflow-hidden rounded-2xl px-4 py-3 font-semibold"
          disabled={!canBuy || isLocked}
          onClick={onBuy}
        >
          <span className="relative z-10">{isLocked ? 'Сначала открой тир' : canBuy ? 'Купить уровень' : 'Не хватает ресурса'}</span>
        </button>
      </div>
    </article>
  )
}
