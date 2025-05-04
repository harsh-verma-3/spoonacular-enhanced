import React, { useEffect, useState } from 'react';

const Ingredients = ({ ingredients, servings, handleServingsChange }) => {
  // Store the original recipe servings for proper calculation
  const [originalServings, setOriginalServings] = useState(null);
  // Add state for metric vs US units
  const [showMetric, setShowMetric] = useState(true);

    // Add a function to handle exporting shopping list
    const exportShoppingList = () => {
      if (!ingredients || ingredients.length === 0) {
        alert("No ingredients to export");
        return;
      }
      
      // Create content for the shopping list
      let content = "MY SHOPPING LIST\n\n";
      content += `Recipe for ${servings} serving(s)\n`;
      content += "-------------------------------\n\n";
      
      ingredients.forEach((ingredient) => {
        // Use the same adjustment and conversion logic from the rendering
        const amount = typeof ingredient.amount === 'number' ? 
          ingredient.amount : parseFloat(ingredient.amount) || 0;
        
        const adjustedAmount = adjustAmount(amount);
        const { amount: displayAmount, unit: displayUnit } = convertUnit(adjustedAmount, ingredient.unit);
        
        content += `• ${displayAmount}${displayUnit ? ` ${displayUnit}` : ''} ${ingredient.name}\n`;
      });
      
      content += "\n-------------------------------\n";
      content += "Generated with Spoonacular Clone";
      
      // Create a Blob object from the content
      const blob = new Blob([content], { type: 'text/plain' });
      
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'shopping-list.txt';
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    };
  
  
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

  // Function to convert units between metric and US
  const convertUnit = (amount, unit) => {
    if (!unit) return { amount, unit: '' };
    
    // Lower case for consistent matching
    const lowerUnit = unit.toLowerCase();
    
    // Convert to metric (if showing metric and unit is US)
    if (showMetric) {
      // Convert US units to metric
      if (lowerUnit === 'oz' || lowerUnit === 'ounce' || lowerUnit === 'ounces') {
        return { amount: (amount * 28.35).toFixed(1), unit: 'g' };
      }
      if (lowerUnit === 'lb' || lowerUnit === 'pound' || lowerUnit === 'pounds') {
        return { amount: (amount * 453.59).toFixed(1), unit: 'g' };
      }
      if (lowerUnit === 'cup' || lowerUnit === 'cups') {
        return { amount: (amount * 236.59).toFixed(1), unit: 'ml' };
      }
      if (lowerUnit === 'gallon' || lowerUnit === 'gallons') {
        return { amount: (amount * 3.785).toFixed(2), unit: 'L' };
      }
      if (lowerUnit === 'quart' || lowerUnit === 'quarts') {
        return { amount: (amount * 946.35).toFixed(1), unit: 'ml' };
      }
      if (lowerUnit === 'pint' || lowerUnit === 'pints') {
        return { amount: (amount * 473.18).toFixed(1), unit: 'ml' };
      }
      if (lowerUnit === 'fl oz' || lowerUnit === 'fluid ounce' || lowerUnit === 'fluid ounces') {
        return { amount: (amount * 29.57).toFixed(1), unit: 'ml' };
      }
      // For fahrenheit, convert to celsius
      if (lowerUnit === '°f' || lowerUnit === 'fahrenheit') {
        return { amount: Math.round((amount - 32) * 5/9), unit: '°C' };
      }
    } else {
      // Convert metric to US units
      if (lowerUnit === 'g' || lowerUnit === 'gram' || lowerUnit === 'grams') {
        // For small amounts, keep in grams
        if (amount < 100) {
          return { amount, unit };
        }
        return { amount: (amount / 28.35).toFixed(1), unit: 'oz' };
      }
      if (lowerUnit === 'kg' || lowerUnit === 'kilogram' || lowerUnit === 'kilograms') {
        return { amount: (amount * 2.205).toFixed(1), unit: 'lb' };
      }
      if (lowerUnit === 'ml' || lowerUnit === 'milliliter' || lowerUnit === 'milliliters') {
        // For small amounts, keep in ml
        if (amount < 100) {
          return { amount, unit };
        }
        return { amount: (amount / 236.59).toFixed(1), unit: 'cup' };
      }
      if (lowerUnit === 'l' || lowerUnit === 'liter' || lowerUnit === 'liters') {
        return { amount: (amount * 4.227).toFixed(1), unit: 'cups' };
      }
      // For celsius, convert to fahrenheit
      if (lowerUnit === '°c' || lowerUnit === 'celsius') {
        return { amount: Math.round(amount * 9/5 + 32), unit: '°F' };
      }
    }
    
    // If no conversion needed, return original values
    return { amount, unit };
  };

  console.log("Servings:", servings, "Original:", originalServings);
  
  return (
    <div className="ingredients-section">
      <div className="ingredients-controls flex justify-between items-center mb-4">
        <div className="servings-control flex items-center">
          <span className="mr-2">Servings:</span>
          <input 
            type="number" 
            min="1" 
            value={servings}
            onChange={handleServingsChange}
            className="w-16 px-2 py-1 border rounded"
          />
        </div>
        
        {/* Add the metric/US toggle */}
        <div className="units-toggle">
          <button 
            onClick={() => setShowMetric(!showMetric)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            {showMetric ? 'Show US Units' : 'Show Metric Units'}
          </button>
        </div>
      </div>

      <div className="ingredients-list mt-4">
        {ingredients.length === 0 ? (
          <p className="no-ingredients text-gray-500">No ingredients available for this recipe.</p>
        ) : (
          <ul className="space-y-3">
            {ingredients.map((ingredient, index) => {
              // Ensure amount is properly parsed as a number
              const amount = typeof ingredient.amount === 'number' ? 
                ingredient.amount : 
                parseFloat(ingredient.amount) || 0;
              
              // Adjust amount based on servings
              const adjustedAmount = adjustAmount(amount);
              
              // Convert units if needed
              const { amount: displayAmount, unit: displayUnit } = convertUnit(adjustedAmount, ingredient.unit);
              
              return (
                <li key={index} className="ingredient-item flex items-center space-x-3">
                  {ingredient.image && (
                    <img 
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} 
                      alt={ingredient.name} 
                      className="w-12 h-12 object-cover rounded-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/100?text=No+Image";
                      }}
                    />
                  )}
                  
                  <div className="ingredient-details">
                    <span className="ingredient-amount font-medium">
                      {displayAmount}
                      {displayUnit && ` ${displayUnit}`}
                    </span>
                    <span className="ingredient-name ml-2">{ingredient.name}</span>
                    {ingredient.originalName && ingredient.originalName !== ingredient.name && (
                      <span className="ingredient-original-name text-gray-500 text-sm ml-1">({ingredient.originalName})</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      
      <div className="shopping-list-action mt-6">
        <button 
          className="add-to-shopping-list px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={exportShoppingList}
        >
          <i className="fas fa-shopping-cart mr-2"></i> Add to Shopping List
        </button>
      </div>
    </div>
  );
};

export default Ingredients;