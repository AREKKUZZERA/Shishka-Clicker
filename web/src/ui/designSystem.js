const BASE_THEME = {
  meta: {
    id: 'base',
    name: 'Base',
    tagline: '',
    badge: 'Base',
  },
  content: {
    heroTags: ['Idle economy', 'Tier unlocks', 'AI subscriptions', 'Knowledge loop'],
    floatingNotes: ['AI', 'GPT', 'PDF', 'Prompt', 'Grade', 'Lab'],
    statLiveLabel: 'live',
    contributionTitle: 'Главные драйверы',
  },
  motion: {
    revealDurationMs: 700,
    cardStaggerMs: 90,
    shopStaggerMs: 70,
    ambientDurationSec: 18,
    shimmerDurationSec: 3.4,
    pulseOuterDurationSec: 4.4,
    pulseInnerDurationSec: 3.6,
    pulseInnerDelaySec: 1.1,
    floatHeroDurationSec: 4.8,
    chipFloatDurationSec: 4.2,
    clickBurstDurationMs: 620,
    hoverDurationMs: 220,
    pressDurationMs: 180,
  },
  radius: {
    shell: '2rem',
    card: '1.5rem',
    button: '1rem',
    pill: '999px',
    badge: '999px',
  },
  blur: {
    ambientPx: 80,
    panelPx: 18,
    glowPx: 28,
    haloPx: 26,
  },
  typography: {
    bodyFont: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    headingFont: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    monoFont: "'JetBrains Mono', 'SFMono-Regular', ui-monospace, monospace",
    heroLetterSpacing: '-0.04em',
    sectionLetterSpacing: '0.28em',
    badgeLetterSpacing: '0.16em',
  },
  color: {
    text: '#d7daff',
    textStrong: '#ffffff',
    bg: '#0b0813',
    bgAlt: '#0f1020',
    border: 'rgba(255,255,255,0.10)',
    borderStrong: 'rgba(255,255,255,0.16)',
    panel: 'rgba(255,255,255,0.06)',
    panelStrong: 'rgba(255,255,255,0.10)',
    accent: '#d946ef',
    accent2: '#22d3ee',
    accent3: '#6366f1',
    danger: '#ef4444',
  },
  shadow: {
    panel: '0 24px 80px rgba(6,10,25,0.35)',
    button: '0 30px 70px rgba(6,10,25,0.22)',
    buttonHover: '0 34px 90px rgba(6,10,25,0.34)',
    cta: '0 16px 40px rgba(168,85,247,0.28)',
    ctaHover: '0 20px 50px rgba(168,85,247,0.35)',
  },
  scale: {
    cardHoverTranslateY: '-4px',
    cardMinorHoverTranslateY: '-2px',
    clickerHoverScale: '1.01',
    clickerPressScale: '0.985',
    heroHoverScale: '1.03',
  },
  layout: {
    gridSize: '48px',
    maxWidth: '80rem',
    heroImageMaxWidth: '280px',
    chipMinWidth: '56px',
  },
  scene: {
    bodyBackground:
      'radial-gradient(circle at top, color-mix(in srgb, var(--accent-3) 16%, transparent), transparent 34%), radial-gradient(circle at right top, color-mix(in srgb, var(--accent-2) 16%, transparent), transparent 28%), linear-gradient(180deg, var(--bg) 0%, var(--bg-alt) 100%)',
    selectionBackground: 'color-mix(in srgb, var(--accent) 35%, transparent)',
    ambientOpacity: 0.65,
    gridOpacity: 0.16,
    gridBlendMode: 'normal',
    gridMask: 'radial-gradient(circle at center, black 32%, transparent 84%)',
    gridLine: 'rgba(255,255,255,0.04)',
  },
  components: {
    glassPanelBorder: 'var(--border)',
    glassPanelBackground:
      'linear-gradient(180deg, color-mix(in srgb, var(--panel-strong) 82%, transparent), color-mix(in srgb, var(--panel) 88%, transparent))',
    glassPanelBefore:
      'linear-gradient(135deg, color-mix(in srgb, var(--text-strong) 10%, transparent), transparent 34%, transparent 60%, color-mix(in srgb, var(--text-strong) 5%, transparent))',
    glassPanelShadowExtra: 'none',
    heroGlow:
      'radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 28%, transparent), transparent 32%), radial-gradient(circle at top right, color-mix(in srgb, var(--accent-2) 20%, transparent), transparent 26%)',
    heroGlowOpacity: 0.9,
    sectionOverlay:
      'radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 16%, transparent), transparent 36%), radial-gradient(circle at bottom right, color-mix(in srgb, var(--accent-2) 16%, transparent), transparent 38%)',
    cardHoverBackground:
      'linear-gradient(180deg, color-mix(in srgb, var(--panel-strong) 88%, transparent), color-mix(in srgb, var(--panel) 92%, transparent))',
    cardHoverShadow: 'var(--shadow)',
    statBarBackground:
      'linear-gradient(90deg, color-mix(in srgb, var(--accent-2) 70%, white 6%), color-mix(in srgb, var(--accent) 92%, white 4%))',
    statBarShadow: '0 0 20px color-mix(in srgb, var(--accent-2) 28%, transparent)',
    clickerBackground:
      'linear-gradient(180deg, color-mix(in srgb, var(--panel-strong) 88%, transparent), color-mix(in srgb, var(--panel) 94%, transparent))',
    clickerBorder: 'var(--border)',
    clickerHalo:
      'radial-gradient(circle, color-mix(in srgb, var(--accent) 22%, transparent), transparent 62%)',
    clickerRingBorder: 'var(--border)',
    clickerHeroFilter: 'drop-shadow(0 22px 60px rgba(168, 85, 247, 0.36))',
    clickerHeroHoverFilter: 'drop-shadow(0 30px 80px rgba(34, 211, 238, 0.28))',
    floatingChipBackground: 'rgba(255, 255, 255, 0.06)',
    floatingChipBorder: 'var(--border)',
    floatingChipColor: 'rgba(255, 255, 255, 0.7)',
    infoPanelBackground: 'rgba(0, 0, 0, 0.18)',
    infoPanelBorder: 'var(--border)',
    metricAccentBackground: 'rgba(34, 211, 238, 0.1)',
    metricAccentBorder: 'rgba(34, 211, 238, 0.22)',
    metricAccentColor: 'rgba(224, 248, 255, 0.88)',
    shopCardGlow: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%)',
    shopEffectColor: 'rgb(240 171 252)',
    shopButtonEnabledBackground:
      'linear-gradient(135deg, rgba(217, 70, 239, 0.95), rgba(168, 85, 247, 0.95), rgba(34, 211, 238, 0.85))',
    shopButtonEnabledColor: '#ffffff',
    shopButtonEnabledShadow: 'var(--shadow-cta)',
    tierBadgeBackground: 'rgba(6, 182, 212, 0.10)',
    tierBadgeBorder: 'rgba(34, 211, 238, 0.25)',
    tierBadgeColor: 'rgb(207 250 254)',
    levelBadgeBackground: 'rgba(217, 70, 239, 0.10)',
    levelBadgeBorder: 'rgba(232, 121, 249, 0.30)',
    levelBadgeColor: 'rgb(250 232 255)',
    themeBadgeBackground:
      'linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent), color-mix(in srgb, var(--accent-2) 18%, transparent))',
    themeBadgeBorder: 'color-mix(in srgb, var(--accent-2) 35%, transparent)',
    themeOptionBackground:
      'linear-gradient(180deg, color-mix(in srgb, var(--panel-strong) 82%, transparent), color-mix(in srgb, var(--panel) 72%, transparent))',
    themeOptionBorder: 'color-mix(in srgb, var(--border-strong) 88%, transparent)',
    themeOptionActiveBackground:
      'linear-gradient(180deg, color-mix(in srgb, var(--accent) 14%, var(--panel-strong)), color-mix(in srgb, var(--accent-2) 12%, var(--panel)))',
    themeOptionActiveBorder: 'color-mix(in srgb, var(--accent) 48%, var(--accent-2))',
    themeOptionBadgeBackground: 'color-mix(in srgb, var(--accent-3) 18%, transparent)',
    themeOptionBadgeBorder: 'color-mix(in srgb, var(--accent-2) 28%, transparent)',
    themeOptionBadgeColor: 'var(--text-strong)',
    dangerBackground: 'rgba(239, 68, 68, 0.12)',
    dangerBorder: 'rgba(248, 113, 113, 0.34)',
    dangerColor: 'rgba(254, 202, 202, 0.94)',
    dangerShadow: 'none',
  },
}

function mergeTheme(base, override = {}) {
  return {
    ...base,
    ...override,
    meta: { ...base.meta, ...(override.meta || {}) },
    content: { ...base.content, ...(override.content || {}) },
    motion: { ...base.motion, ...(override.motion || {}) },
    radius: { ...base.radius, ...(override.radius || {}) },
    blur: { ...base.blur, ...(override.blur || {}) },
    typography: { ...base.typography, ...(override.typography || {}) },
    color: { ...base.color, ...(override.color || {}) },
    shadow: { ...base.shadow, ...(override.shadow || {}) },
    scale: { ...base.scale, ...(override.scale || {}) },
    layout: { ...base.layout, ...(override.layout || {}) },
    scene: { ...base.scene, ...(override.scene || {}) },
    components: { ...base.components, ...(override.components || {}) },
  }
}

export const THEME_PRESETS = {
  defaultSquad: mergeTheme(BASE_THEME, {
    meta: {
      id: 'defaultSquad',
      name: 'Default Squad',
      tagline: 'Базовая студенческая тема с мягким неоновым свечением и чистым premium idle UI.',
      badge: 'Core',
    },
    content: {
      heroTags: ['Default Squad', 'Idle economy', 'Tier unlocks', 'Knowledge loop'],
      floatingNotes: ['AI', 'GPT', 'PDF', 'Prompt', 'Grade', 'Lab'],
    },
    components: {
      glassPanelShadowExtra: '0 0 0 1px color-mix(in srgb, var(--accent) 8%, transparent)',
      themeBadgeBackground:
        'linear-gradient(135deg, color-mix(in srgb, var(--accent) 24%, transparent), color-mix(in srgb, var(--accent-2) 22%, transparent)), linear-gradient(180deg, color-mix(in srgb, var(--panel-strong) 82%, transparent), color-mix(in srgb, var(--panel) 72%, transparent))',
      themeOptionActiveBackground:
        'linear-gradient(135deg, color-mix(in srgb, var(--accent) 24%, transparent), color-mix(in srgb, var(--accent-2) 22%, transparent)), linear-gradient(180deg, color-mix(in srgb, var(--panel-strong) 82%, transparent), color-mix(in srgb, var(--panel) 72%, transparent))',
    },
  }),
  rgbGamer: mergeTheme(BASE_THEME, {
    meta: {
      id: 'rgbGamer',
      name: 'RGB геймерская',
      tagline: 'Максимум контраста, клубный glow и агрессивный геймерский ритм.',
      badge: 'RGB',
    },
    motion: {
      ambientDurationSec: 14,
      shimmerDurationSec: 2.4,
      pulseOuterDurationSec: 3.6,
      pulseInnerDurationSec: 2.8,
      chipFloatDurationSec: 3.4,
      hoverDurationMs: 180,
      pressDurationMs: 140,
    },
    blur: {
      ambientPx: 96,
      glowPx: 34,
      haloPx: 34,
    },
    typography: {
      heroLetterSpacing: '-0.06em',
      badgeLetterSpacing: '0.24em',
    },
    color: {
      text: '#eef2ff',
      bg: '#050816',
      bgAlt: '#0c1229',
      border: 'rgba(148,163,184,0.16)',
      borderStrong: 'rgba(255,255,255,0.24)',
      panel: 'rgba(15,23,42,0.58)',
      panelStrong: 'rgba(15,23,42,0.72)',
      accent: '#ff2fb3',
      accent2: '#00f5ff',
      accent3: '#8b5cf6',
      danger: '#ff4d6d',
    },
    shadow: {
      panel: '0 28px 90px rgba(2,6,23,0.55)',
      button: '0 28px 80px rgba(2,6,23,0.48)',
      buttonHover: '0 38px 110px rgba(2,6,23,0.62)',
      cta: '0 18px 44px rgba(255,47,179,0.36)',
      ctaHover: '0 24px 60px rgba(0,245,255,0.34)',
    },
    scale: {
      cardHoverTranslateY: '-6px',
      clickerHoverScale: '1.025',
      clickerPressScale: '0.98',
      heroHoverScale: '1.045',
    },
    content: {
      heroTags: ['RGB gamer', 'Reactive glow', 'High contrast', 'Arcade pressure'],
      floatingNotes: ['RGB', 'FPS', 'BOOST', 'META', 'CLUTCH', 'SYNC'],
    },
    scene: {
      bodyBackground:
        'radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 24%, transparent), transparent 24%), radial-gradient(circle at top right, color-mix(in srgb, var(--accent-2) 22%, transparent), transparent 24%), radial-gradient(circle at bottom center, color-mix(in srgb, var(--accent-3) 18%, transparent), transparent 30%), linear-gradient(180deg, var(--bg) 0%, var(--bg-alt) 100%)',
      gridOpacity: 0.28,
      gridBlendMode: 'screen',
    },
    components: {
      glassPanelBorder: 'color-mix(in srgb, var(--accent-2) 26%, var(--border))',
      glassPanelBackground:
        'linear-gradient(180deg, color-mix(in srgb, var(--panel-strong) 92%, transparent), color-mix(in srgb, var(--panel) 88%, transparent)), linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, transparent), transparent 30%, color-mix(in srgb, var(--accent-2) 8%, transparent))',
      glassPanelShadowExtra: '0 0 0 1px color-mix(in srgb, var(--accent) 22%, transparent), 0 0 34px color-mix(in srgb, var(--accent-2) 12%, transparent)',
      heroGlowOpacity: 1,
      cardHoverShadow:
        '0 0 0 1px color-mix(in srgb, var(--accent-2) 26%, transparent), 0 18px 50px rgba(2, 6, 23, 0.42), 0 0 42px color-mix(in srgb, var(--accent) 16%, transparent)',
      clickerBackground:
        'radial-gradient(circle at top, color-mix(in srgb, var(--accent) 22%, transparent), transparent 40%), linear-gradient(180deg, color-mix(in srgb, var(--panel-strong) 94%, transparent), color-mix(in srgb, var(--panel) 90%, transparent))',
      clickerBorder: 'color-mix(in srgb, var(--accent-2) 35%, transparent)',
      clickerHalo:
        'radial-gradient(circle, color-mix(in srgb, var(--accent) 26%, transparent), color-mix(in srgb, var(--accent-2) 12%, transparent) 45%, transparent 68%)',
      clickerRingBorder: 'color-mix(in srgb, var(--accent-2) 28%, transparent)',
      clickerHeroFilter:
        'drop-shadow(0 0 36px color-mix(in srgb, var(--accent) 24%, transparent)) drop-shadow(0 0 54px color-mix(in srgb, var(--accent-2) 18%, transparent))',
      clickerHeroHoverFilter:
        'drop-shadow(0 0 42px color-mix(in srgb, var(--accent) 28%, transparent)) drop-shadow(0 0 70px color-mix(in srgb, var(--accent-2) 24%, transparent))',
      floatingChipBackground:
        'linear-gradient(135deg, color-mix(in srgb, var(--accent) 24%, transparent), color-mix(in srgb, var(--accent-2) 16%, transparent))',
      floatingChipBorder: 'color-mix(in srgb, var(--accent-2) 32%, transparent)',
      shopCardGlow: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 34%, transparent), transparent 70%)',
      shopButtonEnabledBackground: 'linear-gradient(90deg, #ff2fb3 0%, #8b5cf6 48%, #00f5ff 100%)',
      shopButtonEnabledShadow: '0 0 0 1px color-mix(in srgb, var(--accent-2) 26%, transparent), var(--shadow-cta)',
      tierBadgeBackground: 'rgba(255, 47, 179, 0.12)',
      tierBadgeBorder: 'rgba(0, 245, 255, 0.32)',
      levelBadgeBackground: 'rgba(139, 92, 246, 0.18)',
      levelBadgeBorder: 'rgba(0, 245, 255, 0.22)',
      themeBadgeBackground:
        'linear-gradient(135deg, color-mix(in srgb, var(--accent) 28%, transparent), color-mix(in srgb, var(--accent-2) 22%, transparent))',
      themeOptionActiveBackground:
        'linear-gradient(135deg, color-mix(in srgb, var(--accent) 20%, transparent), color-mix(in srgb, var(--accent-2) 16%, transparent))',
      themeOptionBadgeBackground: 'color-mix(in srgb, var(--accent) 22%, transparent)',
      themeOptionBadgeBorder: 'color-mix(in srgb, var(--accent-2) 32%, transparent)',
      dangerShadow: '0 0 24px color-mix(in srgb, var(--danger) 14%, transparent)',
    },
  }),
  defaultSquadModerator: mergeTheme(BASE_THEME, {
    meta: {
      id: 'defaultSquadModerator',
      name: 'Default Squad модераторская',
      tagline: 'Более строгая, собранная и читабельная версия дефолтной темы.',
      badge: 'Mod',
    },
    motion: {
      ambientDurationSec: 22,
      shimmerDurationSec: 4,
      pulseOuterDurationSec: 5,
      pulseInnerDurationSec: 4.2,
      hoverDurationMs: 240,
    },
    blur: {
      ambientPx: 72,
      panelPx: 16,
      glowPx: 22,
      haloPx: 20,
    },
    radius: {
      card: '1.25rem',
      button: '0.95rem',
      badge: '0.8rem',
    },
    typography: {
      heroLetterSpacing: '-0.03em',
    },
    color: {
      text: '#dce7ff',
      bg: '#0a1020',
      bgAlt: '#11192b',
      border: 'rgba(148,163,184,0.15)',
      borderStrong: 'rgba(226,232,240,0.22)',
      panel: 'rgba(15,23,42,0.54)',
      panelStrong: 'rgba(30,41,59,0.72)',
      accent: '#60a5fa',
      accent2: '#22c55e',
      accent3: '#818cf8',
      danger: '#fb7185',
    },
    shadow: {
      panel: '0 22px 72px rgba(2,6,23,0.38)',
      button: '0 26px 68px rgba(2,6,23,0.28)',
      buttonHover: '0 30px 82px rgba(2,6,23,0.38)',
      cta: '0 14px 34px rgba(96,165,250,0.22)',
      ctaHover: '0 18px 42px rgba(34,197,94,0.22)',
    },
    content: {
      heroTags: ['Moderator mode', 'Readable layout', 'Lower noise', 'Focused control'],
      floatingNotes: ['MOD', 'LOG', 'RULES', 'AI', 'SAFE', 'FLOW'],
    },
    scene: {
      ambientOpacity: 0.42,
      gridOpacity: 0.10,
      gridMask: 'radial-gradient(circle at center, black 42%, transparent 96%)',
    },
    components: {
      glassPanelBorder: 'color-mix(in srgb, var(--border-strong) 90%, transparent)',
      glassPanelBackground:
        'linear-gradient(180deg, color-mix(in srgb, var(--panel-strong) 96%, transparent), color-mix(in srgb, var(--panel) 92%, transparent))',
      glassPanelBefore: 'linear-gradient(180deg, rgba(255,255,255,0.04), transparent 38%)',
      glassPanelShadowExtra: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 1px rgba(148,163,184,0.04)',
      heroGlowOpacity: 0.72,
      cardHoverShadow: '0 12px 34px rgba(2, 6, 23, 0.2)',
      clickerBackground:
        'linear-gradient(180deg, color-mix(in srgb, var(--panel-strong) 96%, transparent), color-mix(in srgb, var(--panel) 94%, transparent))',
      clickerBorder: 'color-mix(in srgb, var(--accent) 20%, var(--border))',
      floatingChipBackground: 'color-mix(in srgb, var(--panel-strong) 95%, transparent)',
      floatingChipColor: 'rgba(255,255,255,0.78)',
      shopButtonEnabledBackground:
        'linear-gradient(135deg, color-mix(in srgb, var(--accent) 85%, white 5%), color-mix(in srgb, var(--accent-2) 78%, black 6%))',
    },
  }),
  academic: mergeTheme(BASE_THEME, {
    meta: {
      id: 'academic',
      name: 'Академическая',
      tagline: 'Более статусная, спокойная и университетская подача с золотыми акцентами.',
      badge: 'Uni',
    },
    motion: {
      ambientDurationSec: 20,
      shimmerDurationSec: 3.8,
      pulseOuterDurationSec: 4.8,
      pulseInnerDurationSec: 4,
      chipFloatDurationSec: 5.2,
    },
    blur: {
      ambientPx: 88,
      panelPx: 20,
      glowPx: 24,
      haloPx: 28,
    },
    typography: {
      bodyFont: "'Inter', 'Segoe UI', sans-serif",
      headingFont: "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif",
      heroLetterSpacing: '-0.02em',
      sectionLetterSpacing: '0.3em',
      badgeLetterSpacing: '0.18em',
    },
    color: {
      text: '#f3efe3',
      textStrong: '#fffdf7',
      bg: '#120c08',
      bgAlt: '#1d1712',
      border: 'rgba(250,204,21,0.14)',
      borderStrong: 'rgba(250,204,21,0.22)',
      panel: 'rgba(73,54,31,0.24)',
      panelStrong: 'rgba(73,54,31,0.36)',
      accent: '#f59e0b',
      accent2: '#fde68a',
      accent3: '#78350f',
      danger: '#ef4444',
    },
    shadow: {
      panel: '0 26px 84px rgba(24,18,12,0.46)',
      button: '0 30px 78px rgba(24,18,12,0.30)',
      buttonHover: '0 34px 96px rgba(24,18,12,0.42)',
      cta: '0 16px 40px rgba(245,158,11,0.28)',
      ctaHover: '0 22px 54px rgba(253,230,138,0.18)',
    },
    content: {
      heroTags: ['Academic prestige', 'Research loop', 'Knowledge economy', 'University core'],
      floatingNotes: ['Thesis', 'Grant', 'Lab', 'Paper', 'Exam', 'Dean'],
    },
    scene: {
      bodyBackground:
        'radial-gradient(circle at top, rgba(245, 158, 11, 0.12), transparent 24%), radial-gradient(circle at bottom right, rgba(120, 53, 15, 0.18), transparent 32%), linear-gradient(180deg, var(--bg) 0%, var(--bg-alt) 100%)',
      gridOpacity: 0.08,
      gridLine: 'rgba(250, 204, 21, 0.06)',
    },
    components: {
      glassPanelBorder: 'color-mix(in srgb, var(--accent) 18%, var(--border))',
      glassPanelBackground:
        'linear-gradient(180deg, rgba(71, 53, 34, 0.82), rgba(46, 34, 22, 0.7)), repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0, rgba(255,255,255,0.018) 2px, transparent 2px, transparent 8px)',
      glassPanelBefore:
        'linear-gradient(135deg, rgba(253,230,138,0.08), transparent 35%, transparent 60%, rgba(245,158,11,0.06)), repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 5px)',
      glassPanelShadowExtra: 'inset 0 1px 0 rgba(255,255,255,0.05), inset 0 0 0 1px rgba(245,158,11,0.04)',
      clickerBackground:
        'radial-gradient(circle at top, rgba(245,158,11,0.14), transparent 42%), linear-gradient(180deg, rgba(88, 63, 35, 0.86), rgba(56, 40, 23, 0.82))',
      clickerBorder: 'rgba(245,158,11,0.24)',
      clickerHalo: 'radial-gradient(circle, rgba(245,158,11,0.22), rgba(253,230,138,0.12) 38%, transparent 68%)',
      clickerRingBorder: 'rgba(253,230,138,0.18)',
      clickerHeroFilter: 'drop-shadow(0 18px 40px rgba(245,158,11,0.22))',
      clickerHeroHoverFilter: 'drop-shadow(0 24px 54px rgba(245,158,11,0.26))',
      floatingChipBackground: 'rgba(120,53,15,0.22)',
      floatingChipBorder: 'rgba(253,230,138,0.16)',
      floatingChipColor: 'rgba(255,248,220,0.82)',
      shopEffectColor: 'rgba(255,236,179,0.94)',
      shopButtonEnabledBackground: 'linear-gradient(135deg, #9a6700, #d97706, #f3c56b)',
      shopButtonEnabledColor: '#fff9eb',
      tierBadgeBackground: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(253,230,138,0.12))',
      tierBadgeBorder: 'rgba(253,230,138,0.22)',
      tierBadgeColor: 'rgba(255,248,220,0.95)',
      levelBadgeBackground: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(253,230,138,0.12))',
      levelBadgeBorder: 'rgba(253,230,138,0.22)',
      levelBadgeColor: 'rgba(255,248,220,0.95)',
      themeBadgeBackground: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(253,230,138,0.12))',
      themeBadgeBorder: 'rgba(253,230,138,0.22)',
      themeOptionBadgeBackground: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(253,230,138,0.12))',
      themeOptionBadgeBorder: 'rgba(253,230,138,0.22)',
      themeOptionBadgeColor: 'rgba(255,248,220,0.95)',
      dangerBackground: 'rgba(127, 29, 29, 0.18)',
      dangerBorder: 'rgba(248, 113, 113, 0.22)',
    },
  }),
}



export function applyThemeOverrides(theme, overrides = {}) {
  return mergeTheme(theme, overrides)
}

export const THEME_EDITOR_FIELDS = [
  {
    section: 'Цвета',
    fields: [
      { key: 'color.accent', label: 'Основной акцент', type: 'color' },
      { key: 'color.accent2', label: 'Второй акцент', type: 'color' },
      { key: 'color.accent3', label: 'Третий акцент', type: 'color' },
      { key: 'color.bg', label: 'Фон', type: 'color' },
      { key: 'color.bgAlt', label: 'Второй фон', type: 'color' },
      { key: 'color.text', label: 'Текст', type: 'color' },
    ],
  },
  {
    section: 'Сцена и glow',
    fields: [
      { key: 'scene.ambientOpacity', label: 'Сила ambient', type: 'range', min: 0.1, max: 1, step: 0.01 },
      { key: 'scene.gridOpacity', label: 'Видимость сетки', type: 'range', min: 0, max: 0.5, step: 0.01 },
      { key: 'components.heroGlowOpacity', label: 'Glow hero', type: 'range', min: 0.1, max: 1.2, step: 0.01 },
      { key: 'blur.panelPx', label: 'Blur панелей', type: 'range', min: 6, max: 30, step: 1, unit: 'px' },
    ],
  },
  {
    section: 'Форма и движение',
    fields: [
      { key: 'radius.card', label: 'Радиус карточек', type: 'range', min: 12, max: 36, step: 1, unit: 'px' },
      { key: 'radius.button', label: 'Радиус кнопок', type: 'range', min: 10, max: 28, step: 1, unit: 'px' },
      { key: 'motion.ambientDurationSec', label: 'Скорость ambient', type: 'range', min: 8, max: 30, step: 1, unit: 'с' },
      { key: 'motion.hoverDurationMs', label: 'Плавность hover', type: 'range', min: 120, max: 360, step: 10, unit: 'мс' },
    ],
  },
]

export function getValueByPath(source, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), source)
}

export function setValueByPath(source, path, value) {
  const keys = path.split('.')
  const result = { ...source }
  let cursor = result
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      cursor[key] = value
      return
    }
    cursor[key] = { ...(cursor[key] || {}) }
    cursor = cursor[key]
  })
  return result
}

export const DEFAULT_THEME_ID = 'defaultSquad'
export const DESIGN_SYSTEM = THEME_PRESETS[DEFAULT_THEME_ID]
export const THEME_OPTIONS = Object.values(THEME_PRESETS).map((theme) => ({
  id: theme.meta.id,
  name: theme.meta.name,
  tagline: theme.meta.tagline,
  badge: theme.meta.badge,
}))

export function getThemeById(themeId) {
  return THEME_PRESETS[themeId] || DESIGN_SYSTEM
}

export function buildDesignVars(theme = DESIGN_SYSTEM) {
  return {
    '--ds-text': theme.color.text,
    '--ds-text-strong': theme.color.textStrong,
    '--ds-bg': theme.color.bg,
    '--ds-bg-alt': theme.color.bgAlt,
    '--ds-border': theme.color.border,
    '--ds-border-strong': theme.color.borderStrong,
    '--ds-panel': theme.color.panel,
    '--ds-panel-strong': theme.color.panelStrong,
    '--ds-accent': theme.color.accent,
    '--ds-accent-2': theme.color.accent2,
    '--ds-accent-3': theme.color.accent3,
    '--ds-danger': theme.color.danger,
    '--ds-shadow-panel': theme.shadow.panel,
    '--ds-shadow-button': theme.shadow.button,
    '--ds-shadow-button-hover': theme.shadow.buttonHover,
    '--ds-shadow-cta': theme.shadow.cta,
    '--ds-shadow-cta-hover': theme.shadow.ctaHover,
    '--ds-radius-shell': theme.radius.shell,
    '--ds-radius-card': theme.radius.card,
    '--ds-radius-button': theme.radius.button,
    '--ds-radius-pill': theme.radius.pill,
    '--ds-radius-badge': theme.radius.badge,
    '--ds-blur-ambient': `${theme.blur.ambientPx}px`,
    '--ds-blur-panel': `${theme.blur.panelPx}px`,
    '--ds-blur-glow': `${theme.blur.glowPx}px`,
    '--ds-blur-halo': `${theme.blur.haloPx}px`,
    '--ds-body-font': theme.typography.bodyFont,
    '--ds-heading-font': theme.typography.headingFont,
    '--ds-mono-font': theme.typography.monoFont,
    '--ds-hero-letter-spacing': theme.typography.heroLetterSpacing,
    '--ds-section-letter-spacing': theme.typography.sectionLetterSpacing,
    '--ds-badge-letter-spacing': theme.typography.badgeLetterSpacing,
    '--ds-motion-reveal': `${theme.motion.revealDurationMs}ms`,
    '--ds-motion-hover': `${theme.motion.hoverDurationMs}ms`,
    '--ds-motion-press': `${theme.motion.pressDurationMs}ms`,
    '--ds-motion-ambient': `${theme.motion.ambientDurationSec}s`,
    '--ds-motion-shimmer': `${theme.motion.shimmerDurationSec}s`,
    '--ds-motion-pulse-outer': `${theme.motion.pulseOuterDurationSec}s`,
    '--ds-motion-pulse-inner': `${theme.motion.pulseInnerDurationSec}s`,
    '--ds-motion-pulse-inner-delay': `${theme.motion.pulseInnerDelaySec}s`,
    '--ds-motion-float-hero': `${theme.motion.floatHeroDurationSec}s`,
    '--ds-motion-chip': `${theme.motion.chipFloatDurationSec}s`,
    '--ds-motion-burst': `${theme.motion.clickBurstDurationMs}ms`,
    '--ds-card-hover-y': theme.scale.cardHoverTranslateY,
    '--ds-card-hover-y-minor': theme.scale.cardMinorHoverTranslateY,
    '--ds-clicker-hover-scale': theme.scale.clickerHoverScale,
    '--ds-clicker-press-scale': theme.scale.clickerPressScale,
    '--ds-hero-hover-scale': theme.scale.heroHoverScale,
    '--ds-grid-size': theme.layout.gridSize,
    '--ds-max-width': theme.layout.maxWidth,
    '--ds-hero-max-width': theme.layout.heroImageMaxWidth,
    '--ds-chip-min-width': theme.layout.chipMinWidth,
    '--ds-scene-body-bg': theme.scene.bodyBackground,
    '--ds-scene-selection': theme.scene.selectionBackground,
    '--ds-scene-ambient-opacity': String(theme.scene.ambientOpacity),
    '--ds-scene-grid-opacity': String(theme.scene.gridOpacity),
    '--ds-scene-grid-blend': theme.scene.gridBlendMode,
    '--ds-scene-grid-mask': theme.scene.gridMask,
    '--ds-scene-grid-line': theme.scene.gridLine,
    '--ds-glass-panel-border': theme.components.glassPanelBorder,
    '--ds-glass-panel-bg': theme.components.glassPanelBackground,
    '--ds-glass-panel-before': theme.components.glassPanelBefore,
    '--ds-glass-panel-shadow-extra': theme.components.glassPanelShadowExtra,
    '--ds-hero-glow': theme.components.heroGlow,
    '--ds-hero-glow-opacity': String(theme.components.heroGlowOpacity),
    '--ds-section-overlay': theme.components.sectionOverlay,
    '--ds-card-hover-bg': theme.components.cardHoverBackground,
    '--ds-card-hover-shadow': theme.components.cardHoverShadow,
    '--ds-stat-bar-bg': theme.components.statBarBackground,
    '--ds-stat-bar-shadow': theme.components.statBarShadow,
    '--ds-clicker-bg': theme.components.clickerBackground,
    '--ds-clicker-border': theme.components.clickerBorder,
    '--ds-clicker-halo': theme.components.clickerHalo,
    '--ds-clicker-ring-border': theme.components.clickerRingBorder,
    '--ds-clicker-hero-filter': theme.components.clickerHeroFilter,
    '--ds-clicker-hero-hover-filter': theme.components.clickerHeroHoverFilter,
    '--ds-floating-chip-bg': theme.components.floatingChipBackground,
    '--ds-floating-chip-border': theme.components.floatingChipBorder,
    '--ds-floating-chip-color': theme.components.floatingChipColor,
    '--ds-info-panel-bg': theme.components.infoPanelBackground,
    '--ds-info-panel-border': theme.components.infoPanelBorder,
    '--ds-metric-accent-bg': theme.components.metricAccentBackground,
    '--ds-metric-accent-border': theme.components.metricAccentBorder,
    '--ds-metric-accent-color': theme.components.metricAccentColor,
    '--ds-shop-card-glow': theme.components.shopCardGlow,
    '--ds-shop-effect-color': theme.components.shopEffectColor,
    '--ds-shop-button-enabled-bg': theme.components.shopButtonEnabledBackground,
    '--ds-shop-button-enabled-color': theme.components.shopButtonEnabledColor,
    '--ds-shop-button-enabled-shadow': theme.components.shopButtonEnabledShadow,
    '--ds-tier-badge-bg': theme.components.tierBadgeBackground,
    '--ds-tier-badge-border': theme.components.tierBadgeBorder,
    '--ds-tier-badge-color': theme.components.tierBadgeColor,
    '--ds-level-badge-bg': theme.components.levelBadgeBackground,
    '--ds-level-badge-border': theme.components.levelBadgeBorder,
    '--ds-level-badge-color': theme.components.levelBadgeColor,
    '--ds-theme-badge-bg': theme.components.themeBadgeBackground,
    '--ds-theme-badge-border': theme.components.themeBadgeBorder,
    '--ds-theme-option-bg': theme.components.themeOptionBackground,
    '--ds-theme-option-border': theme.components.themeOptionBorder,
    '--ds-theme-option-active-bg': theme.components.themeOptionActiveBackground,
    '--ds-theme-option-active-border': theme.components.themeOptionActiveBorder,
    '--ds-theme-option-badge-bg': theme.components.themeOptionBadgeBackground,
    '--ds-theme-option-badge-border': theme.components.themeOptionBadgeBorder,
    '--ds-theme-option-badge-color': theme.components.themeOptionBadgeColor,
    '--ds-danger-bg': theme.components.dangerBackground,
    '--ds-danger-border': theme.components.dangerBorder,
    '--ds-danger-color': theme.components.dangerColor,
    '--ds-danger-shadow': theme.components.dangerShadow,
  }
}
