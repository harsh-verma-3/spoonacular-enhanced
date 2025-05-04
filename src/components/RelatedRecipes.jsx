import React from "react";

const RelatedRecipes = () => {
    const recipes = [
        { id: 658517, name: "Roasted Brussels Sprouts w/ Red Onions", image: "https://img.spoonacular.com/recipes/658517-312x231.jpg" },
        { id: 658583, name: "Roasted Fingerling Potatoes", image: "https://img.spoonacular.com/recipes/658583-312x231.jpg" },
        { id: 658515, name: "Roasted Brussels Sprouts w/ Garlic", image: "https://img.spoonacular.com/recipes/658515-312x231.jpg" },
    ];

    return (
        <section className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4">Related Recipes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="border rounded-lg overflow-hidden">
                        <img src={recipe.image} alt={recipe.name} className="w-full h-32 object-cover" />
                        <div className="p-4">
                            <h4 className="text-lg font-bold">{recipe.name}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RelatedRecipes;