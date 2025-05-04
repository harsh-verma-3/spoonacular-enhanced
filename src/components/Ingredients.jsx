import React, { useState } from "react";

const Ingredients = ({ ingredients = [] }) => {
    const [view, setView] = useState("grid");
    const [measure, setMeasure] = useState("us");
    const [servings, setServings] = useState(6);

    const handleServingsIncrement = () => {
        setServings(prevServings => prevServings + 1);
    };

    const handleServingsDecrement = () => {
        if (servings > 1) {
            setServings(prevServings => prevServings - 1);
        }
    };

    return (
        <section className="rounded-lg p-6 mb-6 mt-8">
            <h2 className="text-2xl font-bold mb-6">Ingredients</h2>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                {/* Left side controls */}
                <div className="flex flex-wrap gap-4 mb-4 sm:mb-0">
                    {/* View Toggle */}
                    <div className="border rounded px-1 inline-flex">
                        <label className={`cursor-pointer px-3 py-1 ${view === "grid" ? "bg-blue-100 text-gray-800" : ""}`}>
                            <input
                                type="radio"
                                name="view"
                                className="hidden"
                                checked={view === "grid"}
                                onChange={() => setView("grid")}
                            />
                            Grid
                        </label>
                        <label className={`cursor-pointer px-3 py-1 ${view === "list" ? "bg-blue-100 text-gray-800" : ""}`}>
                            <input
                                type="radio"
                                name="view"
                                className="hidden"
                                checked={view === "list"}
                                onChange={() => setView("list")}
                            />
                            List
                        </label>
                    </div>
                    
                    {/* Servings Control */}
                    <div className="flex items-center border rounded px-2 py-1">
                        <span className="mr-2">Servings:</span>
                        <div className="flex">
                            <input
                                type="number"
                                id="servings"
                                value={servings}
                                onChange={(e) => setServings(Number(e.target.value))}
                                className="w-10 text-center border-none"
                                min="1"
                            />
                            <div className="flex flex-col ml-1">
                                <button 
                                    onClick={handleServingsIncrement}
                                    className="px-1 text-xs hover:bg-gray-200"
                                >
                                    ▴
                                </button>
                                <button 
                                    onClick={handleServingsDecrement}
                                    className="px-1 text-xs hover:bg-gray-200"
                                >
                                    ▾
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Right side controls */}
                <div className="flex items-center">
                    {/* Measure Toggle */}
                    <div className="border rounded px-1 inline-flex">
                        <label className={`cursor-pointer px-3 py-1 ${measure === "metric" ? "bg-blue-100 text-gray-800" : ""}`}>
                            <input
                                type="radio"
                                name="measure"
                                className="hidden"
                                checked={measure === "metric"}
                                onChange={() => setMeasure("metric")}
                            />
                            Metric
                        </label>
                        <label className={`cursor-pointer px-3 py-1 ${measure === "us" ? "bg-blue-100 text-gray-800" : ""}`}>
                            <input
                                type="radio"
                                name="measure"
                                className="hidden"
                                checked={measure === "us"}
                                onChange={() => setMeasure("us")}
                            />
                            US
                        </label>
                    </div>
                </div>
            </div>
            
            {/* Ingredients Grid/List */}
            <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <img
                            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                            alt={ingredient.name}
                            className="w-16 h-16 rounded"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/100?text=No+Image";
                            }}
                        />
                        <div>
                            <p className="font-bold">
                                {measure === "metric" 
                                  ? `${ingredient.measures?.metric?.amount || ''} ${ingredient.measures?.metric?.unitShort || ''}`
                                  : `${ingredient.measures?.us?.amount || ''} ${ingredient.measures?.us?.unitShort || ''}`}
                            </p>
                            <p>{ingredient.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Ingredients;