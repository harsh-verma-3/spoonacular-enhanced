import React, { useEffect, useState } from 'react';

const Ingredients = ({ ingredients, servings, handleServingsChange }) => {
  // Store the original recipe servings for proper calculation
  const [originalServings, setOriginalServings] = useState(null);
  
  // Set original servings when component mounts or ingredients change
  useEffect(() => {
    if (ingredients && ingredients.length > 0) {
      // Try to get original servings from ingredient data or use current servings as fallback
      const recipeServings = ingredients[0]?.recipeServings || ingredients.length > 0 ? servings : 4;
      setOriginalServings(recipeServings);
    }
  }, [ingredients]);

  // Function to adjust ingredient amount based on servings
  const adjustAmount = (amount) => {
    if (!amount || typeof amount !== 'number' || !originalServings) {
      return amount;
    }
    
    // Calculate the adjusted amount based on the ratio of current to original servings
    const ratio = servings / originalServings;
    const adjusted = amount * ratio;
    
    // Format the number to avoid too many decimal places
    return adjusted.toFixed(2).replace(/\.00$/, '').replace(/\.0$/, '');
  };

  console.log("Servings:", servings, "Original:", originalServings);
  
  return (
    <div className="ingredients-section">
      <div className="ingredients-controls">
        <div className="servings-control">
          <span>Servings:</span>
          <input 
            type="number" 
            min="1" 
            value={servings}
            onChange={handleServingsChange}
            className="servings-input"
          />
        </div>
      </div>

      <div className="ingredients-list">
        {ingredients.length === 0 ? (
          <p className="no-ingredients">No ingredients available for this recipe.</p>
        ) : (
          <ul>
            {ingredients.map((ingredient, index) => {
              // Ensure amount is properly parsed as a number
              const amount = typeof ingredient.amount === 'number' ? 
                ingredient.amount : 
                parseFloat(ingredient.amount) || 0;
              
              const adjustedValue = adjustAmount(amount);
              
              return (
                <li key={index} className="ingredient-item">
                  {ingredient.image && (
                    <img 
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} 
                      alt={ingredient.name} 
                      className="ingredient-image"
                    />
                  )}
                  
                  <div className="ingredient-details">
                    <span className="ingredient-amount">
                      {adjustedValue}
                      {ingredient.unit && ` ${ingredient.unit}`}
                    </span>
                    <span className="ingredient-name">{ingredient.name}</span>
                    {ingredient.originalName && ingredient.originalName !== ingredient.name && (
                      <span className="ingredient-original-name">({ingredient.originalName})</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      
      <div className="shopping-list-action">
        <button 
          className="add-to-shopping-list"
        >
          <i className="fas fa-shopping-cart"></i> Add to Shopping List
        </button>
      </div>
    </div>
  );
};

export default Ingredients;