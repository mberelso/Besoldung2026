# Handoff: Besoldungs- & Nachzahlungsrechner (Besoldung2026)

A developer-ready design handoff for the **5-step wizard** that calculates future salary and back-payments for German federal civil servants under the 2026 salary reform (BBVAnpG 2026).

---

## About the design files

The HTML/JSX/CSS files in `design_files/` are **design references**, not production code. They were produced as hi-fi interactive prototypes so you can see the intended look, feel, interactions and copy.

**Your task is to recreate these designs in the target codebase's existing environment** — the live Besoldung2026 site is a Ruby-on-Rails / Hotwire app (`app/views/wizard/…`, `app/controllers/wizard_controller.rb`). Use its established patterns (Stimulus controllers, ERB partials, SCSS/PostCSS) to implement what's shown here. Don't copy the React/Babel scaffolding — it's only a delivery mechanism for the mock.

If a greenfield implementation is unavoidable, React + Vite is a reasonable choice, but the Rails app already exists and should be the target.

## Fidelity

**Hi-fi.** The mocks include final colors, typography, spacing, stroke weights, hand-drawn annotations, German copy, and real field names. Recreate pixel-perfectly in the Rails app's templating + styling layer.

---

## Design philosophy

> A draftsman's sketchbook rendered on warm paper. Ink drawn in deep sea blue. Construction lines in pale indigo. Annotations in terracotta handwriting.

This is **not** a generic SaaS form. The visual metaphor — hand-drawn architectural document × sea & nature tones — is a core differentiator against cold tax-portal aesthetics. See `design_files/SKILL.md` for the full rules.

---

## Screens / Views

The wizard is **one page** (`Wizard.html`) with 5 sequential steps revealed inside a single "paper card" panel. Progress is shown at the top; back/next buttons at the bottom.

### 0 · Page chrome (always visible)

**`TopBar` (header)** — `ui_kits/besoldungsrechner/TopBar.jsx`
- Brand row: 56px-high compass-logo SVG + title "Besoldungs- & Nachzahlungsrechner" (Fraunces, 22px/500, color `--abyss`) + hand-written subtitle "— für Beamte beim Bund ✎" (Caveat, 18px, color `--terracotta`).
- Theme toggle (pill button, right-aligned): 8×14px padding, 1.25px border `--deep-sea`, radius 999px, shadow `1px 1.5px 0 rgba(13,42,58,.4)`. Moon/sun SVG (16px) + label "Dunkel"/"Hell".
- Bottom border: 1.25px dashed `--stone`, margin-bottom 36px.

**`Page title block`**
- Eyebrow: 11px/700 uppercase, letter-spacing 0.14em, color `--sea` — "— Vom Entwurf zur Zahl ✎".
- H1: Fraunces 40px/500, `opsz: 96`, line-height 1.05, letter-spacing −0.02em, color `--abyss`. Example: "Was steht dir ab 2026 zu?"
- Subtitle: 15px body, color `--charcoal-soft`, max-width 60ch, line-height 1.55.

**`WizardProgress`** — `WizardProgress.jsx`
- 5 pills on a dashed construction line (1.25px dashed `--stone`) with a solid `--deep-sea` "fill" line growing left-to-right as the user advances (360ms ease-out).
- Each pill: 36×36px circle, 1.5px border. States: pending (stone), done (deep-sea outline + checkmark SVG), active (abyss-filled background, paper text, `1px 1.5px 0` shadow).
- Labels under each pill: "Person", "Kinder", "Monate", "Sonderfälle", "Ergebnis" (11px/600 uppercase, letter-spacing 0.1em).

**`paper-card`** (the form container)
- Background `--paper-soft` (#faf3e4), 1.25px `--abyss` border, radius 10px, padding `clamp(20px, 2.5vw, 40px)`.
- **Crop marks** in all four corners — 10×10px cross-hair made with two crossed lines (`::before` + `::after` + two helper spans `.ch-tr`, `.ch-bl`), opacity 0.5. This is the signature "drafting paper" detail.
- Soft shadow: `0 1px 0 rgba(47,59,66,.04), 0 2px 4px rgba(47,59,66,.06)`.

**`.btn-row` (footer of card)**
- `display: flex; justify-content: space-between`. 1.25px dashed top border, margin-top 32px, padding-top 22px.
- Left: `.btn-ghost` "Zurück" with chevron-left SVG. Disabled when step === 1.
- Middle: Caveat text "Schritt N von 5", color `--stone-deep`.
- Right: `.btn-primary` "Weiter" with chevron-right SVG, or on step 5: "Als PDF speichern" with download SVG.

### Step 1 · Persönliche Daten
H2 in Fraunces 28px/500, color `--deep-sea`. Sub-paragraph below.
2-column form grid, 18×22px gap. Fields:
- **Besoldungsordnung** (select): A / B / W / R with German labels.
- **Besoldungsgruppe** (select): dynamic options from the `GROUPS` map in `Steps.jsx`.
- **Erfahrungsstufe** (select): Stufe 1–8.
- **Familienstand** (select): ledig / verheiratet / alleinerziehend.
- **Teilzeitfaktor** (numeric text, German decimal comma): hint "1,00 = Vollzeit · 0,50 = 50 %".
- **Laufbahnzuschlag** (select): no surcharge / mittlerer Dienst / gehobener Dienst (with € values).

Below: 2 `.checkbox-card` items (mist background, shore border).

### Step 2 · Angaben zu Kindern
Salt-tinted paper-card at the top with an inline numeric input ("Für wie viele Kinder…"). For each kid N (1..count): its own paper-card with:
- Geburtsmonat (`<input type="month">`), Ende Anspruch (optional), In Ausbildung (Y/N select), Pflegegrad ≥ 2 (Y/N select).
- Hand note "— in Geburtsreihenfolge" next to "Kind N" header.

### Step 3 · Monate mit Dienstbezug
Callout (parchment bg + ochre border + triangle-alert SVG) explaining the default (12 months). 6-column auto-fit grid of numeric inputs: 2021, 2022, 2023, 2024, 2025, 01–04/2026 (max 4). Large centered numbers, font-size 18px/600.

### Step 4 · Besondere Lebenslagen
Single select with 7 options mapped to real law citations (§ 41 Nr. 1–5, § 41a). When non-"none", a handwritten note: "ausführliche Einkommens-Tabelle — wird hier kompakt dargestellt".

### Step 5 · Ergebnis & Zusammenfassung
Two side-by-side result cards (paper-soft bg, abyss border):
- **04/2025 – 04/2026** (before reform): rows for Grundgehalt, Laufbahn-Erhöhung, Familienzuschlag, Erg. Familienzuschlag; total row highlighted in Moss/sage.
- **ab 05/2026** with hand annotation "✎ Tabellenreform": same structure, "Erhöhung (entfällt)" greyed.

Below: a "Nachzahlung §§ 79a–79e + 3 %" card. Big total bar at bottom — `--sage` bg with moss border, Fraunces 32px sum on the right.

### Footer
1.25px dashed top, centered small text. Caveat line "— Ein Werkzeug, kein Bescheid. ✎" then a disclaimer citing BBesG and BBhV.

---

## Interactions & Behavior

- **Step transitions:** instant body swap; progress-fill width animates 360ms `cubic-bezier(.22,.61,.36,1)`.
- **Button press:** `transform: translate(1px, 1.5px)` and shadow collapses — gives the "stamped" feel on `:active`.
- **Focus:** inputs grow their border to 2px `--deep-sea` and gain a 3px `--mist` ring; padding is reduced by 1px to compensate so layout doesn't shift.
- **Hover:** `.btn-secondary` fills with `--mist`; checkbox-cards upgrade their border to `--deep-sea`.
- **Back button** disabled on step 1. **Print** on step 5 calls `window.print()`.
- **German number formatting** everywhere: comma decimal, space before €.

## State shape (reference)

```js
data = {
  order: 'A' | 'B' | 'W' | 'R',
  group: string,          // e.g. "A 12"
  level: 1..8,
  married: 'single' | 'married' | 'singleparent',
  part: number,           // teilzeitfaktor, 0..1
  career: 'none' | 'mittlerer_A5A6' | 'gehobener_A9A10',
  pkv: boolean,
  extFamilyCurrent: boolean,
  case41: 'none' | 'n1'..'n5' | 'a'
}
kids = [{ birth: 'YYYY-MM', end: 'YYYY-MM' | '', edu: boolean, pflege: boolean }]
months = { '2021': 12, '2022': 12, '2023': 12, '2024': 12, '2025': 12, '2026pre': 4 }
```

The calculation itself is not included in the mock — it's a static example result (A12, 2 Kinder, gehobener Dienst). Wire up the actual calculation logic from the existing Rails controller when implementing.

---

## Design tokens

See `design_files/colors_and_type.css` — the single source of truth. Highlights:

### Colors (sea family — primary accent)
```
--abyss         #0a2430      --turquoise    #5fc6c9
--midnight-sea  #0f3648      --shore        #8fd0d0
--deep-sea      #134a62      --seafoam      #b8e0dc
--harbor        #1a6179      --mist         #d5e8e5
--sea           #217a93      --salt         #e8f1ee
--aegean        #2a91a8
--lagoon        #3fb0bd
```

### Paper & nature
```
--paper          #f4ecdc        --terracotta   #b45c3a   (annotations/warn)
--paper-soft     #faf3e4        --ochre        #d4a55b
--paper-deep     #ead8b8        --moss         #5a7a4a   (success)
--parchment      #efe3c8        --sage         #a8b89b
--stone          #cdbfa4        --linen        #e8dfc7   (input fill)
--stone-deep     #9e8d6e
--charcoal       #2f3b42        (body ink)
--charcoal-soft  #4a5a63
```

### Type
- **Display:** Fraunces (variable, opsz 9–144, wght 400–700)
- **Body:** Nunito Sans (wght 300–800)
- **Hand:** Caveat (wght 400–700) — annotations only, never body
- **Mono:** JetBrains Mono — numbers in tables, tabular-nums

### Strokes & spacing
- Stroke weights: `0.75px` hair, `1.25px` default, `2px` bold, `3px` heavy
- Border-radius: 4px (inputs), 6px (cards/buttons), 10px (paper-card), 999px (pill)
- Shadows: soft paper shadow, stamped-button shadow (`1px 1.5px 0`)

---

## Assets

All in `design_files/assets/`:
- `logo-compass.svg` — brand mark, architect-style compass
- `favicon-compass.svg` / `favicon.svg` — favicons
- `icons-architect.svg` / `icons.svg` — icon set in the drafting style
- `paper-grain.svg` — subtle paper texture, applied as fixed-position overlay (35% opacity, multiply blend)

Replace or regenerate for production as needed; the style (1.25px strokes, `--abyss` ink, `--paper` ground) is the contract.

---

## Files in this bundle

```
design_handoff_besoldungsrechner/
├── README.md                              ← you are here
└── design_files/
    ├── SKILL.md                           ← voice, tone, do/don't
    ├── colors_and_type.css                ← design tokens
    ├── assets/                            ← SVG brand/icons/texture
    └── besoldungsrechner/
        ├── Wizard.html                    ← mount point, app shell
        ├── styles.css                     ← UI kit CSS
        ├── TopBar.jsx                     ← header + theme toggle
        ├── WizardProgress.jsx             ← progress trail
        ├── Fields.jsx                     ← Field/TextInput/Select/CheckCard/Notice
        └── Steps.jsx                      ← Step1..Step5 bodies
```

---

## Checklist for the implementing developer

- [ ] Import `colors_and_type.css` as the design-token layer (convert to SCSS variables or CSS custom properties as fits the stack).
- [ ] Recreate the `paper-card` with its four corner crop-marks — this is the signature detail, don't skip it.
- [ ] Wire the 5 step views into the existing `wizard_controller.rb` routes.
- [ ] Keep all German copy verbatim (it's legally precise).
- [ ] Preserve the dashed construction line in the progress bar — the animation is part of the brand.
- [ ] Hand-written Caveat annotations only as real margin notes, not decoration.
- [ ] Print styles for step 5 (one-page summary).
- [ ] A11y: focus rings are deliberately 3px `--mist` — do not remove.
