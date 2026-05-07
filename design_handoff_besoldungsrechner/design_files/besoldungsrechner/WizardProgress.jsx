/* WizardProgress.jsx — pill trail with dashed construction line */
const WizardProgress = ({ step, total = 5, labels = [] }) => {
  const pct = ((step - 1) / (total - 1)) * 100;
  return (
    <div className="wiz-progress" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={total}>
      <div className="wiz-progress-fill" style={{ width: `calc(${pct}% - 10px * ${pct / 100} + 0px)` }} />
      {Array.from({ length: total }).map((_, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <div key={n} className="wiz-step">
            <div className={`wiz-pill ${done ? 'done' : ''} ${active ? 'active' : ''}`}>
              {done ? (
                <svg viewBox="0 0 20 20"><path d="M4 10.5 L8.5 15 L16 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : n}
            </div>
            <div className={`wiz-label ${active ? 'active' : ''}`}>{labels[i] || `Schritt ${n}`}</div>
          </div>
        );
      })}
    </div>
  );
};

Object.assign(window, { WizardProgress });
