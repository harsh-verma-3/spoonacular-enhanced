import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeDetails from "./components/RecipeDetails";
import Ingredients from "./components/Ingredients";
import Instructions from "./components/Instructions";
import PriceBreakdown from "./components/PriceBreakdown";
import DetailedNutrition from "./components/DetailedNutrition";
import RelatedRecipes from "./components/RelatedRecipes";
import Equipment from "./components/Equipment";
import RecipePage from "./components/enhanced/RecipePage";
import { fetchRecipes, fetchRecipeDetails } from "./services/api";
import { defaultRecipe } from '../sampleresponse';

// Import CSS for enhanced view
import "./styles/RecipePage.css";

const App = () => {
    const [viewMode, setViewMode] = useState("original");
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    // Load a default hardcoded recipe when the page first loads
    useEffect(() => {
        if (!selectedRecipe && !hasSearched) {
          setSelectedRecipe(defaultRecipe);
        }
      }, [selectedRecipe, hasSearched]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        
        setLoading(true);
        setError(null);
        setHasSearched(true);
        setSelectedRecipe(null); // Reset the selected recipe during search
        
        try {
            const data = await fetchRecipes(searchQuery);
            setSearchResults(data.results || []);
            console.log("Search results:", data.results);
        } catch (err) {
            // Check if error is due to API limit (402 Payment Required)
            if (err.response && err.response.status === 402) {
                setError("Sorry API limit exhausted, we are using free version.😢");
            } else {
                setError("Failed to search for recipes. Please try again later.");
            }
            console.error("Error searching recipes:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRecipeSelect = async (id) => {
        setLoading(true);
        setError(null);
        
        try {
            const recipe = await fetchRecipeDetails(id);
            setSelectedRecipe(recipe);
            setSearchResults([]); // Clear search results when recipe is selected
        } catch (err) {
            // Check if error is due to API limit
            if (err.response && err.response.status === 402) {
                setError("Sorry API limit exhausted, we are using free version.😢");
            } else {
                setError("Failed to load recipe details.");
            }
            console.error("Error fetching recipe details:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                handleSearch={handleSearch}
                loading={loading}
            />
            <main className="max-w-5xl mx-auto p-4">
                {/* Toggle Button - Only show when a recipe is selected AND search results are empty */}
                {selectedRecipe && searchResults.length === 0 && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setViewMode("original")}
                            className={`px-4 py-2 rounded-l ${
                                viewMode === "original" ? "bg-green-500 text-white" : "bg-gray-200"
                            }`}
                        >
                            Original
                        </button>
                        <button
                            onClick={() => setViewMode("enhanced")}
                            className={`px-4 py-2 rounded-r ${
                                viewMode === "enhanced" ? "bg-green-500 text-white" : "bg-gray-200"
                            }`}
                        >
                            Enhanced
                        </button>
                    </div>
                )}
                
                {/* No Results Message */}
                {hasSearched && !loading && searchResults.length === 0 && !error && (
                    <div className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4 mb-6">
                        <p>Sorry, we have not found any matches for your query.</p>
                    </div>
                )}
                
                {/* Search Results */}
                {searchResults.length > 0 && !selectedRecipe && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">Search Results</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {searchResults.map((recipe) => (
                                <div 
                                    key={recipe.id} 
                                    className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                                    onClick={() => handleRecipeSelect(recipe.id)}
                                >
                                    <img 
                                        src={recipe.image} 
                                        alt={recipe.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg">{recipe.title}</h3>
                                        <p className="text-sm text-gray-600 mt-2">Ready in {recipe.readyInMinutes} minutes</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                        <p>{error}</p>
                    </div>
                )}

                {/* Recipe Display */}
                {selectedRecipe && !loading && (
                    viewMode === "original" ? (
                        <>
                            <RecipeDetails recipe={selectedRecipe} />
                            <Ingredients ingredients={selectedRecipe.extendedIngredients} />
                            <Instructions instructions={selectedRecipe.analyzedInstructions} />
                            <PriceBreakdown price={selectedRecipe.pricePerServing} />
                            <DetailedNutrition nutrition={selectedRecipe.nutrition} />
                            <Equipment equipment={selectedRecipe.analyzedInstructions?.[0]?.steps?.flatMap(step => step.equipment) || []} />
                            <RelatedRecipes related={null} />
                        </>
                    ) : (
                        <RecipePage recipe={selectedRecipe} />
                    )
                )}
            </main>
            <Footer />
        </div>
    );
};

export default App;