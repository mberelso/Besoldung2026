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

## Technik

Eine einzelne `index.html` mit Vanilla-JS, ohne Abhaengigkeiten. Haelt sich an Tabellen und Paragraphen des Referentenentwurfs. Keine Build-Pipeline noetig.

## Tests

Im Repo befindet sich eine Node-Testdatei `test.js`, die die Kernfunktionen pruefen kann (`node test.js`), sofern Node.js installiert ist. Sie parst die Skriptsektion von `index.html` und evaluiert die Funktionen direkt.

## Lokaler Start

Einfach `index.html` im Browser oeffnen (Doppelklick). Fuer Hot-Reload z. B.:

```bash
python3 -m http.server 8080
# oder
npx serve .
```

## Deployment auf GitHub Pages

1. Repository erstellen (Name z. B. `balimentg-rechner`).
2. Dateien dieses Ordners committen und pushen.
3. Settings &rarr; Pages &rarr; Source: `Deploy from a branch`, Branch: `main`, Folder: `/ (root)`.
4. Nach ca. 1 Minute ist die Seite unter `https://<name>.github.io/balimentg-rechner/` erreichbar.

## Lizenz

MIT, siehe `LICENSE`.

## Mitwirken / Fehler melden

Issues und Pull Requests sind willkommen - insbesondere bei Zahlenabweichungen zur spaeter beschlossenen Gesetzesfassung.

## Disclaimer

Dies ist ein privates, inoffizielles Werkzeug. Die Berechnungen sind unverbindliche Naeherungen. **Keine Rechtsberatung.** Massgeblich sind allein die Festsetzungen des zustaendigen Dienstherrn nach dem in Kraft getretenen Gesetz.
