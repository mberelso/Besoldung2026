import React from 'react';

const FAQ = () => {
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

      <div className="faq-item mt-4">
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Was ändert sich durch das BAlimentG für Beamte beim Bund 2026?</h3>
        <p className="text-muted">
          Der Referentenentwurf zum Bundesalimentationsgesetz (BAlimentG) sieht eine grundlegende Reform der Besoldungsstruktur für Bundesbeamte ab Mai 2026 vor. 
          Neben angepassten Tabellen werden Familienzuschläge völlig neu strukturiert. Um die vom Bundesverfassungsgericht geforderte amtsangemessene Alimentation auch rückwirkend ab 2021 sicherzustellen, sind zum Teil weitreichende Einmal- und Nachzahlungen vorgesehen.
        </p>
      </div>

      <div className="faq-item mt-4">
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Wie hoch fällt die Beamten-Nachzahlung ab 2021 (Bund) aus?</h3>
        <p className="text-muted">
          Die errechnete Nachzahlung setzt sich aus verschiedenen rechtlichen "Töpfen" zusammen. So erhält beispielsweise jeder aktive Beamte eine pauschale Einmalzahlung in Höhe von 138 € für das Jahr 2021 (§ 79b). 
          Hinzu kommen kindbezogene monatliche Nachzahlungen für das erste und zweite Kind (§ 79d). Liegen besondere Lebenslagen vor – wie die Pflege eines Angehörigen oder Alleinerziehung –, greift zudem rückwirkend der neue „ergänzende Familienzuschlag“ (§ 79a). 
          Nutze unseren Rechner oben, um deine persönliche, unverbindliche Schätzung zu erhalten.
        </p>
      </div>

      <div className="faq-item mt-4">
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Wer profitiert von der Tabellenreform und der 3%-Anhebung?</h3>
        <p className="text-muted">
          Ab dem 1. Mai 2026 werden die Tabellenwerte für die Bundesbesoldungsordnungen (A, B, R, W) komplett neu gefasst. Die bisherigen Laufbahnzuschläge entfallen und gehen stattdessen in merklich erhöhten Familienzuschlägen und modernisierten Gruppensätzen auf. 
          Um die Zeit bis dahin zu umschiffen, ist bereits ab Juli 2025 bis April 2026 eine pauschale Anhebung der Bruttobezüge um 3 % vorgesehen.
        </p>
      </div>
    </div>
  );
};

export default FAQ;
