/* Steps.jsx — wizard step bodies */
const GROUPS = {
  A: ['A 3','A 4','A 5','A 6','A 7','A 8','A 9','A 10','A 11','A 12','A 13','A 14','A 15','A 16'],
  B: ['B 1','B 2','B 3','B 4','B 5','B 6','B 7','B 8','B 9','B 10','B 11'],
  W: ['W 1','W 2','W 3'],
  R: ['R 1','R 2','R 3','R 4','R 5','R 6','R 7','R 8','R 9','R 10']
};

const Step1 = ({ data, onChange }) => (
  <div className="step-body">
    <h2>1 · Persönliche Daten</h2>
    <p className="sub">Die meisten benötigten Daten findest du auf deiner aktuellen Besoldungsmitteilung.</p>
    <div className="form-grid">
      <Field label="Besoldungsordnung">
        <Select value={data.order} onChange={e => onChange({ order: e.target.value, group: GROUPS[e.target.value][0] })}>
          <option value="A">A — Beamte / Soldaten</option>
          <option value="B">B — höhere Leitung</option>
          <option value="W">W — Professoren</option>
          <option value="R">R — Richter / Staatsanwälte</option>
        </Select>
      </Field>
      <Field label="Besoldungsgruppe">
        <Select value={data.group} onChange={e => onChange({ group: e.target.value })}>
          {GROUPS[data.order].map(g => <option key={g} value={g}>{g}</option>)}
        </Select>
      </Field>
      <Field label="Erfahrungsstufe">
        <Select value={data.level} onChange={e => onChange({ level: +e.target.value })}>
          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Stufe {n}</option>)}
        </Select>
      </Field>
      <Field label="Familienstand">
        <Select value={data.married} onChange={e => onChange({ married: e.target.value })}>
          <option value="single">ledig / getrennt</option>
          <option value="married">verheiratet / eingetr. LP</option>
          <option value="singleparent">alleinerziehend</option>
        </Select>
      </Field>
      <Field label="Teilzeitfaktor" hint="1,00 = Vollzeit · 0,50 = 50 %">
        <TextInput num value={data.part.toString().replace('.', ',')} onChange={e => onChange({ part: parseFloat(e.target.value.replace(',', '.')) || 0 })} />
      </Field>
      <Field label="Laufbahnzuschlag">
        <Select value={data.career} onChange={e => onChange({ career: e.target.value })}>
          <option value="none">– keiner / weiß nicht –</option>
          <option value="mittlerer_A5A6">mittl. Dienst A 5/A 6 · +25,90 €</option>
          <option value="gehobener_A9A10">geh. Dienst A 9/A 10 · +11,30 €</option>
        </Select>
      </Field>
    </div>
    <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
      <CheckCard
        checked={data.pkv}
        onChange={e => onChange({ pkv: e.target.checked })}
        hint="Wirkt sich auf den Krankenversicherungszuschuss aus."
      >Ehegatte in <strong>PKV</strong> oder <strong>freiwilliger GKV</strong></CheckCard>
      <CheckCard
        checked={data.extFamilyCurrent}
        onChange={e => onChange({ extFamilyCurrent: e.target.checked })}
        hint="Z. B. Elternzeit des Partners — Details in Schritt 4."
      >Besondere persönliche Situation dauert <strong>heute</strong> an</CheckCard>
    </div>
  </div>
);

const Step2 = ({ kids, onKidCount }) => (
  <div className="step-body">
    <h2>2 · Angaben zu Kindern</h2>
    <p className="sub">Anzahl und Alter der Kinder sichern Ansprüche beim Familienzuschlag und bei den Nachzahlungen.</p>
    <div className="paper-card" style={{ padding: '18px 22px', marginBottom: 20, background: 'var(--salt)' }}>
      <span className="ch-tr"></span><span className="ch-bl"></span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 15, fontWeight: 500 }}>Für wie viele Kinder bestand zwischen 2021 und heute Anspruch auf Kindergeld?</span>
        <TextInput num type="number" min="0" max="6" value={kids.length} onChange={e => onKidCount(Math.max(0, Math.min(6, +e.target.value)))} style={{ width: 70, fontSize: 18, textAlign: 'center', fontWeight: 600 }} />
      </div>
    </div>
    {kids.length > 0 && kids.map((k, i) => (
      <div key={i} className="paper-card" style={{ marginBottom: 14 }}>
        <span className="ch-tr"></span><span className="ch-bl"></span>
        <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, color: 'var(--deep-sea)', textTransform: 'uppercase', letterSpacing: '.12em', margin: '0 0 14px' }}>
          Kind {i + 1} <span style={{ fontFamily: 'var(--font-hand)', color: 'var(--terracotta)', textTransform: 'none', letterSpacing: 0, fontSize: 16, fontWeight: 500 }}>— in Geburtsreihenfolge</span>
        </h3>
        <div className="form-grid">
          <Field label="Geburtsmonat" hint="Entscheidet über Kindergeldanspruch."><TextInput type="month" value={k.birth} onChange={() => {}} /></Field>
          <Field label="Ende Anspruch (optional)" hint="Nur wenn vorzeitig beendet."><TextInput type="month" value={k.end} onChange={() => {}} /></Field>
          <Field label="In Ausbildung / Studium?">
            <Select value={k.edu ? 'yes' : 'no'} onChange={() => {}}>
              <option value="no">Nein · Anspruch bis 18.</option>
              <option value="yes">Ja · bis 25.</option>
            </Select>
          </Field>
          <Field label="Pflegegrad ≥ 2?">
            <Select value={k.pflege ? 'yes' : 'no'} onChange={() => {}}>
              <option value="no">Nein</option>
              <option value="yes">Ja</option>
            </Select>
          </Field>
        </div>
      </div>
    ))}
  </div>
);

const Step3 = ({ months, onChange }) => {
  const years = [
    { k: '2021', label: '2021', max: 12 },
    { k: '2022', label: '2022', max: 12 },
    { k: '2023', label: '2023', max: 12 },
    { k: '2024', label: '2024', max: 12 },
    { k: '2025', label: '2025', max: 12 },
    { k: '2026pre', label: '01–04/2026', max: 4 }
  ];
  return (
    <div className="step-body">
      <h2>3 · Monate mit Dienstbezug</h2>
      <p className="sub">Für wie viele Monate im jeweiligen Kalenderjahr hattest du Anspruch auf volle Dienstbezüge?</p>
      <Notice>
        <strong>Regelfall: 12 Monate.</strong> Ausnahmen sind z. B. eine Ernennung im Laufe des Jahres, Elternzeit oder unbezahlter Urlaub.
      </Notice>
      <div className="form-grid cols-3" style={{ marginTop: 20 }}>
        {years.map(y => (
          <Field key={y.k} label={y.label} hint={`max. ${y.max}`}>
            <TextInput num type="number" min="0" max={y.max} value={months[y.k] ?? y.max} onChange={e => onChange({ ...months, [y.k]: Math.max(0, Math.min(y.max, +e.target.value)) })} style={{ fontSize: 18, textAlign: 'center', fontWeight: 600 }} />
          </Field>
        ))}
      </div>
    </div>
  );
};

const Step4 = ({ data, onChange }) => (
  <div className="step-body">
    <h2>4 · Besondere Lebenslagen</h2>
    <p className="sub"><em>Optional</em> — nur ausfüllen, wenn Besonderheiten wie Elternzeit des Ehegatten oder Pflegefälle vorlagen.</p>
    <Field label="Tatbestand">
      <Select value={data.case41} onChange={e => onChange({ case41: e.target.value })}>
        <option value="none">– nicht erfüllt (überspringen) –</option>
        <option value="n1">Nr. 1 · Ehegatte Elternzeit (Kind &lt; 1 J.)</option>
        <option value="n2">Nr. 2 · Ehegatte pflegt Angehörigen (PG ≥ 2)</option>
        <option value="n3">Nr. 3 · Ehegatte pflegt euer Kind (PG ≥ 2)</option>
        <option value="n4">Nr. 4 · Ehegatte dauerhaft erwerbsunfähig</option>
        <option value="n5">Nr. 5 · Krankengeld erloschen</option>
        <option value="a">§ 41a · alleinerziehend, 2+ Kinder</option>
      </Select>
    </Field>
    {data.case41 !== 'none' && (
      <div style={{ marginTop: 18 }}>
        <HandNote>ausführliche Einkommens-Tabelle — wird hier kompakt dargestellt</HandNote>
      </div>
    )}
  </div>
);

const Step5 = () => (
  <div className="step-body">
    <h2>5 · Ergebnis & Zusammenfassung</h2>
    <p className="sub">Dein errechnetes Brutto-Gehalt und die voraussichtlichen Nachzahlungen.</p>
    <div className="result-grid">
      <div className="result-card">
        <h3>04/2025 – 04/2026</h3>
        <table className="rtable">
          <tbody>
            <tr><td className="label">Grundgehalt</td><td className="num">3.842,17 €</td></tr>
            <tr><td className="label">Laufbahn-Erhöhung</td><td className="num">11,30 €</td></tr>
            <tr><td className="label">Familienzuschlag</td><td className="num">248,05 €</td></tr>
            <tr><td className="label">Erg. Familienzuschlag</td><td className="num">0,00 €</td></tr>
            <tr className="total"><td className="label">Brutto × TZ</td><td className="num">4.101,52 €</td></tr>
          </tbody>
        </table>
      </div>
      <div className="result-card">
        <h3>ab 05/2026 <span className="annot">✎ Tabellenreform</span></h3>
        <table className="rtable">
          <tbody>
            <tr><td className="label">Grundgehalt (neu)</td><td className="num">4.018,40 €</td></tr>
            <tr><td className="label" style={{ color: 'var(--stone-deep)' }}>Erhöhung (entfällt)</td><td className="num" style={{ color: 'var(--stone-deep)' }}>0,00 €</td></tr>
            <tr><td className="label">Familienzuschlag</td><td className="num">306,80 €</td></tr>
            <tr><td className="label">Erg. Familienzuschlag</td><td className="num">0,00 €</td></tr>
            <tr className="total"><td className="label">Brutto × TZ</td><td className="num">4.325,20 €</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="paper-card" style={{ background: 'var(--paper-soft)' }}>
      <span className="ch-tr"></span><span className="ch-bl"></span>
      <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, color: 'var(--deep-sea)', textTransform: 'uppercase', letterSpacing: '.12em', margin: '0 0 16px' }}>
        Nachzahlung §§ 79a–79e &nbsp;+&nbsp; 3 %
      </h3>
      <table className="rtable" style={{ fontSize: 13 }}>
        <tbody>
          <tr><td className="label"><strong>§ 79b</strong> · Einmalzahlung 2021</td><td className="num">138,00 €</td></tr>
          <tr><td className="label"><strong>§ 79c</strong> · Einmalzahlung 2025</td><td className="num">—</td></tr>
          <tr><td className="label"><strong>§ 79d</strong> · Kinder 1 & 2</td><td className="num">2.184,00 €</td></tr>
          <tr><td className="label"><strong>§ 79a</strong> · Erg. Familienzuschlag rückwirkend</td><td className="num">0,00 €</td></tr>
          <tr><td className="label">3 %-Anhebung 07/2025 – 04/2026</td><td className="num">1.195,40 €</td></tr>
        </tbody>
      </table>
      <div className="big-total">
        <span className="big-total-label">Summe Brutto-Nachzahlung</span>
        <span className="big-total-sum">3.517,40 €</span>
      </div>
    </div>
  </div>
);

Object.assign(window, { Step1, Step2, Step3, Step4, Step5, GROUPS });
