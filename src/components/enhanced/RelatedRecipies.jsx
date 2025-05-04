import React, { useState, useEffect } from 'react';

const RelatedRecipes = ({ recipeId, cuisine }) => {
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch related recipes
    const fetchRelatedRecipes = async () => {
      if (!recipeId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, replace this with an actual API call
        // const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/similar?apiKey=YOUR_API_KEY`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockData = [
          {
            id: 1001,
            title: 'Similar Recipe 1',
            readyInMinutes: 30,
            servings: 4,
            sourceUrl: '#',
            image: 'https://spoonacular.com/recipeImages/715594-312x231.jpg'
          },
          {
            id: 1002,
            title: 'Similar Recipe 2',
            readyInMinutes: 45,
            servings: 6,
            sourceUrl: '#',
            image: 'https://spoonacular.com/recipeImages/716429-312x231.jpg'
          },
          {
            id: 1003,
            title: 'Similar Recipe 3',
            readyInMinutes: 20,
            servings: 2,
            sourceUrl: '#',
            image: 'https://spoonacular.com/recipeImages/794349-312x231.jpg'
          }
        ];
        
        setRelatedRecipes(mockData);
      } catch (err) {
        console.error('Error fetching related recipes:', err);
        setError('Failed to load related recipes.');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedRecipes();
  }, [recipeId]);

  if (loading) {
    return (
      <div className="related-recipes-section">
        <h2>Related Recipes</h2>
        <div className="loading">Loading related recipes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="related-recipes-section">
        <h2>Related Recipes</h2>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (relatedRecipes.length === 0) {
    return (
      <div className="related-recipes-section">
        <h2>Related Recipes</h2>
        <p className="no-related">No related recipes found.</p>
      </div>
    );
  }

  return (
    <div className="related-recipes-section">
      <h2>You Might Also Like</h2>
      
      <div className="related-recipes-grid">
        {relatedRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-card-image">
              <img 
                src={recipe.image || 'https://via.placeholder.com/312x231.png?text=No+Image'} 
                alt={recipe.title} 
              />
            </div>
            
            <div className="recipe-card-content">
              <h3 className="recipe-card-title">{recipe.title}</h3>
              
              <div className="recipe-card-meta">
                {recipe.readyInMinutes && (
                  <span className="recipe-time">
                    <i className="fas fa-clock"></i> {recipe.readyInMinutes} min
                  </span>
                )}
                
                {recipe.servings && (
                  <span className="recipe-servings">
                    <i className="fas fa-utensils"></i> {recipe.servings} servings
                  </span>
                )}
              </div>
              
              <a 
                href={`/recipe/${recipe.id}`} 
                className="view-recipe-button"
              >
                View Recipe
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="more-recipes">
        <a href="#" className="more-button">
          {cuisine ? `See More ${cuisine} Recipes` : 'Browse More Recipes'}
        </a>
      </div>
    </div>
  );
};

export default RelatedRecipes;