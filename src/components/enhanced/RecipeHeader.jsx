import React from 'react';

const RecipeHeader = ({ recipe, servings }) => {
  // Extract needed information from recipe object
  const { 
    title, 
    image, 
    readyInMinutes, 
    sourceName, 
    sourceUrl,
    aggregateLikes,
    healthScore,
    spoonacularScore
  } = recipe;

  // Format cooking time in a readable format
  const formatCookingTime = (minutes) => {
    if (!minutes) return 'Time unavailable';
    
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    
    return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minutes`;
  };

  return (
    <div className="recipe-header">
      <div className="recipe-title-container">
        <h1 className="recipe-title">{title}</h1>
        
        <div className="recipe-meta-stats">
          {aggregateLikes !== undefined && (
            <div className="meta-stat">
              <i className="fas fa-heart"></i>
              <span>{aggregateLikes}</span>
            </div>
          )}
          
          {healthScore !== undefined && (
            <div className="meta-stat health-score" title="Health Score">
              <i className="fas fa-heartbeat"></i>
              <span>{healthScore}/100</span>
            </div>
          )}
          
          {spoonacularScore !== undefined && (
            <div className="meta-stat spoonacular-score" title="Spoonacular Score">
              <i className="fas fa-star"></i>
              <span>{Math.round(spoonacularScore)}/100</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="recipe-image-container">
        <img 
          src={image || 'https://via.placeholder.com/556x370.png?text=No+Image+Available'} 
          alt={title} 
          className="recipe-image"
        />
      </div>
      
      <div className="recipe-meta-info">
        {readyInMinutes && (
          <div className="meta-item">
            <i className="fas fa-clock"></i>
            <span>Ready in {formatCookingTime(readyInMinutes)}</span>
          </div>
        )}
        
        <div className="meta-item">
          <i className="fas fa-utensils"></i>
          <span>Servings: {servings}</span>
        </div>
        
        {sourceName && sourceUrl && (
          <div className="meta-item source">
            <i className="fas fa-external-link-alt"></i>
            <span>
              Source: <a href={sourceUrl} target="_blank" rel="noopener noreferrer">{sourceName}</a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeHeader;