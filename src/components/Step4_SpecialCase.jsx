import React from 'react';
import { MAX_DURATION } from '../logic/calculator';

const Step4_SpecialCase = ({ data, kids, incomes, onParamChange, onIncomeChange }) => {

  const handleIncomeFieldChange = (year, field) => (e) => {
    let val = parseFloat(e.target.value) || 0;
    val = Math.max(0, val);
    const yearObj = incomes[year] || { months: 0, erwerb: 0, elterngeld: 0, sonst: 0, kind: 0 };
    onIncomeChange(year, { ...yearObj, [field]: val });
  };

  const showTable = data.case41 !== 'none';
  const years = ['2021', '2022', '2023', '2024', '2025', '2026pre'];

  return (
    <div className="wizard-step">
      <h2>4. Besondere Lebenslagen (Sonderfälle)</h2>
      <p className="sub mb-6 text-warning">Optional – Nur ausfüllen, wenn Besonderheiten (wie z. B. Elternzeit des Ehegatten oder Pflegefälle) innerhalb der letzten Jahre vorlagen.</p>

      <div className="glass-card mb-6">
        <label>Tatbestand
          <select 
            value={data.case41} 
            onChange={(e) => onParamChange({ case41: e.target.value })}
            className="mb-4"
          >
            <option value="none">– nicht erfüllt (überspringen) –</option>
            <option value="n1">Nr. 1: Ehegatte Elternzeit (Kind &lt; 1 J.)</option>
            <option value="n2">Nr. 2: Ehegatte pflegt Angehörigen (PG ≥ 2)</option>
            <option value="n3">Nr. 3: Ehegatte pflegt euer Kind (PG ≥ 2)</option>
            <option value="n4">Nr. 4: Ehegatte dauerhaft erwerbsunfähig</option>
            <option value="n5">Nr. 5: Ehegatte krank, Krankengeld erloschen</option>
            <option value="a">§ 41a: alleinerziehend, 2+ Kinder</option>
          </select>
        </label>

        {data.case41 !== 'none' && (
          <div className="grid cols-2 gap-4 mt-4">
            <div className="form-group mb-0">
              <label>Max. Laufzeit laut Gesetz
                <input type="text" readOnly value={MAX_DURATION[data.case41] || '–'} disabled />
              </label>
            </div>
            {data.case41 === 'n1' && (
              <div className="form-group mb-0">
                <label style={{ marginBottom: '0.4rem', display: 'block' }}>Bezugskinder (bei Nr. 1)</label>
                {kids.length === 0 && (
                  <p className="text-sm text-muted">Keine Kinder in Schritt 2 eingetragen.</p>
                )}
                {kids.map(k => (
                  <label key={k.idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 400, marginBottom: '0.3rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={(data.refChildrenN1 || []).includes(k.idx)}
                      onChange={e => {
                        const prev = data.refChildrenN1 || [];
                        const next = e.target.checked
                          ? [...prev, k.idx]
                          : prev.filter(i => i !== k.idx);
                        onParamChange({ refChildrenN1: next });
                      }}
                    />
                    Kind {k.idx}{k.birth ? ` (geb. ${k.birth})` : ''}
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showTable && (
        <div className="mt-8">
          <h3 className="mb-4">Pro Jahr: Einkommen des Ehegatten & Monate</h3>
          <p className="text-sm text-muted mb-4">Nur für Jahre ausfüllen, in denen die oben gewählte Voraussetzung vorlag.</p>
          
          <div style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
            <table className="result-table" style={{ width: '100%', minWidth: '700px' }}>
              <thead>
                <tr>
                  <th style={{width: '90px'}}>Jahr</th>
                  <th>Betroffene Monate</th>
                  <th>Bruttoerwerb (€/Jahr)</th>
                  <th>Elterngeld (€/J)</th>
                  <th>Sonst (€/J)</th>
                  <th>Kind 1/2 (€/J)</th>
                </tr>
              </thead>
              <tbody>
                {years.map(y => {
                  const inc = incomes[y] || { months: 0, erwerb: 0, elterngeld: 0, sonst: 0, kind: 0 };
                  const lbl = y === '2026pre' ? 'Bis 04/26' : y;
                  const maxM = y === '2026pre' ? 4 : 12;
                  return (
                    <tr key={y}>
                      <td style={{fontWeight: 600, color: 'var(--primary)'}}>{lbl}</td>
                      <td><input type="number" min="0" max={maxM} value={inc.months} onChange={handleIncomeFieldChange(y, 'months')} /></td>
                      <td><input type="number" min="0" step="100" value={inc.erwerb} onChange={handleIncomeFieldChange(y, 'erwerb')} /></td>
                      <td><input type="number" min="0" step="100" value={inc.elterngeld} onChange={handleIncomeFieldChange(y, 'elterngeld')} /></td>
                      <td><input type="number" min="0" step="100" value={inc.sonst} onChange={handleIncomeFieldChange(y, 'sonst')} /></td>
                      <td><input type="number" min="0" step="50" value={inc.kind} onChange={handleIncomeFieldChange(y, 'kind')} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4_SpecialCase;
