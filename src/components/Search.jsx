import React, { useState } from "react";
import { fetchRecipes } from "../services/api";

const Search = ({ onRecipeSelect }) => {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const results = await fetchRecipes(query);
            setRecipes(results);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for recipes..."
                    className="border rounded px-4 py-2 w-full"
                />
                <button onClick={handleSearch} className="bg-green-500 text-white px-4 py-2 rounded">
                    Search
                </button>
            </div>
            {loading && <p>Loading...</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="border rounded-lg overflow-hidden">
                        <img src={recipe.image} alt={recipe.title} className="w-full h-32 object-cover" />
                        <div className="p-4">
                            <h4 className="text-lg font-bold">{recipe.title}</h4>
                            <button
                                onClick={() => onRecipeSelect(recipe.id)}
                                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                            >
                                View Recipe
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;