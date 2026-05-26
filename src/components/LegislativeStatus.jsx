import React from 'react';

const STEPS = [
  { label: 'Referentenentwurf', date: 'Mai 2026', done: true, current: true },
  { label: 'Regierungsentwurf', date: null, done: false, current: false },
  { label: 'Bundestag', date: null, done: false, current: false },
  { label: 'Bundesrat', date: null, done: false, current: false },
  { label: 'Inkrafttreten', date: null, done: false, current: false },
];

const LegislativeStatus = () => (
  <div style={{
    background: 'var(--primary-light)',
    border: '1px solid var(--primary)',
    borderRadius: 'var(--radius-md)',
    padding: '0.9rem 1.25rem',
    marginBottom: '1.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.75rem',
    justifyContent: 'space-between',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', opacity: 0.8 }}>
        Gesetzgebungsstand
      </span>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 1, minWidth: 280, justifyContent: 'center' }}>
      {STEPS.map((s, i) => (
        <React.Fragment key={i}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: s.done ? 'var(--primary)' : 'var(--border-color)',
              border: s.current ? '2px solid var(--primary)' : '2px solid transparent',
              boxShadow: s.current ? '0 0 0 3px var(--primary-light)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', color: s.done ? 'white' : 'var(--text-muted)',
              fontWeight: 700, flexShrink: 0,
            }}>
              {s.done ? '✓' : i + 1}
            </div>
            <span style={{
              fontSize: '0.65rem', whiteSpace: 'nowrap',
              color: s.current ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: s.current ? 700 : 400,
              maxWidth: 70, textAlign: 'center', lineHeight: 1.2,
            }}>
              {s.label}
              {s.date && <><br/><span style={{ opacity: 0.7 }}>{s.date}</span></>}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{
              height: 2, flex: 1, minWidth: 12, maxWidth: 32,
              background: s.done && !s.current ? 'var(--primary)' : 'var(--border-color)',
              marginBottom: 16,
            }} />
          )}
        </React.Fragment>
      ))}
    </div>

    <a
      href="https://www.bmi.bund.de/SharedDocs/gesetzgebungsverfahren/DE/D3/amtsangemessene-alimentation.html"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'none',
        fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0,
      }}
    >
      BMI-Seite →
    </a>
  </div>
);

export default LegislativeStatus;
