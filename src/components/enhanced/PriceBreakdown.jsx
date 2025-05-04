import React from 'react';


const PriceBreakdown = ({ ingredients, pricePerServing, servings, currency }) => {
  // Currency symbol mapping
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹',
    AUD: 'A$',
    CAD: 'C$'
  };

  // Exchange rates (approximate - in a real app, use an API)
  const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    JPY: 150.25,
    INR: 83.42,
    AUD: 1.53,
    CAD: 1.37
  };

  // Convert USD to selected currency
  const convertCurrency = (amountInUsd) => {
    const rate = exchangeRates[currency] || 1;
    return (amountInUsd * rate).toFixed(2);
  };

  // Format price with currency symbol
  const formatPrice = (price) => {
    const symbol = currencySymbols[currency] || '$';
    return `${symbol}${price}`;
  };

  // Calculate total recipe cost
  const totalCost = pricePerServing ? (pricePerServing * servings / 100) : 0;
  const formattedTotalCost = formatPrice(convertCurrency(totalCost));

  // For ingredients with no price info, estimate based on typical grocery costs
  const estimateIngredientCost = (ingredient) => {
    // This is a very rough estimate - in a real app, use a pricing API
    const baseCost = 0.5; // Base cost in USD
    const amount = ingredient.amount || 1;
    const weightFactor = amount > 10 ? 1.5 : 1;
    return baseCost * weightFactor;
  };

  // Sort ingredients by cost (descending)
  const ingredientsWithCost = ingredients.map(ing => ({
    ...ing,
    estimatedCost: ing.price ? ing.price : estimateIngredientCost(ing)
  })).sort((a, b) => b.estimatedCost - a.estimatedCost);

  return (
    <div className="price-breakdown-section">
      <div className="price-summary">
        <div className="total-cost">
          <h3>Total Recipe Cost:</h3>
          <span className="cost-amount">{formattedTotalCost}</span>
        </div>
        
        <div className="per-serving-cost">
          <h4>Cost Per Serving:</h4>
          <span className="cost-amount">
            {formatPrice(convertCurrency(pricePerServing ? pricePerServing / 100 : 0))}
          </span>
        </div>
      </div>
      
      <div className="cost-visualization">
        <h3>Cost Breakdown</h3>
        {ingredientsWithCost.length > 0 ? (
          <div className="cost-chart">
            {ingredientsWithCost.slice(0, 10).map((ing, index) => {
              const costPercentage = (ing.estimatedCost / totalCost) * 100;
              return (
                <div key={index} className="cost-bar-container">
                  <div className="ingredient-label" title={ing.name}>
                    {ing.name.length > 20 ? `${ing.name.substring(0, 20)}...` : ing.name}
                  </div>
                  <div className="cost-bar-wrapper">
                    <div 
                      className="cost-bar" 
                      style={{ width: `${Math.min(costPercentage, 100)}%` }}
                    ></div>
                    <span className="cost-value">
                      {formatPrice(convertCurrency(ing.estimatedCost))}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-cost-data">Price information is not available for this recipe.</p>
        )}
      </div>
      
      <div className="cost-saving-tips">
        <h3>Cost-Saving Tips</h3>
        <ul>
          <li>Buy ingredients in bulk when possible, especially for pantry staples.</li>
          <li>Use seasonal produce for better prices and flavor.</li>
          <li>Check for sales and use coupons for expensive ingredients.</li>
          <li>Use leftover ingredients in other recipes to reduce waste.</li>
        </ul>
      </div>
    </div>
  );
};

export default PriceBreakdown;