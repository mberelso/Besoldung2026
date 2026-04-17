import React from 'react';

const Step2_Kids = ({ kids, onChange }) => {
  
  const handleCountChange = (e) => {
    let count = parseInt(e.target.value) || 0;
    count = Math.max(0, Math.min(6, count)); // limit 0 to 6
    
    const newKids = [...kids];
    if (count > newKids.length) {
      for (let i = newKids.length; i < count; i++) {
        newKids.push({ idx: i + 1, birth: '', end: '', edu: false, pflege: false });
      }
    } else if (count < newKids.length) {
      newKids.length = count;
    }
    onChange(newKids);
  };

  const updateKid = (index, field, value) => {
    const newKids = [...kids];
    newKids[index] = { ...newKids[index], [field]: value };
    onChange(newKids);
  };

  return (
    <div className="wizard-step">
      <h2>2. Angaben zu Kindern</h2>
      <p className="sub mb-6">Die Anzahl und das Alter der Kinder sichern dir entscheidende Ansprüche – sowohl beim laufenden Familienzuschlag als auch bei den baldigen Nachzahlungen.</p>

      <div className="form-group" style={{ background: 'var(--bg-main)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
        <label className="flex items-center gap-4" style={{ fontSize: '1.1rem', margin: 0 }}>
          Für wie viele Kinder bestand zwischen 2021 und heute Anspruch auf Kindergeld?
          <input 
            type="number" min="0" max="6" 
            value={kids.length} 
            onChange={handleCountChange} 
            style={{ width: '80px', fontSize: '1.2rem', textAlign: 'center' }}
          />
        </label>
      </div>

      {kids.length > 0 && (
        <div className="mt-8">
          {kids.map((kid, i) => (
            <div key={i} className="glass-card mb-6" style={{ padding: '1.5rem' }}>
              <h3 className="mb-4 text-primary">Kind {i + 1} <span className="text-sm text-muted font-normal">(nach Geburtsreihenfolge)</span></h3>
              <div className="grid cols-2 gap-4">
                <div className="form-group">
                  <label>Geburtsmonat
                    <input 
                      type="month" 
                      value={kid.birth} 
                      onChange={e => updateKid(i, 'birth', e.target.value)} 
                    />
                    <span className="hint">Format: YYYY-MM. Entscheidet über Kindergeldanspruch.</span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Ende Anspruch Familienzuschlag (optional)
                    <input 
                      type="month" 
                      value={kid.end} 
                      onChange={e => updateKid(i, 'end', e.target.value)} 
                    />
                    <span className="hint">Nur wenn Anspruch vorzeitig endete.</span>
                  </label>
                </div>
                <div className="form-group">
                  <label>In Ausbildung/Studium?
                    <select 
                      value={kid.edu ? 'yes' : 'no'} 
                      onChange={e => updateKid(i, 'edu', e.target.value === 'yes')}
                    >
                      <option value="no">Nein (Anspruch bis 18.)</option>
                      <option value="yes">Ja (bis 25.)</option>
                    </select>
                  </label>
                </div>
                <div className="form-group">
                  <label>Pflegegrad ≥ 2?
                    <select 
                      value={kid.pflege ? 'yes' : 'no'} 
                      onChange={e => updateKid(i, 'pflege', e.target.value === 'yes')}
                    >
                      <option value="no">Nein</option>
                      <option value="yes">Ja</option>
                    </select>
                    <span className="hint">Relevant für Sonderfall Pflege.</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Step2_Kids;
