import React, { useState } from 'react';

const SECTIONS = [
  {
    title: 'Offizielle Quellen',
    icon: '🏛',
    links: [
      {
        label: 'BMI: Gesetzgebungsverfahren BAlimentG',
        href: 'https://www.bmi.bund.de/SharedDocs/gesetzgebungsverfahren/DE/D3/amtsangemessene-alimentation.html',
        desc: 'Alle Entwürfe, Stellungnahmen und Dokumente beim Bundesinnenministerium',
      },
      {
        label: 'Referentenentwurf BAlimentG (PDF, BMI)',
        href: 'https://www.bmi.bund.de/SharedDocs/gesetzgebungsverfahren/DE/D3/amtsangemessene-alimentation.html',
        desc: 'PDF-Download des Referentenentwurfs inkl. Begründung auf der BMI-Seite',
      },
      {
        label: 'BVerfG: Beschluss zur Bundesbesoldung (2 BvL 6/17, Mai 2020)',
        href: 'https://www.bundesverfassungsgericht.de/SharedDocs/Entscheidungen/DE/2020/05/ls20200504_2bvl000617.html',
        desc: 'Grundsatzentscheidung des BVerfG zur amtsangemessenen Alimentation beim Bund',
      },
    ],
  },
  {
    title: 'Gewerkschaften & Verbände',
    icon: '🤝',
    links: [
      {
        label: 'dbb: Gesetzentwurf zur amtsangemessenen Alimentation',
        href: 'https://www.dbb.de/artikel/gesetzentwurf-zur-amtsangemessenen-alimentation-liegt-vor.html',
        desc: 'Stellungnahme und Einschätzung des dbb Beamtenbunds zum BAlimentG',
      },
      {
        label: 'ver.di: Beamte im öffentlichen Dienst',
        href: 'https://beamte.verdi.de/',
        desc: 'Informationen und Materialien von ver.di für Beamtinnen und Beamte',
      },
      {
        label: 'Deutscher Bundeswehr-Verband (DBwV)',
        href: 'https://www.dbwv.de/',
        desc: 'Interessenvertretung für Soldatinnen und Soldaten der Bundeswehr',
      },
    ],
  },
  {
    title: 'Austausch & Community',
    icon: '💬',
    links: [
      {
        label: 'Beamtentalk.de – Forum',
        href: 'https://www.beamtentalk.de/',
        desc: 'Aktives Forum mit über 10.000 Themen rund um den Beamtenstatus',
      },
      {
        label: 'Forum Öffentlicher Dienst – Bundesbeamte',
        href: 'https://forum.oeffentlicher-dienst.info/index.php?board=14.0',
        desc: 'Diskussionsbereich speziell für Bundesbeamte',
      },
    ],
  },
];

const FurtherReading = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="glass-card mt-8" style={{ padding: '2rem' }}>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: open ? '1.25rem' : 0 }}
        onClick={() => setOpen(p => !p)}
      >
        <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>
          Weiterführende Links & Quellen
        </h2>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                {section.icon} {section.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {section.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.download ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-main)',
                      textDecoration: 'none',
                      transition: 'border-color 0.15s, background 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'var(--primary-light)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.background = 'var(--bg-main)'; }}
                  >
                    <span style={{ marginTop: '0.1rem', flexShrink: 0, opacity: 0.5 }}>
                      {link.download ? '⬇' : '↗'}
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.92rem' }}>{link.label}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{link.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FurtherReading;
