// Only updating the container classes

import React, { useState } from 'react';
import '../../styles/RecipePage.css';

// Subcomponents for better organization
import RecipeHeader from './RecipeHeader';
import AllergyChecker from './AllergyChecker';
import Ingredients from './Ingredients';
import Equipment from './Equipment';
import PriceBreakdown from './PriceBreakdown';
import Instructions from './Instructions';
import NutritionInfo from './NutritionInfo';
import RelatedRecipes from './RelatedRecipies';

const RecipePage = ({ recipe }) => {
  const [servings, setServings] = useState(recipe?.servings || 4);
  const [showMetric, setShowMetric] = useState(true);
  const [allergies, setAllergies] = useState([]);
  const [isAllergyCheckerOpen, setIsAllergyCheckerOpen] = useState(false);
  const [upperTabActive, setUpperTabActive] = useState('ingredients');
  const [lowerTabActive, setLowerTabActive] = useState('nutrition');

  const handleServingsChange = (e) => {
    setServings(parseInt(e.target.value) || 1);
  };

  const toggleMetric = () => {
    setShowMetric(!showMetric);
  };

  const handleAllergyCheck = (allergy) => {
    setAllergies(prev => 
      prev.includes(allergy) 
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    );
  };

  if (!recipe) {
    return <div className="loading-container">Loading recipe information...</div>;
  }

  return (
    <div className="enhanced-recipe-page">
      <div className="recipe-content-container space-y-8">
         {/* Enhanced Header with Large Image and Metadata */}
         <div className="recipe-header-container bg-white rounded-lg shadow p-6">
  <div className="recipe-header-large">
    <h1 className="recipe-title text-2xl font-bold mb-4">{recipe.title}</h1>
    
    {/* Make image container full width */}
    <div className="recipe-image-container w-full">
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="recipe-image-large w-full h-auto rounded-md"
      />
    </div>

    {/* Recipe Metadata - remove any background styling */}
    <div className="recipe-metadata-grid flex flex-wrap justify-between mt-4 w-full bg-transparent">
      <div className="metadata-item flex items-center mb-2">
        <img 
          src="/application/frontend/images/cheap.svg" 
          alt="Cost per serving" 
          className="w-5 h-5 mr-2"
        />
        <div className="metadata-text">
          <div className="metadata-value text-sm">${(recipe.pricePerServing / 100).toFixed(2)}</div>
          <div className="metadata-label text-xs">per serving</div>
        </div>
      </div>

      <div className="metadata-item flex items-center mb-2">
        <img 
          src="/application/frontend/images/popular.svg" 
          alt="Likes" 
          className="w-5 h-5 mr-2"
        />
        <div className="metadata-text">
          <div className="metadata-value text-sm">{recipe.aggregateLikes || 1}</div>
          <div className="metadata-label text-xs">likes</div>
        </div>
      </div>

      <div className="metadata-item flex items-center mb-2">
        <img 
          src="/application/frontend/images/fast.svg" 
          alt="Ready time" 
          className="w-5 h-5 mr-2"
        />
        <div className="metadata-text">
          <div className="metadata-value text-sm">Ready in</div>
          <div className="metadata-label text-xs">{recipe.readyInMinutes} minutes</div>
        </div>
      </div>

      <div className="metadata-item flex items-center mb-2">
        <img 
          src="/application/frontend/images/spoonacular-score-75.svg" 
          alt="Spoonacular Score" 
          className="w-5 h-5 mr-2"
        />
        <div className="metadata-text">
          <div className="metadata-value text-sm">Spoonacular Score</div>
          <div className="metadata-label text-xs">{Math.round(recipe.spoonacularScore) || 69}%</div>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Allergy Checker (Separate Section) */}
        <div className="allergy-checker-container bg-white rounded-lg shadow p-6">
          <div className="toggle-header"
               onClick={() => setIsAllergyCheckerOpen(!isAllergyCheckerOpen)}>
            <h3 className="text-lg font-semibold">Allergy Checker</h3>
            <span>{isAllergyCheckerOpen ? '▼' : '▶'}</span>
          </div>
          <div className={`toggle-content ${isAllergyCheckerOpen ? 'active' : ''}`}>
            <AllergyChecker 
              allergies={allergies}
              handleAllergyCheck={handleAllergyCheck}
              ingredients={recipe.extendedIngredients || []}
            />
          </div>
        </div>

        {/* Top Tab: Ingredients & Equipment */}
        <div className="ingredients-equipment-container bg-white rounded-lg shadow p-6">
          <div className="tab-section">
            <div className="recipe-tabs">
              <button 
                className={`tab-button ${upperTabActive === 'ingredients' ? 'active' : ''}`}
                onClick={() => setUpperTabActive('ingredients')}
              >
                <h2 className="text-xl font-bold">Ingredients</h2>
              </button>
              <button 
                className={`tab-button ${upperTabActive === 'equipment' ? 'active' : ''}`}
                onClick={() => setUpperTabActive('equipment')}
              >
                <h2 className="text-xl font-bold">Equipment</h2>
              </button>
            </div>

            <div className="tab-content">
              {upperTabActive === 'ingredients' && (
                <div className="ingredients-tab">
                  <Ingredients 
                    ingredients={recipe.extendedIngredients || []} 
                    servings={servings} 
                    handleServingsChange={handleServingsChange}
                    showMetric={showMetric}
                    toggleMetric={toggleMetric}
                    showHeading={false}
                  />
                </div>
              )}

              {upperTabActive === 'equipment' && (
                <div className="equipment-tab">
                  <Equipment 
                    equipment={recipe.analyzedInstructions?.[0]?.steps?.flatMap(step => step.equipment) || []}
                    showHeading={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions Section (Always Visible) */}
        <div className="instructions-container bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Instructions</h2>
          <div className="instructions-section-container">
            <Instructions 
              steps={recipe.analyzedInstructions?.[0]?.steps || []}
              showHeading={false}
            />
          </div>
        </div>

        {/* Bottom Tab: Nutrition & Price Breakdown */}
        <div className="nutrition-price-container bg-white rounded-lg shadow p-6">
          <div className="tab-section">
            <div className="recipe-tabs">
              <button 
                className={`tab-button ${lowerTabActive === 'nutrition' ? 'active' : ''}`}
                onClick={() => setLowerTabActive('nutrition')}
              >
                <h2 className="text-xl font-bold">Nutrition Information</h2>
              </button>
              <button 
                className={`tab-button ${lowerTabActive === 'price' ? 'active' : ''}`}
                onClick={() => setLowerTabActive('price')}
              >
                <h2 className="text-xl font-bold">Price Breakdown</h2>
              </button>
            </div>

            <div className="tab-content">
              {lowerTabActive === 'nutrition' && (
                <div className="nutrition-tab">
                  <NutritionInfo 
                    nutrition={recipe.nutrition || {}}
                    showHeading={false}
                  />
                </div>
              )}

              {lowerTabActive === 'price' && (
                <div className="price-tab">
                  <PriceBreakdown 
                    ingredients={recipe.extendedIngredients || []} 
                    pricePerServing={recipe.pricePerServing}
                    servings={servings}
                    showHeading={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;