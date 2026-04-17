import React from 'react';

const Step3_Months = ({ months, onChange }) => {
  const years = [
    { k: '2021', label: '2021', max: 12 },
    { k: '2022', label: '2022', max: 12 },
    { k: '2023', label: '2023', max: 12 },
    { k: '2024', label: '2024', max: 12 },
    { k: '2025', label: '2025', max: 12 },
    { k: '2026pre', label: '01–04/2026', max: 4 }
  ];

  const handleMonthChange = (key, max) => (e) => {
    let val = parseInt(e.target.value) || 0;
    val = Math.max(0, Math.min(max, val));
    onChange({ ...months, [key]: val });
  };

  return (
    <div className="wizard-step">
      <h2>3. Monate mit Dienstbezug</h2>
      <p className="sub mb-6">Für wie viele Monate im jeweiligen Kalenderjahr hattest du Anspruch auf volle Dienstbezüge?</p>
      
      <div className="glass-card mb-6" style={{ background: 'rgba(79, 70, 229, 0.05)', borderColor: 'var(--primary-light)' }}>
        <p className="text-sm">
          <strong>Regelfall: 12 Monate.</strong> Ausnahmen sind bspw. eine Ernennung im Laufe des Jahres, eigene Elternzeit, 
          unbezahlter Urlaub oder ein Wechsel des Dienstherrn. <br/>
          (für 01–04/2026 trag hier bitte maximal 4 Monate ein)
        </p>
      </div>

      <div className="grid cols-3 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
        {years.map(y => (
          <div key={y.k} className="form-group mb-2">
            <label>{y.label}
              <input 
                type="number" min="0" max={y.max} 
                value={months[y.k] !== undefined ? months[y.k] : y.max} 
                onChange={handleMonthChange(y.k, y.max)} 
                className="mt-2 text-center"
                style={{ fontSize: '1.2rem', fontWeight: 600 }}
              />
            </label>
            <div className="text-center text-xs text-muted">Max. {y.max}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step3_Months;
