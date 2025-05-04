import React from 'react';


const AllergyChecker = ({ allergies, handleAllergyCheck, ingredients }) => {
  // Allergen keywords to check for in ingredient names
  const allergenKeywords = {
    'dairy': ['milk', 'cream', 'cheese', 'butter', 'yogurt', 'whey', 'lactose', 'casein'],
    'nuts': ['almond', 'walnut', 'pecan', 'cashew', 'pistachio', 'hazelnut', 'macadamia', 'brazil nut', 'pine nut'],
    'gluten': ['wheat', 'barley', 'rye', 'flour', 'bread', 'pasta', 'couscous', 'semolina', 'spelt', 'farro'],
    'eggs': ['egg', 'mayonnaise', 'meringue', 'albumin', 'lysozyme', 'globulin', 'ovalbumin'],
    'soy': ['soy', 'tofu', 'tempeh', 'edamame', 'miso', 'natto', 'tamari', 'shoyu']
  };
  
  // Find allergens in ingredient list
  const findAllergens = () => {
    const foundAllergens = {};
    
    ingredients.forEach(ing => {
      const name = ing.name?.toLowerCase() || '';
      const originalName = ing.originalName?.toLowerCase() || '';
      
      Object.entries(allergenKeywords).forEach(([allergen, keywords]) => {
        if (keywords.some(keyword => name.includes(keyword) || originalName.includes(keyword))) {
          if (!foundAllergens[allergen]) {
            foundAllergens[allergen] = [];
          }
          if (!foundAllergens[allergen].includes(ing.name || ing.originalName)) {
            foundAllergens[allergen].push(ing.name || ing.originalName);
          }
        }
      });
    });
    
    return foundAllergens;
  };
  
  const detectedAllergens = findAllergens();
  const hasSelectedAllergens = Object.keys(detectedAllergens).some(allergen => 
    allergies.includes(allergen) && detectedAllergens[allergen].length > 0
  );
  
  return (
    <div className="allergy-checker">
      <p className="allergy-intro">
        Select your allergens below to check if they are present in this recipe.
      </p>
      
      <div className="allergy-options">
        <label className="allergy-option">
          <input
            type="checkbox"
            checked={allergies.includes('dairy')}
            onChange={() => handleAllergyCheck('dairy')}
          />
          <span className="allergy-name">Dairy</span>
        </label>
        
        <label className="allergy-option">
          <input
            type="checkbox"
            checked={allergies.includes('nuts')}
            onChange={() => handleAllergyCheck('nuts')}
          />
          <span className="allergy-name">Nuts</span>
        </label>
        
        <label className="allergy-option">
          <input
            type="checkbox"
            checked={allergies.includes('gluten')}
            onChange={() => handleAllergyCheck('gluten')}
          />
          <span className="allergy-name">Gluten</span>
        </label>
        
        <label className="allergy-option">
          <input
            type="checkbox"
            checked={allergies.includes('eggs')}
            onChange={() => handleAllergyCheck('eggs')}
          />
          <span className="allergy-name">Eggs</span>
        </label>
        
        <label className="allergy-option">
          <input
            type="checkbox"
            checked={allergies.includes('soy')}
            onChange={() => handleAllergyCheck('soy')}
          />
          <span className="allergy-name">Soy</span>
        </label>
      </div>
      
      {allergies.length > 0 && (
        <div className="allergy-results">
          <h4>Allergy Check Results:</h4>
          
          {hasSelectedAllergens ? (
            <div className="allergen-warnings">
              {allergies.map(allergen => {
                if (detectedAllergens[allergen]?.length > 0) {
                  return (
                    <div key={allergen} className="allergen-warning">
                      <p className="warning-text">
                        <span className="warning-icon">⚠️</span> 
                        This recipe contains <strong>{allergen}</strong>:
                      </p>
                      <ul className="allergen-ingredients">
                        {detectedAllergens[allergen].map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return null;
              })}
              <p className="allergy-disclaimer">
                Note: This is an automated check and may not detect all allergens. 
                Always verify ingredients if you have severe allergies.
              </p>
            </div>
          ) : (
            <p className="no-allergens-found">
              <span className="check-icon">✓</span> 
              No selected allergens were detected in this recipe.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllergyChecker;