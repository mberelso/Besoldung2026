# Besoldung2026 — Design System Skill

This skill describes how to design for **Besoldung2026**, a German tool that calculates salary & back-payment entitlements for federal civil servants ("Beamte beim Bund") under the 2026 salary reform (BBVAnpG 2026).

## Audience & Tone
- **Users:** German federal civil servants — mid-career, detail-oriented, not digital natives. They trust a form that looks as rigorous as the law behind it.
- **Voice:** sachlich, zugänglich, anerkennend. Calm precision. Siez-form ("Sie" is fine, "du" is fine in the app — current site uses "du").
- **All UI copy is in German.** Use € with space (`4.018,40 €`), German number formatting (`.` as thousands, `,` as decimal).

## Visual Metaphor
Hand-drawn architectural sketchbook × sea & nature tones. The calculator is a **draftsman's working document**: warm paper ground, ink in deep sea blue, construction lines in taupe stone, annotations in terracotta handwriting. This differentiates Besoldung2026 from the cold tax-portal aesthetic it competes with — it feels *crafted*, like a careful hand drew the form.

Do not invent a corporate blue-and-white SaaS look. Do not use gradients on buttons. Do not use emoji as iconography.

## Foundations
- **Palette** — defined in `colors_and_type.css`. The sea family is the primary accent (12 gradations: abyss → midnight → deep-sea → harbor → sea → aegean → lagoon → turquoise → shore → seafoam → mist → salt). Paper family grounds everything. Terracotta is for annotations/warnings only. Moss/sage for success.
- **Typography** — Fraunces (display, opsz-variable), Nunito Sans (body), Caveat (hand notes for annotations & eyebrow marginalia), JetBrains Mono (numbers in tables).
- **Stroke weights** — 1.25px is the default line; dashed 1.25px is "construction line" (dividers, progress trails); 2px is bold for button borders. Corner crop-marks (`::before`/`::after` + `.ch-tr`/`.ch-bl` spans) on cards reinforce the drafting-paper feel.

## UI Kit (reference: `ui_kits/besoldungsrechner/`)
- `Wizard.html` — the main 5-step calculator. Mount React on `#app`.
- `TopBar.jsx`, `WizardProgress.jsx`, `Fields.jsx`, `Steps.jsx` — each has its own scope; components are attached to `window` at the bottom.
- `styles.css` — imports `colors_and_type.css`, defines shell + wizard + form + result primitives.
- Assets live in `/assets/` at project root (logo-compass, paper-grain texture).

## Rules of thumb
- **Annotations, not decoration.** Every hand-written Caveat line should read like a real margin note ("— Tabellenreform ✎", "in Geburtsreihenfolge"). Do not sprinkle decorative scribbles.
- **Numbers get the Mono font, right-aligned, with tabular-nums.** Totals get the Moss color + sage fill.
- **Forms breathe.** Default to 2-column grid on desktop, 1-column under 720px. Labels above inputs, hints below, ~4–6px gap.
- **Callouts use parchment + ochre border** (§ callouts, reform explanations). Warnings use the same card with `<svg>` triangle-alert.
- **Wizard progress** is always visible at the top of the form card. Active step = abyss-filled pill; done steps = deep-sea outline with checkmark.

## Content do's
- Mirror the real law: cite § 41, § 79a–79e when relevant; name BBesG and BBhV.
- Use the exact column headers from the source form: "Besoldungsordnung", "Besoldungsgruppe", "Erfahrungsstufe", "Familienstand", "Teilzeitfaktor", "Laufbahnzuschlag".
- Include a footer that says "Ein Werkzeug, kein Bescheid." — tool, not official notice.

## Content don'ts
- No marketing fluff, testimonials, or hero-image rhetoric. This is a civic tool.
- No decorative icons next to form labels. Icons only for semantic purpose (warning, nav arrow, checkmark).
- Never use the word "einfach" about a complex calculation; be honest about what the tool does.
