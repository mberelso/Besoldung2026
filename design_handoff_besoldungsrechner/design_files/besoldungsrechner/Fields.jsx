/* Fields.jsx — labeled input, select, checkbox-card primitives */
const Field = ({ label, hint, children }) => (
  <div className="field">
    <label className="field-label">{label}</label>
    {children}
    {hint && <span className="field-hint">{hint}</span>}
  </div>
);

const TextInput = ({ num, ...rest }) => <input className={`field-input ${num ? 'num' : ''}`} {...rest} />;

const Select = ({ children, ...rest }) => (
  <select className="field-select" {...rest}>{children}</select>
);

const CheckCard = ({ checked, onChange, children, hint }) => (
  <label className="checkbox-card">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <div>
      <span className="cc-main">{children}</span>
      {hint && <span className="cc-hint">{hint}</span>}
    </div>
  </label>
);

const Notice = ({ children, variant = 'warning' }) => (
  <div className="notice">
    <svg viewBox="0 0 20 20"><path d="M10 3 L17.5 16.5 H2.5 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 8 V12 M10 14.5 V14.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
    <p>{children}</p>
  </div>
);

const HandNote = ({ children, ink }) => (
  <span className={`hand-note ${ink ? 'ink' : ''}`}>{children}</span>
);

Object.assign(window, { Field, TextInput, Select, CheckCard, Notice, HandNote });
