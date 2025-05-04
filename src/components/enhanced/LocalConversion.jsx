import React from 'react';


const LocalConversion = ({ localCurrency, localWeight, handleCurrencyChange, handleWeightChange }) => {
  return (
    <div className="local-conversion">
      <div className="conversion-controls">
        {/* Currency Conversion */}
        <div className="currency-conversion">
          <label htmlFor="currency-select">Currency:</label>
          <select
            id="currency-select"
            value={localCurrency}
            onChange={handleCurrencyChange}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="INR">INR (₹)</option>
            <option value="AUD">AUD (A$)</option>
            <option value="CAD">CAD (C$)</option>
          </select>
        </div>

        {/* Weight Unit Conversion */}
        <div className="weight-conversion">
          <label htmlFor="weight-select">Weight Unit:</label>
          <select
            id="weight-select"
            value={localWeight}
            onChange={handleWeightChange}
          >
            <option value="g">Grams (g)</option>
            <option value="oz">Ounces (oz)</option>
            <option value="lb">Pounds (lb)</option>
            <option value="kg">Kilograms (kg)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LocalConversion;