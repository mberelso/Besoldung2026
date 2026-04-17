# BAlimentG-Rechner (Bund)

Interaktiver **Besoldungs- und Nachzahlungsrechner** fuer den Bund auf Basis des Referentenentwurfs zum **Bundesalimentationsgesetz (BAlimentG)** des BMI (Stand 14.04.2026).

Live: **https://DEIN-GH-NAME.github.io/balimentg-rechner/**

## Was er kann

- Laufende Brutto-Besoldung fuer Bundesordnungen **A / B / W / R** nach Anlage IV des Entwurfs
- Familienzuschlag nach Anlage V (alt + neu ab 05/2026)
- Ergaenzender Familienzuschlag (&sect; 41 / &sect; 41a) nach Anlage VII inkl. PKV-Zuschlag
- **Nachzahlungsrechner** fuer
  - &sect; 79b (Einmalzahlung 2021, 138 EUR)
  - &sect; 79c (Einmalzahlung 2025 fuer A 16 / W 1 / R 2)
  - &sect; 79d (Kinder 1 & 2; 41/9/52 EUR pro Kind/Monat mit Kindergeldanspruch)
  - &sect; 79a (Ergaenz. Familienzuschlag rueckwirkend 2021-04/2026; &sect; 41/&sect; 41a-abhaengig, mit Abzug anrechenbarer Einkommen inkl. Elterngeld)
  - Rueckwirkende 3 %-Anhebung 04/2025-04/2026
- Altersgenaue Beruecksichtigung von Kindern nach &sect; 32 EStG (bis 18., bei Ausbildung bis 25.)
- Inline-Hilfen fuer alle Eingaben

## Datenschutz

**Kein Tracking. Keine Cookies. Keine Serverkommunikation.** Alle Eingaben bleiben lokal im Browser des Nutzers.

## Technik (v2.0)

Der Rechner wurde auf eine moderne **React + Vite** Architektur portiert.
- Komponentenbasierte Benutzerführung (Step-by-Step Wizard)
- Premium Vanilla CSS Design (Glassmorphism, Dark Mode)
- Ausgelagerte Berechnungslogik (`src/logic/calculator.js`)

## Tests

Im Repo befindet sich eine Node-Testdatei `test.js`, die die Kernfunktionen prüft (`node test.js`). Diese wurde als ES Modul portiert und referenziert die ausgelagerten Logik-Funktionen aus dem React-Code.

## Lokaler Start

Voraussetzung: [Node.js](https://nodejs.org/)

```bash
npm install
npm run dev
```
Der Rechner ist danach unter `http://localhost:5173/` erreichbar.

## Deployment auf GitHub Pages

1. `npm run build` ausführen.
2. Den generierten Ordner `dist/` deployen.

## Lizenz

MIT, siehe `LICENSE`.

## Mitwirken / Fehler melden

Issues und Pull Requests sind willkommen - insbesondere bei Zahlenabweichungen zur spaeter beschlossenen Gesetzesfassung.

## Disclaimer

Dies ist ein privates, inoffizielles Werkzeug. Die Berechnungen sind unverbindliche Naeherungen. **Keine Rechtsberatung.** Massgeblich sind allein die Festsetzungen des zustaendigen Dienstherrn nach dem in Kraft getretenen Gesetz.
