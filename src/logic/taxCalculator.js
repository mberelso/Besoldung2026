/**
 * Vereinfachter Steuerrechner für Beamte (Näherung für 2024/2025).
 * Dies ist eine Approximation des Einkommensteuertarifs und ersetzt keinen exakten BMF-PAP.
 */

// Grundtarif 2024 (vereinfacht)
function calculateIncomeTaxBase(zvE) {
  if (zvE <= 11604) {
    return 0;
  }
  if (zvE <= 17005) {
    const y = (zvE - 11604) / 10000;
    return (922.98 * y + 1400) * y;
  }
  if (zvE <= 66760) {
    const z = (zvE - 17005) / 10000;
    return (181.19 * z + 2397) * z + 1025.38;
  }
  if (zvE <= 277825) {
    return 0.42 * zvE - 10602.13;
  }
  return 0.45 * zvE - 18936.88;
}

/**
 * Berechnet Lohnsteuer, Kirchensteuer und Soli pro Monat
 * @param {number} grossMonthly - Monatliches Brutto
 * @param {string} taxClass - '1', '2', '3', '4', '5', '6'
 * @param {number} kirchenSteuerRate - 0, 0.08, 0.09
 * @param {number} kidsCount - Anzahl Kinder (für Freibeträge)
 * @param {number} pkvMonthly - Monatlicher Beitrag zur PKV
 * @returns {Object} { lohnsteuer, soli, kirchensteuer, net }
 */
export function calculateTaxesMonthly(grossMonthly, taxClass, kirchenSteuerRate = 0, kidsCount = 0, pkvMonthly = 0) {
  // Jahresbrutto hochrechnen
  let grossYearly = grossMonthly * 12;
  
  // Vereinfachter Werbungskostenpauschbetrag
  grossYearly -= 1230;

  // Vorsorgeaufwendungen (Basisabsicherung PKV ist voll absetzbar, wir vereinfachen und setzen den vollen PKV-Beitrag an, mind. aber 1900€ Pauschale)
  const pkvYearly = pkvMonthly * 12;
  const vorsorgeAufwendungen = Math.max(1900, pkvYearly);
  grossYearly -= vorsorgeAufwendungen; 

  // Kinderfreibetrag (2024: 9312 € pro Kind, greift bei Lohnsteuer aber oft erst bei der Günstigerprüfung.
  // Wir ziehen es hier für die Soli und KiSt Berechnung ab, für die LSt selbst ist es bei Kl 1-4 meist irrelevant im laufenden Jahr, 
  // aber wir nähern es einfach an, um realistische Abzüge zu zeigen.)
  
  // Zu versteuerndes Einkommen
  let zvE = Math.max(0, grossYearly);
  let taxYearly = 0;

  switch (taxClass) {
    case '1':
    case '2': // Kl 2 hat Entlastungsbetrag, lassen wir hier vereinfacht weg oder ziehen 4260€ ab
      if (taxClass === '2') zvE = Math.max(0, zvE - 4260);
      taxYearly = calculateIncomeTaxBase(zvE);
      break;
    case '3':
      // Splittingtarif
      taxYearly = calculateIncomeTaxBase(zvE / 2) * 2;
      break;
    case '4':
      taxYearly = calculateIncomeTaxBase(zvE);
      break;
    case '5':
      // Grobe Näherung für Kl 5
      taxYearly = calculateIncomeTaxBase(zvE * 1.5) || (grossYearly * 0.35);
      break;
    case '6':
      taxYearly = grossYearly * 0.4; // Grobe Näherung
      break;
    default:
      taxYearly = calculateIncomeTaxBase(zvE);
  }

  const lohnsteuerMonthly = Math.max(0, taxYearly / 12);

  // Soli (Freigrenze 2024: 18130 € / 36260 € (Splitting) Lohnsteuer pro Jahr)
  const soliFreigrenze = taxClass === '3' ? 36260 : 18130;
  let soliYearly = 0;
  if (taxYearly > soliFreigrenze) {
    // Gleitzone weggelassen für Einfachheit, 5.5% vom Steuerbetrag
    soliYearly = taxYearly * 0.055;
  }
  const soliMonthly = Math.max(0, soliYearly / 12);

  // Kirchensteuer (Freibeträge für Kinder berücksichtigen wir hier vereinfacht)
  const kistYearly = taxYearly * kirchenSteuerRate;
  const kistMonthly = Math.max(0, kistYearly / 12);

  return {
    lohnsteuer: lohnsteuerMonthly,
    soli: soliMonthly,
    kirchensteuer: kistMonthly,
    abzuegeGesamt: lohnsteuerMonthly + soliMonthly + kistMonthly,
    netto: grossMonthly - (lohnsteuerMonthly + soliMonthly + kistMonthly)
  };
}
