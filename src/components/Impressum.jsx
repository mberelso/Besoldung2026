import React from 'react';

const Impressum = ({ onBack }) => {
  return (
    <div className="wizard-step">
      <h2>Impressum & Datenschutz</h2>
      
      <div className="glass-card mb-6" style={{ padding: '2rem' }}>
        <h3>Angaben gemäß § 5 TMG</h3>
        <p>
          Martin Berelson<br />
          Emilienstraße 14<br />
          04107 Leipzig
        </p>

        <h3 className="mt-6">Kontakt</h3>
        <p>E-Mail: martinberelson@googlemail.com</p>

        <h3 className="mt-6">Haftungsausschluss (Disclaimer)</h3>
        <p>
          <strong>Haftung für Inhalte</strong><br />
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Dieser Rechner stellt keine Rechtsberatung dar und übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der berechneten Beträge. Alle Berechnungen beruhen auf dem Referentenentwurf (Stand 14.04.2026) und dienen lediglich einer unverbindlichen Abschätzung.
        </p>
        
        <h3 className="mt-6">Datenschutz</h3>
        <p>
          <strong>Lokale Verarbeitung</strong><br />
          Der BAlimentG-Rechner verarbeitet alle von Ihnen eingegebenen Daten (Besoldungsgruppe, Familienstand, Kinder, Einkommen) ausschließlich lokal in Ihrem Webbrowser. Es werden keine personenbezogenen oder berechnungsrelevanten Daten an einen Server übertragen, gespeichert oder an Dritte weitergegeben.
        </p>
      </div>

      <div className="flex justify-start">
        <button className="btn btn-primary" onClick={onBack}>&larr; Zurück zum Rechner</button>
      </div>
    </div>
  );
};

export default Impressum;
