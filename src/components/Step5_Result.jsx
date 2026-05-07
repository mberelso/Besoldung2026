import React from 'react';
import { fmt } from '../logic/calculator';

const Step5_Result = ({ result, data }) => {
  if (!result) return null;

  return (
    <div className="wizard-step">
      <h2>5. Ergebnis & Zusammenfassung</h2>
      <p className="sub mb-6">Dein errechnetes Brutto-Gehalt und die voraussichtlichen Nachzahlungen.</p>

      <div className="flex flex-col gap-6 mb-6">
        <div className="glass-card">
          <h3 className="mb-4">04/2025 – 04/2026</h3>
          <table className="result-table">
            <tbody>
              <tr><td>Grundgehalt</td><td className="num">{fmt(result.apr25.gg)}</td></tr>
              <tr><td>Laufbahn-Erhöhung</td><td className="num">{fmt(result.apr25.erh)}</td></tr>
              <tr><td>Familienzuschlag</td><td className="num">{fmt(result.apr25.fz)}</td></tr>
              <tr><td>Ergänzender Familienzuschlag</td><td className="num">{fmt(result.apr25.efz)}</td></tr>
              <tr className="brutto-row"><td>Brutto × TZ</td><td className="num">{fmt(result.apr25.brutto)}</td></tr>
              {data.taxClass && result.apr25.taxes && (
                <>
                  <tr className="text-sm" style={{opacity: 0.8}}><td>– Lohnsteuer (Näherung)</td><td className="num">{fmt(result.apr25.taxes.lohnsteuer)}</td></tr>
                  <tr className="text-sm" style={{opacity: 0.8}}><td>– Solidaritätszuschlag</td><td className="num">{fmt(result.apr25.taxes.soli)}</td></tr>
                  <tr className="text-sm" style={{opacity: 0.8}}><td>– Kirchensteuer</td><td className="num">{fmt(result.apr25.taxes.kirchensteuer)}</td></tr>
                  <tr className="total-row"><td>Steuer-Netto</td><td className="num">{fmt(result.apr25.netto)}</td></tr>
                  {parseFloat(data.pkvMonthly) > 0 && (
                    <>
                      <tr className="text-sm" style={{opacity: 0.8}}><td>– PKV-Beitrag</td><td className="num">{fmt(parseFloat(data.pkvMonthly))}</td></tr>
                      <tr className="primary-row"><td>Verfügbar</td><td className="num" style={{fontSize: '1.2rem'}}>{fmt(result.apr25.verfuegbar)}</td></tr>
                    </>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="glass-card">
          <h3 className="mb-4 text-primary">ab 05/2026 <span className="text-sm font-normal">(Tabellenreform)</span></h3>
          <table className="result-table">
            <tbody>
              <tr><td>Grundgehalt (neu)</td><td className="num">{fmt(result.may26.gg)}</td></tr>
              <tr><td className="text-muted">Erhöhung (entfällt)</td><td className="num">{fmt(result.may26.erh)}</td></tr>
              <tr><td>Familienzuschlag</td><td className="num">{fmt(result.may26.fz)}</td></tr>
              <tr><td>Ergänzender Familienzuschlag</td><td className="num">{fmt(result.may26.efz)}</td></tr>
              <tr className="brutto-row"><td>Brutto × TZ</td><td className="num">{fmt(result.may26.brutto)}</td></tr>
              {data.taxClass && result.may26.taxes && (
                <>
                  <tr className="text-sm" style={{opacity: 0.8}}><td>– Lohnsteuer (Näherung)</td><td className="num">{fmt(result.may26.taxes.lohnsteuer)}</td></tr>
                  <tr className="text-sm" style={{opacity: 0.8}}><td>– Solidaritätszuschlag</td><td className="num">{fmt(result.may26.taxes.soli)}</td></tr>
                  <tr className="text-sm" style={{opacity: 0.8}}><td>– Kirchensteuer</td><td className="num">{fmt(result.may26.taxes.kirchensteuer)}</td></tr>
                  <tr className="total-row"><td>Steuer-Netto</td><td className="num">{fmt(result.may26.netto)}</td></tr>
                  {parseFloat(data.pkvMonthly) > 0 && (
                    <>
                      <tr className="text-sm" style={{opacity: 0.8}}><td>– PKV-Beitrag</td><td className="num">{fmt(parseFloat(data.pkvMonthly))}</td></tr>
                      <tr className="primary-row"><td>Verfügbar</td><td className="num" style={{fontSize: '1.2rem'}}>{fmt(result.may26.verfuegbar)}</td></tr>
                    </>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card mb-6">
        <h3 className="mb-4 text-success">Nachzahlung §§ 79a–79e + 3 %</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="result-table">
            <thead>
              <tr>
                <th>Anspruch</th>
                <th>Berechnung</th>
                <th className="num">Betrag</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Einmalzahlung für 2021 (§ 79b)</strong><br/><span className="text-sm text-muted">138 € einmalig</span></td>
                <td>138 € × {data.m['2021'] > 0 ? 1 : 0}</td>
                <td className="num">{fmt(result.n_79b)}</td>
              </tr>
              <tr>
                <td><strong>Einmalzahlung für 2025 (§ 79c)</strong><br/><span className="text-sm text-muted">A16/W1/R2</span></td>
                <td>{data.order==='A'&&data.group==='A16'?'19,75 €':data.order==='W'&&data.group==='W1'?'20,67 €':data.order==='R'&&data.group==='R2'?'23,00 €':'–'} × {data.m[2025]} × TZ {data.part}</td>
                <td className="num">{fmt(result.n_79c)}</td>
              </tr>
              <tr>
                <td><strong>Nachzahlung Kinder 1 & 2 (§ 79d)</strong><br/><span className="text-sm text-muted">41/9/52 € pro Kind/Mon.</span></td>
                <td dangerouslySetInnerHTML={{__html: result.details79d.length ? result.details79d.join('<br>') : '—'}}></td>
                <td className="num">{fmt(result.n_79d)}</td>
              </tr>
              <tr>
                <td><strong>Erg. Familienzuschlag rückwirkend (§ 79a)</strong><br/><span className="text-sm text-muted">§ 41/41a abzüglich Einkommen</span></td>
                <td>
                  {result.rows79a && result.rows79a.map((r, i) => (
                    <div key={i}><strong>{r.year}:</strong> {r.text}</div>
                  ))}
                  {(!result.rows79a || result.rows79a.length === 0) && '— (nicht zutreffend)'}
                </td>
                <td className="num">{fmt(result.n_79a)}</td>
              </tr>
              <tr>
                <td><strong>Nachzahlung für 3+ Kinder (§ 79e)</strong> <span className="text-sm text-muted">2017–04/26</span></td>
                <td className="text-muted">{result.n_79e_hint}</td>
                <td className="num">—</td>
              </tr>
              <tr>
                <td><strong>3 %-Anhebung</strong> 07/2025–04/2026</td>
                <td>Brutto × (1−1/1,03) × {result.monate_3p} M.</td>
                <td className="num">{fmt(result.diff3)}</td>
              </tr>
              <tr className="total-row">
                <td colSpan="2">Summe Brutto-Nachzahlung (ohne § 79e)</td>
                <td className="num" style={{ fontSize: '1.2rem' }}>{fmt(result.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Step5_Result;
