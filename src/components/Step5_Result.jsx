import React, { useState } from 'react';
import { fmt } from '../logic/calculator';

const INFO_TEXTS = {
  '79b': 'Einmalige Pauschale von 138 € für jeden Beamten, der 2021 im Dienst war – unabhängig von Besoldungsgruppe oder Familie.',
  '79c': 'Ausgleich für A16/W1/R2, die durch die neue Tabelle 2026 verhältnismäßig weniger Zuwachs erhalten als andere Gruppen.',
  '79d': 'Die Nachzahlung gilt für das 1. und 2. Kind (nach Geburtsdatum), weil die bisherigen kindbezogenen Zuschläge verfassungsrechtlich zu niedrig waren. Berücksichtigt werden nur die Jahre 2021 (41 €/Mon.), 2022 (9 €/Mon.) und 2025 (52 €/Mon.) – für 2023 und 2024 ist laut Referentenentwurf eine gesonderte Rechtsverordnung erforderlich, die noch aussteht. Diese Jahre sind daher nicht im berechneten Betrag enthalten.',
  '79a': 'Rückwirkender ergänzender Familienzuschlag für Sonderfälle (Elternzeit, Pflege). Abzüglich des tatsächlichen Einkommens des Ehegatten.',
  '79e': 'Für Beamte mit 3+ Kindern. Wird nicht automatisch ausgezahlt, sondern muss individuell per Rechtsverordnung festgesetzt werden.',
  '3pct': 'Vorläufige Anhebung der Bruttobezüge um 3 % von Juli 2025 bis April 2026 als Überbrückung bis zur neuen Tabelle.',
};

const Step5_Result = ({ result, data, shareUrl }) => {
  const [openInfo, setOpenInfo] = useState({});
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  if (!result) return null;

  const toggleInfo = (key) => setOpenInfo(prev => ({ ...prev, [key]: !prev[key] }));

  const InfoBtn = ({ k }) => (
    <button
      className="info-btn no-print"
      onClick={() => toggleInfo(k)}
      title="Erklärung anzeigen"
    >?</button>
  );

  return (
    <div className="wizard-step">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.25rem' }}>5. Ergebnis & Zusammenfassung</h2>
          <p className="sub">Dein errechnetes Brutto-Gehalt und die voraussichtlichen Nachzahlungen.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
          <button
            className="btn btn-outline no-print"
            style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
            onClick={handleCopy}
          >
            {copied ? '✓ Link kopiert!' : '🔗 Link teilen'}
          </button>
          <button className="btn btn-outline no-print" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }} onClick={() => window.print()}>
            🖨 Drucken
          </button>
        </div>
      </div>

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
                <td><strong>Einmalzahlung für 2021 (§ 79b)</strong><InfoBtn k="79b" /><br/><span className="text-sm text-muted">138 € einmalig</span></td>
                <td>138 € × {data.m['2021'] > 0 ? 1 : 0}</td>
                <td className="num">{fmt(result.n_79b)}</td>
              </tr>
              {openInfo['79b'] && <tr className="info-row"><td colSpan="3">{INFO_TEXTS['79b']}</td></tr>}
              <tr>
                <td><strong>Einmalzahlung für 2025 (§ 79c)</strong><InfoBtn k="79c" /><br/><span className="text-sm text-muted">A16/W1/R2</span></td>
                <td>{data.order==='A'&&data.group==='A16'?'19,75 €':data.order==='W'&&data.group==='W1'?'20,67 €':data.order==='R'&&data.group==='R2'?'23,00 €':'–'} × {data.m[2025]} × TZ {data.part}</td>
                <td className="num">{fmt(result.n_79c)}</td>
              </tr>
              {openInfo['79c'] && <tr className="info-row"><td colSpan="3">{INFO_TEXTS['79c']}</td></tr>}
              <tr>
                <td><strong>Nachzahlung Kinder 1 & 2 (§ 79d)</strong><InfoBtn k="79d" /><br/><span className="text-sm text-muted">41/9/52 € pro Kind/Mon.</span></td>
                <td dangerouslySetInnerHTML={{__html: result.details79d.length ? result.details79d.join('<br>') : '—'}}></td>
                <td className="num">{fmt(result.n_79d)}</td>
              </tr>
              {openInfo['79d'] && <tr className="info-row"><td colSpan="3">{INFO_TEXTS['79d']}</td></tr>}
              <tr className="warning-row">
                <td colSpan="3">
                  <span style={{ fontWeight: 600 }}>⚠ 2023 &amp; 2024 noch offen:</span> Für diese zwei Jahre ist laut Referentenentwurf eine separate Rechtsverordnung erforderlich – der Betrag oben enthält sie <strong>nicht</strong>.
                </td>
              </tr>
              <tr>
                <td><strong>Erg. Familienzuschlag rückwirkend (§ 79a)</strong><InfoBtn k="79a" /><br/><span className="text-sm text-muted">§ 41/41a abzüglich Einkommen</span></td>
                <td>
                  {result.rows79a && result.rows79a.map((r, i) => (
                    <div key={i}><strong>{r.year}:</strong> {r.text}</div>
                  ))}
                  {(!result.rows79a || result.rows79a.length === 0) && '— (nicht zutreffend)'}
                </td>
                <td className="num">{fmt(result.n_79a)}</td>
              </tr>
              {openInfo['79a'] && <tr className="info-row"><td colSpan="3">{INFO_TEXTS['79a']}</td></tr>}
              <tr>
                <td><strong>Nachzahlung für 3+ Kinder (§ 79e)</strong><InfoBtn k="79e" /> <span className="text-sm text-muted">2017–04/26</span></td>
                <td className="text-muted">{result.n_79e_hint}</td>
                <td className="num">—</td>
              </tr>
              {openInfo['79e'] && <tr className="info-row"><td colSpan="3">{INFO_TEXTS['79e']}</td></tr>}
              <tr>
                <td><strong>3 %-Anhebung</strong><InfoBtn k="3pct" /> 07/2025–04/2026</td>
                <td>Brutto × (1−1/1,03) × {result.monate_3p} M.</td>
                <td className="num">{fmt(result.diff3)}</td>
              </tr>
              {openInfo['3pct'] && <tr className="info-row"><td colSpan="3">{INFO_TEXTS['3pct']}</td></tr>}
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
