import React, { useState, useRef } from 'react';

const Instructions = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState('step-by-step');
  const [isChecklistMode, setIsChecklistMode] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = useRef(null);
  
  // Move to next instruction step
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Move to previous instruction step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Jump to a specific step
  const jumpToStep = (index) => {
    setCurrentStep(index);
  };

  // Handle printing instructions
  const handlePrintInstructions = () => {
    const printContent = document.createElement('div');
    printContent.innerHTML = `
      <h2>Recipe Instructions</h2>
      <ol>
        ${steps.map(step => `<li>${step.step}</li>`).join('')}
      </ol>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Recipe Instructions</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            li { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // Handle timer functionality
  const handleTimer = () => {
    if (timerActive) {
      // Stop timer
      clearInterval(timerRef.current);
      setTimerActive(false);
      setTimerSeconds(0);
    } else {
      // Start timer - default 5 minutes
      setTimerSeconds(300);
      setTimerActive(true);
      timerRef.current = setInterval(() => {
        setTimerSeconds(prevSeconds => {
          if (prevSeconds <= 1) {
            clearInterval(timerRef.current);
            setTimerActive(false);
            alert('Timer complete!');
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }
  };

  // Format timer display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Toggle checklist mode
  const toggleChecklistMode = () => {
    setIsChecklistMode(!isChecklistMode);
    if (!isChecklistMode) {
      setCheckedSteps(Array(steps.length).fill(false));
    }
  };

  // Handle step checkbox toggle
  const handleStepCheck = (index) => {
    const newCheckedSteps = [...checkedSteps];
    newCheckedSteps[index] = !newCheckedSteps[index];
    setCheckedSteps(newCheckedSteps);
  };

  if (!steps || steps.length === 0) {
    return (
      <div className="instructions-section">
        <p className="no-instructions">No instructions available for this recipe.</p>
      </div>
    );
  }

  return (
    <div className="instructions-section">
      <div className="instructions-modes">
        <button 
          className={`mode-button ${viewMode === 'step-by-step' ? 'active' : ''}`}
          onClick={() => setViewMode('step-by-step')}
        >
          Step-by-Step
        </button>
        <button 
          className={`mode-button ${viewMode === 'all-steps' ? 'active' : ''}`}
          onClick={() => setViewMode('all-steps')}
        >
          All Steps
        </button>
      </div>
      
      {timerActive && (
        <div className="timer-display">
          <span className="timer-text">Timer: {formatTime(timerSeconds)}</span>
        </div>
      )}
      
      {viewMode === 'step-by-step' ? (
        // Step-by-Step View
        <div className="step-by-step-view">
          <div className="step-navigation">
            <button 
              className="nav-button prev" 
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <i className="fas fa-chevron-left"></i> Previous
            </button>
            
            <span className="step-indicator">
              Step {currentStep + 1} of {steps.length}
            </span>
            
            <button 
              className="nav-button next" 
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
            >
              Next <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <div className="current-step">
            {isChecklistMode && (
              <label className="step-checkbox">
                <input 
                  type="checkbox"
                  checked={checkedSteps[currentStep]}
                  onChange={() => handleStepCheck(currentStep)}
                />
                <span className="checkmark"></span>
              </label>
            )}
            <h3 className="step-number">Step {steps[currentStep].number}</h3>
            <p className="step-instruction">{steps[currentStep].step}</p>
            
            {steps[currentStep].ingredients && steps[currentStep].ingredients.length > 0 && (
  <div className="step-ingredients">
    <h4>Ingredients for this step:</h4>
    <div className="step-ingredients-list">
      {steps[currentStep].ingredients.map((ingredient, idx) => (
        <div key={idx} className="step-ingredient">
          {ingredient.image && (
            <img 
              src={ingredient.image?.includes('http') 
                ? ingredient.image 
                : `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} 
              alt={ingredient.localizedName || ingredient.name} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=${encodeURIComponent((ingredient.localizedName || ingredient.name).charAt(0))}`;
              }}
            />
          )}
          <span>{ingredient.localizedName || ingredient.name}</span>
        </div>
      ))}
    </div>
  </div>
)}
            
            {steps[currentStep].equipment && steps[currentStep].equipment.length > 0 && (
  <div className="step-equipment">
    <h4>Equipment for this step:</h4>
    <div className="step-equipment-list">
      {steps[currentStep].equipment.map((item, idx) => (
        <div key={idx} className="step-equipment-item">
          {item.image && (
            <img 
              src={item.image?.includes('http') 
                ? item.image 
                : `https://spoonacular.com/cdn/equipment_100x100/${item.image || `${item.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}`}
              alt={item.localizedName || item.name} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=${encodeURIComponent((item.localizedName || item.name).charAt(0))}`;
              }}
            />
          )}
          <span>{item.localizedName || item.name}</span>
        </div>
      ))}
    </div>
  </div>
)}
          </div>
          
          <div className="steps-timeline">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`timeline-step ${currentStep === index ? 'active' : ''} ${index < currentStep ? 'completed' : ''} ${checkedSteps[index] ? 'checked' : ''}`}
                onClick={() => jumpToStep(index)}
              >
                <div className="timeline-step-number">{index + 1}</div>
                {index < steps.length - 1 && <div className="timeline-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        // All Steps View
        <div className="all-steps-view">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              {isChecklistMode && (
                <label className="step-checkbox">
                  <input 
                    type="checkbox"
                    checked={checkedSteps[index]}
                    onChange={() => handleStepCheck(index)}
                  />
                  <span className="checkmark"></span>
                </label>
              )}
              <h3 className="step-number">Step {step.number}</h3>
              <p className="step-instruction">{step.step}</p>
              
              <div className="step-details">
                {step.equipment && step.equipment.length > 0 && (
                  <div className="step-equipment-inline">
                    <span className="step-details-label">Equipment:</span>
                    <span className="step-details-value">
                      {step.equipment.map(item => item.name).join(', ')}
                    </span>
                  </div>
                )}
                
                {step.ingredients && step.ingredients.length > 0 && (
                  <div className="step-ingredients-inline">
                    <span className="step-details-label">Ingredients:</span>
                    <span className="step-details-value">
                      {step.ingredients.map(ingredient => ingredient.name).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="cooking-tools">
        <button className="tool-button" onClick={handlePrintInstructions}>
          <i className="fas fa-print"></i> Print Instructions
        </button>
        <button className="tool-button" onClick={handleTimer}>
          <i className="fas fa-clock"></i> {timerActive ? 'Stop Timer' : 'Start Timer'}
        </button>
        <button className="tool-button" onClick={toggleChecklistMode}>
          <i className="fas fa-check-square"></i> {isChecklistMode ? 'Normal Mode' : 'Checklist Mode'}
        </button>
      </div>
    </div>
  );
};

export default Instructions;