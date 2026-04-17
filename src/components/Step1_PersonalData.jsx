import React, { useEffect } from 'react';
import { GROUPS } from '../logic/calculator';

const Step1_PersonalData = ({ data, onChange }) => {

  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    const newGroup = GROUPS[newOrder][0];
    onChange({ order: newOrder, group: newGroup, level: 1 });
  };

  const handleGroupChange = (e) => {
    onChange({ group: e.target.value, level: 1 });
  };

  const handleNumChange = (field) => (e) => {
    onChange({ [field]: parseFloat(e.target.value) || 0 });
  };

  const handleCheckChange = (field) => (e) => {
    onChange({ [field]: e.target.checked });
  };

  // Dynamic Levels based on group/order
  // Real implementation from calculator:
  // For A: 1..8. For B: 1. For W/R: based on array length.
  let maxLevel = 1;
  if (data.order === 'A') maxLevel = 8;
  else if (data.order === 'B') maxLevel = 1;
  else {
    // Quick hack for W/R, using imports or just hardcoding max 8 for UI fallback
    // In logic it is capped by array length, we provide up to 8
    maxLevel = 8;
  }

  return (
    <div className="wizard-step">
      <h2>1. Persönliche Daten</h2>
      <p className="sub mb-6">Die meisten benötigten Daten findest du auf deiner aktuellen Besoldungsmitteilung.</p>

      <div className="grid cols-2 gap-4">
        <div className="form-group">
          <label>Besoldungsordnung
            <select value={data.order} onChange={handleOrderChange}>
              <option value="A">A – Beamte/Soldaten</option>
              <option value="B">B – höhere Leitung</option>
              <option value="W">W – Professoren</option>
              <option value="R">R – Richter/Staatsanwälte</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>Besoldungsgruppe
            <select value={data.group} onChange={handleGroupChange}>
              {GROUPS[data.order]?.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>Erfahrungsstufe
            <select value={data.level} onChange={(e) => onChange({ level: parseInt(e.target.value) })}>
              {Array.from({ length: maxLevel }).map((_, i) => (
                <option key={i+1} value={i+1}>Stufe {i+1}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>Laufbahnzuschlag
            <select value={data.career} onChange={e => onChange({ career: e.target.value })}>
               <option value="none">– keiner / weiß nicht –</option>
               <option value="mittlerer_A5A6">mittl. Dienst A 5/A 6 (+25,90 €)</option>
               <option value="gehobener_A9A10">geh. Dienst A 9/A 10 (+11,30 €)</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid cols-2 gap-4 mt-4">
        <div className="form-group">
          <label>Familienstand
            <select value={data.married} onChange={e => onChange({ married: e.target.value })}>
              <option value="single">ledig / getrennt</option>
              <option value="married">verheiratet / eingetr. LP</option>
              <option value="singleparent">alleinerziehend (mit Kind(ern))</option>
            </select>
          </label>
        </div>
        
        <div className="form-group">
          <label>Teilzeitfaktor
            <input 
              type="number" min="0" max="1" step="0.01" 
              value={data.part} onChange={handleNumChange('part')} 
            />
            <span className="hint">1,00 = Vollzeit · 0,50 = 50%</span>
          </label>
        </div>
      </div>

      <div className="grid cols-2 gap-4 mt-4">
        <label className="checkbox-wrap">
          <input type="checkbox" checked={data.pkv} onChange={handleCheckChange('pkv')} />
          <div>
            Ehegatte in <strong>PKV</strong> oder <strong>freiwilliger GKV</strong>
            <span className="hint">Ankreuzen, wenn der Ehegatte selbst beitragspflichtig versichert ist (wirkt sich auf den gesetzlichen Krankenversicherungszuschuss aus).</span>
          </div>
        </label>
        
        <label className="checkbox-wrap">
          <input type="checkbox" checked={data.extFamilyCurrent} onChange={handleCheckChange('extFamilyCurrent')} />
          <div>
            Besondere persönliche Situation dauert <strong>heute noch</strong> an
            <span className="hint">Setze hier ein Häkchen, falls ein Sonderfall für dich (wie z. B. Elternzeit deines Partners) aktuell noch gilt. Mehr Details dazu folgen in Schritt 4.</span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Step1_PersonalData;
