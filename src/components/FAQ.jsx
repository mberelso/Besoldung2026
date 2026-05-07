import React, { useState } from 'react';

const FAQS = [
  {
    q: 'Was ändert sich durch das BAlimentG für Beamte beim Bund 2026?',
    a: 'Der Referentenentwurf zum Bundesalimentationsgesetz (BAlimentG) sieht eine grundlegende Reform der Besoldungsstruktur für Bundesbeamte ab Mai 2026 vor. Neben angepassten Tabellen werden Familienzuschläge völlig neu strukturiert. Um die vom Bundesverfassungsgericht geforderte amtsangemessene Alimentation auch rückwirkend ab 2021 sicherzustellen, sind zum Teil weitreichende Einmal- und Nachzahlungen vorgesehen.',
  },
  {
    q: 'Wie hoch fällt die Beamten-Nachzahlung ab 2021 (Bund) aus?',
    a: 'Die errechnete Nachzahlung setzt sich aus verschiedenen rechtlichen „Töpfen" zusammen. So erhält beispielsweise jeder aktive Beamte eine pauschale Einmalzahlung in Höhe von 138 € für das Jahr 2021 (§ 79b). Hinzu kommen kindbezogene monatliche Nachzahlungen für das erste und zweite Kind (§ 79d). Liegen besondere Lebenslagen vor – wie die Pflege eines Angehörigen oder Alleinerziehung –, greift zudem rückwirkend der neue „ergänzende Familienzuschlag" (§ 79a). Nutze unseren Rechner oben, um deine persönliche, unverbindliche Schätzung zu erhalten.',
  },
  {
    q: 'Wer profitiert von der Tabellenreform und der 3%-Anhebung?',
    a: 'Ab dem 1. Mai 2026 werden die Tabellenwerte für die Bundesbesoldungsordnungen (A, B, R, W) komplett neu gefasst. Die bisherigen Laufbahnzuschläge entfallen und gehen stattdessen in merklich erhöhten Familienzuschlägen und modernisierten Gruppensätzen auf. Um die Zeit bis dahin zu überbrücken, ist bereits ab Juli 2025 bis April 2026 eine pauschale Anhebung der Bruttobezüge um 3 % vorgesehen.',
  },
  {
    q: 'Was ist der „ergänzende Familienzuschlag" (§ 41 / § 41a)?',
    a: 'Der ergänzende Familienzuschlag (EFZ) ist eine neue Leistung, die Beamten in besonderen Lebenslagen gewährt wird: z. B. wenn der Ehegatte wegen Elternzeit, Pflege eines Angehörigen oder dauerhafter Erwerbsunfähigkeit kein oder nur geringes Einkommen hat. § 41a erfasst zusätzlich Alleinerziehende mit mindestens 2 Kindern. Der EFZ wird monatlich gewährt, aber um das tatsächliche Einkommen des Ehegatten gemindert. Rückwirkend ab 2021 erfolgt eine Nachzahlung über § 79a.',
  },
  {
    q: 'Wann kommt die Nachzahlung – muss ich einen Antrag stellen?',
    a: 'Laut Referentenentwurf sollen die Nachzahlungen von Amts wegen – also automatisch durch die Bezügestelle – ausgezahlt werden, ohne dass ein gesonderter Antrag erforderlich ist. Eine Ausnahme bildet § 79e (3+ Kinder): Dieser Anspruch wird individuell per Rechtsverordnung festgesetzt und ist nicht automatisch. Wann genau die Auszahlung erfolgt, hängt vom weiteren Gesetzgebungsverfahren ab. Das Gesetz ist noch nicht in Kraft getreten.',
  },
  {
    q: 'Gilt der Rechner auch für Landesbeamte?',
    a: 'Nein. Das BAlimentG und dieser Rechner beziehen sich ausschließlich auf Bundesbeamte (Bundesbesoldungsordnungen A, B, W, R). Die Bundesländer haben ihre eigene Besoldungsgesetzgebung und setzen Urteile des Bundesverfassungsgerichts eigenständig um – mit teils sehr unterschiedlichen Beträgen und Zeitplänen.',
  },
  {
    q: 'Wie genau ist die Netto-Berechnung?',
    a: 'Die Netto-Berechnung ist eine Näherung auf Basis der Lohnsteuertabellen 2025/2026. Sie berücksichtigt Steuerklasse, Kirchensteuer und Solidaritätszuschlag. Nicht berücksichtigt werden individuelle Freibeträge (z. B. Lohnsteuerermäßigung), Vorsorgepauschalen über den gesetzlichen Ansatz hinaus oder Besonderheiten bei Teilzeit-Dienstverhältnissen. Das tatsächliche Netto kann daher von der angezeigten Schätzung abweichen.',
  },
  {
    q: 'Was passiert mit Erfahrungsstufe 1 bei A-Besoldung ab Mai 2026?',
    a: 'In der neuen Tabelle ab Mai 2026 entfällt Stufe 1 für alle A-Besoldungsgruppen. Wer bisher in Stufe 1 war, wird automatisch in Stufe 2 eingruppiert. Dies ist im Rechner bereits berücksichtigt: Für den Zeitraum ab 05/2026 wird bei gewählter Stufe 1 automatisch der Tabellenwert von Stufe 2 verwendet.',
  },
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => setOpenIdx(prev => prev === i ? null : i);

  return (
    <div className="glass-card mt-8" style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
        Häufige Fragen zum BAlimentG & Besoldungsrechner
      </h2>

      <div className="mb-6 p-4" style={{ backgroundColor: 'var(--warning-light)', borderLeft: '4px solid var(--warning)', borderRadius: 'var(--radius-sm)' }}>
        <p className="text-sm" style={{ margin: 0, fontWeight: 500 }}>
          <strong>Wichtiger Hinweis:</strong> Die endgültigen gesetzlichen Regeln stehen aktuell noch nicht fest!
          Dieser Rechner und die folgenden Antworten basieren ausschließlich auf dem <em>Referentenentwurf</em> des BMI zum Bundesalimentationsgesetz (BAlimentG).
          Es können sich im Gesetzgebungsverfahren noch wesentliche Änderungen ergeben.
        </p>
      </div>

      {FAQS.map((faq, i) => (
        <div key={i} className="faq-item" onClick={() => toggle(i)}>
          <div className="faq-question">
            <h3 className="faq-question-text">{faq.q}</h3>
            <span className="faq-arrow">{openIdx === i ? '▲' : '▼'}</span>
          </div>
          {openIdx === i && (
            <p className="faq-answer text-muted">{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
