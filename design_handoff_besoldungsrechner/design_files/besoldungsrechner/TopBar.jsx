/* TopBar.jsx — brand mark + theme toggle */
const TopBar = () => {
  const [isDark, setIsDark] = React.useState(false);
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <img src="../../assets/logo-compass.svg" alt="Besoldung2026" />
        <div>
          <div className="topbar-title">Besoldungs- & Nachzahlungsrechner</div>
          <span className="topbar-sub">— für Beamte beim Bund ✎</span>
        </div>
      </div>
      <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
        <svg viewBox="0 0 20 20">
          {isDark ? (
            <>
              <circle cx="10" cy="10" r="3.5"/>
              <path d="M10 2.5 V4 M10 16 V17.5 M2.5 10 H4 M16 10 H17.5 M4.7 4.7 L5.8 5.8 M14.2 14.2 L15.3 15.3 M4.7 15.3 L5.8 14.2 M14.2 5.8 L15.3 4.7"/>
            </>
          ) : (
            <path d="M15.5 12.5 A6.5 6.5 0 1 1 7.5 4.5 A5 5 0 0 0 15.5 12.5 Z"/>
          )}
        </svg>
        {isDark ? 'Hell' : 'Dunkel'}
      </button>
    </header>
  );
};

Object.assign(window, { TopBar });
