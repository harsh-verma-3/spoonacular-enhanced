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
        {/* Hero Section with Recipe Image and Basic Info */}
        <div className="recipe-hero bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="recipe-image-container relative">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="recipe-image-large w-full h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="recipe-title text-4xl font-bold text-white mb-2">{recipe.title}</h1>
              <div className="recipe-meta-extra flex items-center space-x-4 text-white/90">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {recipe.readyInMinutes} min
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {recipe.servings} servings
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  {recipe.aggregateLikes} likes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="quick-stats-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600">${(recipe.pricePerServing / 100).toFixed(2)}</div>
            <div className="text-sm text-gray-600">per serving</div>
          </div>
          <div className="stat-card bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{Math.round(recipe.spoonacularScore)}%</div>
            <div className="text-sm text-gray-600">Spoonacular Score</div>
          </div>
          <div className="stat-card bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{recipe.healthScore}</div>
            <div className="text-sm text-gray-600">Health Score</div>
          </div>
          <div className="stat-card bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{recipe.weightWatcherSmartPoints}</div>
            <div className="text-sm text-gray-600">WW Points</div>
          </div>
        </div>

        {/* Allergy Checker */}
        <div className="allergy-checker-container bg-white rounded-xl shadow-lg p-6">
          <div className="toggle-header flex items-center justify-between cursor-pointer"
               onClick={() => setIsAllergyCheckerOpen(!isAllergyCheckerOpen)}>
            <h3 className="text-xl font-semibold text-gray-800">Allergy Checker</h3>
            <span className="text-gray-600 transform transition-transform duration-200">
              {isAllergyCheckerOpen ? '▼' : '▶'}
            </span>
          </div>
          <div className={`toggle-content ${isAllergyCheckerOpen ? 'active' : ''}`}>
            <AllergyChecker 
              allergies={allergies}
              handleAllergyCheck={handleAllergyCheck}
              ingredients={recipe.extendedIngredients || []}
            />
          </div>
        </div>

        {/* Ingredients & Equipment Tabs */}
        <div className="ingredients-equipment-container bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="recipe-tabs flex border-b border-gray-200">
            <button 
              className={`tab-button flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                upperTabActive === 'ingredients' 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setUpperTabActive('ingredients')}
            >
              Ingredients
            </button>
            <button 
              className={`tab-button flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                upperTabActive === 'equipment' 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setUpperTabActive('equipment')}
            >
              Equipment
            </button>
          </div>

          <div className="tab-content p-6">
            {upperTabActive === 'ingredients' && (
              <Ingredients 
                ingredients={recipe.extendedIngredients || []} 
                servings={servings} 
                handleServingsChange={handleServingsChange}
                showMetric={showMetric}
                toggleMetric={toggleMetric}
                showHeading={false}
              />
            )}

            {upperTabActive === 'equipment' && (
              <Equipment 
                equipment={recipe.analyzedInstructions?.[0]?.steps?.flatMap(step => step.equipment) || []}
                showHeading={false}
              />
            )}
          </div>
        </div>

        {/* Instructions Section */}
        <div className="instructions-container bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Instructions</h2>
          <div className="instructions-section-container">
            <Instructions 
              steps={recipe.analyzedInstructions?.[0]?.steps || []}
              showHeading={false}
            />
          </div>
        </div>

        {/* Nutrition & Price Tabs */}
        <div className="nutrition-price-container bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="recipe-tabs flex border-b border-gray-200">
            <button 
              className={`tab-button flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                lowerTabActive === 'nutrition' 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setLowerTabActive('nutrition')}
            >
              Nutrition Information
            </button>
            <button 
              className={`tab-button flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                lowerTabActive === 'price' 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setLowerTabActive('price')}
            >
              Price Breakdown
            </button>
          </div>

          <div className="tab-content p-6">
            {lowerTabActive === 'nutrition' && (
              <NutritionInfo 
                nutrition={recipe.nutrition || {}}
                showHeading={false}
              />
            )}

            {lowerTabActive === 'price' && (
              <PriceBreakdown 
                ingredients={recipe.extendedIngredients || []} 
                pricePerServing={recipe.pricePerServing}
                servings={servings}
                showHeading={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;