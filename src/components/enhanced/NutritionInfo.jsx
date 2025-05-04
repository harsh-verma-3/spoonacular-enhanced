import React, { useState } from 'react';


const NutritionInfo = ({ nutrition }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Extract nutrition data or provide defaults
  const nutrients = nutrition?.nutrients || [];
  const calories = nutrients.find(n => n.name === 'Calories')?.amount || 0;
  const protein = nutrients.find(n => n.name === 'Protein')?.amount || 0;
  const fat = nutrients.find(n => n.name === 'Fat')?.amount || 0;
  const carbs = nutrients.find(n => n.name === 'Carbohydrates')?.amount || 0;
  const sugar = nutrients.find(n => n.name === 'Sugar')?.amount || 0;
  const fiber = nutrients.find(n => n.name === 'Fiber')?.amount || 0;
  
  // Group nutrients into categories
  const macronutrients = nutrients.filter(n => 
    ['Protein', 'Fat', 'Carbohydrates', 'Calories', 'Sugar', 'Fiber'].includes(n.name)
  );
  
  const vitamins = nutrients.filter(n => 
    n.name.includes('Vitamin') || ['Folate', 'Folic Acid', 'Choline'].includes(n.name)
  );
  
  const minerals = nutrients.filter(n => 
    ['Calcium', 'Iron', 'Magnesium', 'Phosphorus', 'Potassium', 'Sodium', 'Zinc', 'Copper', 'Manganese', 'Selenium'].includes(n.name)
  );
  
  const getPercentageDisplay = (nutrient) => {
    if (!nutrient.percentOfDailyNeeds) return '0%';
    return `${Math.round(nutrient.percentOfDailyNeeds)}%`;
  };

  return (
    <div className="nutrition-info-section">
      <div className="nutrition-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'macros' ? 'active' : ''}`}
          onClick={() => setActiveTab('macros')}
        >
          Macros
        </button>
        <button 
          className={`tab-button ${activeTab === 'vitamins' ? 'active' : ''}`}
          onClick={() => setActiveTab('vitamins')}
        >
          Vitamins
        </button>
        <button 
          className={`tab-button ${activeTab === 'minerals' ? 'active' : ''}`}
          onClick={() => setActiveTab('minerals')}
        >
          Minerals
        </button>
      </div>
      
      <div className="nutrition-content">
        {activeTab === 'overview' && (
          <div className="nutrition-overview">
            <div className="nutrition-summary">
              <div className="calorie-circle">
                <div className="calorie-number">{Math.round(calories)}</div>
                <div className="calorie-label">calories</div>
              </div>
              
              <div className="macro-summary">
                <div className="macro-item">
                  <span className="macro-value">{Math.round(protein)}g</span>
                  <span className="macro-label">Protein</span>
                </div>
                <div className="macro-item">
                  <span className="macro-value">{Math.round(fat)}g</span>
                  <span className="macro-label">Fat</span>
                </div>
                <div className="macro-item">
                  <span className="macro-value">{Math.round(carbs)}g</span>
                  <span className="macro-label">Carbs</span>
                </div>
              </div>
            </div>
            
            <div className="nutrition-chart">
              <h4>Macronutrient Breakdown</h4>
              <div className="donut-chart">
                <div className="donut-segment protein" style={{ 
                  transform: `rotate(0deg)`,
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(protein * 3.6 * Math.PI / 180)}% ${50 - 50 * Math.sin(protein * 3.6 * Math.PI / 180)}%, 50% 50%)`
                }}></div>
                <div className="donut-segment fat" style={{ 
                  transform: `rotate(${protein * 3.6}deg)`,
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(fat * 3.6 * Math.PI / 180)}% ${50 - 50 * Math.sin(fat * 3.6 * Math.PI / 180)}%, 50% 50%)`
                }}></div>
                <div className="donut-segment carbs" style={{ 
                  transform: `rotate(${(protein + fat) * 3.6}deg)`,
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(carbs * 3.6 * Math.PI / 180)}% ${50 - 50 * Math.sin(carbs * 3.6 * Math.PI / 180)}%, 50% 50%)`
                }}></div>
                <div className="donut-hole"></div>
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="color-box protein"></span>
                  <span>Protein: {Math.round((protein / (protein + fat + carbs)) * 100)}%</span>
                </div>
                <div className="legend-item">
                  <span className="color-box fat"></span>
                  <span>Fat: {Math.round((fat / (protein + fat + carbs)) * 100)}%</span>
                </div>
                <div className="legend-item">
                  <span className="color-box carbs"></span>
                  <span>Carbs: {Math.round((carbs / (protein + fat + carbs)) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'macros' && (
          <div className="nutrition-macros">
            <h4>Macronutrients</h4>
            <div className="nutrient-bars">
              {macronutrients.map((nutrient, index) => (
                <div key={index} className="nutrient-bar">
                  <div className="nutrient-info">
                    <span className="nutrient-name">{nutrient.name}</span>
                    <span className="nutrient-amount">{Math.round(nutrient.amount)}{nutrient.unit}</span>
                  </div>
                  <div className="bar-container">
                    <div 
                      className="bar-fill"
                      style={{ width: `${Math.min(nutrient.percentOfDailyNeeds || 0, 100)}%` }}
                    ></div>
                    <span className="percentage">{getPercentageDisplay(nutrient)}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="nutrition-note">
              <h4>Calorie Breakdown</h4>
              <p>
                Carbohydrates provide {Math.round((carbs * 4 / calories) * 100)}% of calories.
                Protein provides {Math.round((protein * 4 / calories) * 100)}% of calories.
                Fat provides {Math.round((fat * 9 / calories) * 100)}% of calories.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'vitamins' && (
          <div className="nutrition-vitamins">
            <h4>Vitamins</h4>
            <div className="nutrient-bars">
              {vitamins.length > 0 ? (
                vitamins.map((nutrient, index) => (
                  <div key={index} className="nutrient-bar">
                    <div className="nutrient-info">
                      <span className="nutrient-name">{nutrient.name}</span>
                      <span className="nutrient-amount">{nutrient.amount.toFixed(1)}{nutrient.unit}</span>
                    </div>
                    <div className="bar-container">
                      <div 
                        className="bar-fill vitamin"
                        style={{ width: `${Math.min(nutrient.percentOfDailyNeeds || 0, 100)}%` }}
                      ></div>
                      <span className="percentage">{getPercentageDisplay(nutrient)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No vitamin information available for this recipe.</p>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'minerals' && (
          <div className="nutrition-minerals">
            <h4>Minerals</h4>
            <div className="nutrient-bars">
              {minerals.length > 0 ? (
                minerals.map((nutrient, index) => (
                  <div key={index} className="nutrient-bar">
                    <div className="nutrient-info">
                      <span className="nutrient-name">{nutrient.name}</span>
                      <span className="nutrient-amount">{nutrient.amount.toFixed(1)}{nutrient.unit}</span>
                    </div>
                    <div className="bar-container">
                      <div 
                        className="bar-fill mineral"
                        style={{ width: `${Math.min(nutrient.percentOfDailyNeeds || 0, 100)}%` }}
                      ></div>
                      <span className="percentage">{getPercentageDisplay(nutrient)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No mineral information available for this recipe.</p>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="nutrition-disclaimer">
        <p>* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.</p>
      </div>
    </div>
  );
};

export default NutritionInfo;