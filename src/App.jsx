import React, { useState, useMemo, useEffect } from 'react';
import WizardProgress from './components/WizardProgress';
import Step1_PersonalData from './components/Step1_PersonalData';
import Step2_Kids from './components/Step2_Kids';
import Step3_Months from './components/Step3_Months';
import Step4_SpecialCase from './components/Step4_SpecialCase';
import Step5_Result from './components/Step5_Result';
import Impressum from './components/Impressum';
import FAQ from './components/FAQ';
import { calculateAll } from './logic/calculator';

function App() {
  const [view, setView] = useState('wizard'); // 'wizard' | 'impressum'
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [data, setData] = useState({
    order: 'A',
    group: 'A9',
    level: 1,
    career: 'none',
    married: 'single',
    part: 1,
    pkv: false,
    extFamilyCurrent: false,
    m: {
      '2021': 12, '2022': 12, '2023': 12, '2024': 12, '2025': 12, '2026pre': 4
    },
    case41: 'none',
    refChildN1: 0,
    taxClass: '1',
    kistRate: 0,
    pkvMonthly: 0
  });

  const [kids, setKids] = useState([]);
  const [incomes, setIncomes] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Automatisch nach oben scrollen, wenn sich der Schritt ändert
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50); // Kurzer Timeout für DOM-Updates
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleNext = () => {
    // Skip Step 4 if none of the cases apply
    if (currentStep === 3 && data.married === 'single' && kids.length === 0) {
      setData(prev => ({ ...prev, case41: 'none' }));
      setCurrentStep(5);
      return;
    }
    
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    if (currentStep === 5 && data.married === 'single' && kids.length === 0) {
      setCurrentStep(3);
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const result = useMemo(() => {
    if (currentStep === 5) {
      return calculateAll({ ...data, incomes }, kids);
    }
    return null;
  }, [currentStep, data, kids, incomes]);

  return (
    <>
      <div className="bg-blobs">
        <div className="bg-blob-1"></div>
        <div className="bg-blob-2"></div>
      </div>

      <div className="container">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1>Besoldungs- & Nachzahlungsrechner (Bund)</h1>
            <p className="sub" style={{ margin: 0 }}>Basierend auf dem Referentenentwurf des Bundesalimentationsgesetzes (BAlimentG) inkl. Austauschseite S. 79 (Mai 2026)</p>
          </div>
          <button 
            className="btn btn-outline" 
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', borderRadius: 'var(--radius-xl)' }}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? '☀️ Hell' : '🌙 Dunkel'}
          </button>
        </header>

        <div className="glass-card" style={{ padding: '2rem 3rem' }}>
          
          {view === 'impressum' ? (
            <Impressum onBack={() => { setView('wizard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
          ) : (
            <>
              <WizardProgress currentStep={currentStep} totalSteps={totalSteps} />

              <div style={{ minHeight: '400px' }}>
            {currentStep === 1 && (
               <Step1_PersonalData 
                 data={data} 
                 onChange={(updates) => setData(prev => ({ ...prev, ...updates }))} 
               />
            )}
            
            {currentStep === 2 && (
               <Step2_Kids 
                 kids={kids} 
                 onChange={setKids} 
               />
            )}
            
            {currentStep === 3 && (
               <Step3_Months 
                 months={data.m} 
                 onChange={(ms) => setData(prev => ({ ...prev, m: ms }))} 
               />
            )}
            
            {currentStep === 4 && (
               <Step4_SpecialCase 
                 data={data} 
                 kids={kids} 
                 incomes={incomes}
                 onParamChange={(updates) => setData(prev => ({ ...prev, ...updates }))} 
                 onIncomeChange={(y, val) => setIncomes(prev => ({ ...prev, [y]: val }))}
               />
            )}

            {currentStep === 5 && (
               <Step5_Result result={result} data={data} />
            )}
          </div>

          <div className="flex justify-between items-center mt-8" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
            {currentStep > 1 ? (
              <button className="btn btn-outline" onClick={handleBack}>&larr; Zurück</button>
            ) : <div></div>}
            
            {currentStep < totalSteps ? (
              <button className="btn btn-primary" onClick={handleNext}>Weiter &rarr;</button>
            ) : (
              <button className="btn btn-outline" onClick={() => setCurrentStep(1)}>Neue Berechnung</button>
            )}
          </div>
          </>
          )}
        </div>

        {view === 'wizard' && <FAQ />}

        <footer style={{ marginTop: '2rem', textAlign: 'center', opacity: 0.6 }}>
          <p className="text-sm">⚠️ Dies ist ein privates Werkzeug zur Abschätzung. Keine Rechtsberatung. Alle Daten bleiben lokal.</p>
          <div className="mt-2">
            <button className="text-sm" style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { setView('impressum'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Impressum & Datenschutz
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
