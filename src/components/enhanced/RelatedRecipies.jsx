import React, { useState, useEffect } from 'react';

const RelatedRecipes = ({ recipeId, cuisine, onRecipeSelect }) => {
  // Keep state variables for dynamic data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  
  useEffect(() => {
    // Function to fetch related recipes
    const fetchRelatedRecipes = async () => {
      if (!recipeId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, replace this with an actual API call
        // For now, use the same mock data as the original component
        const recipes = [
          { id: 658517, name: "Roasted Brussels Sprouts w/ Red Onions", image: "https://img.spoonacular.com/recipes/658517-312x231.jpg" },
          { id: 658583, name: "Roasted Fingerling Potatoes", image: "https://img.spoonacular.com/recipes/658583-312x231.jpg" },
          { id: 658515, name: "Roasted Brussels Sprouts w/ Garlic", image: "https://img.spoonacular.com/recipes/658515-312x231.jpg" },
        ];
        
        setRelatedRecipes(recipes);
      } catch (err) {
        console.error('Error fetching related recipes:', err);
        setError('Failed to load related recipes.');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedRecipes();
  }, [recipeId]);

  // Use the original component's structure and styling
  return (
    <section className="rounded-lg p-6 mb-6">
      <h3 className="text-2xl font-bold mb-4">Related Recipes</h3>
      
      {loading && <p className="text-gray-500">Loading related recipes...</p>}
      
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && relatedRecipes.length === 0 && 
        <p className="text-gray-500">No related recipes found.</p>
      }
      
      {!loading && !error && relatedRecipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onRecipeSelect && onRecipeSelect(recipe.id)}
            >
              <img 
                src={recipe.image} 
                alt={recipe.name} 
                className="w-full h-32 object-cover" 
              />
              <div className="p-4">
                <h4 className="text-lg font-bold">{recipe.name}</h4>
                <div className="mt-2 text-sm text-green-600 hover:underline">View Recipe →</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RelatedRecipes;