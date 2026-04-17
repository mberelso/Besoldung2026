import React from 'react';

const WizardProgress = ({ currentStep, totalSteps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="wizard-progress">
      <div 
        className="wizard-progress-bar" 
        style={{ width: `${progressPercentage}%` }}
      ></div>
      
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        
        return (
          <div 
            key={step} 
            className={`wizard-pill ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
          >
            {isCompleted ? '✓' : step}
          </div>
        );
      })}
    </div>
  );
};

export default WizardProgress;
