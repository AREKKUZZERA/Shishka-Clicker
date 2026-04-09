export function Header({ user }) {
  return (
    <header className="app-header">
      <div className="app-header__glow" />
      <div className="app-header__inner">
        <div className="app-header__brand">
          <div className="app-header__kicker">Шишка кликер · v2</div>
          <h1 className="app-header__title">Шишки онлайн!</h1>
          <p className="app-header__sub">Добывай шишки, качай AI, захвати знания</p>
        </div>

        <div className="app-header__side">
          <div className="app-header__session">
            {user ? (
              <>
                <div className="session-badge">
                  <span className="session-badge__dot session-badge__dot--live" />
                  Discord Activity
                </div>
                <div className="session-badge__name">{user.username}</div>
              </>
            ) : (
              <>
                <div className="session-badge">
                  <span className="session-badge__dot" />
                  Локальная сессия
                </div>
                <div className="session-badge__hint">Браузер · autosave</div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
