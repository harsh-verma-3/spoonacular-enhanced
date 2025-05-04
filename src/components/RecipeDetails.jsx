import React from "react";
import { getImagePath } from '../utils/helpers.js';

const RecipeDetails = ({ recipe }) => {
    if (!recipe) return null;
    
    return (
        <section className="">
            {/* Recipe Title */}
            <h1
                itemProp="name"
                className="text-3xl text-left mb-6"
            >
                {recipe.title}
            </h1>

            {/* Recipe Image */}
            <div className="flex justify-center mb-6">
                <div className="relative">
                    <img
                        itemProp="image"
                        src={recipe.image}
                        alt={recipe.title}
                        title={recipe.title}
                        className="w-full max-w-3xl rounded-lg"
                    />
                    <div className="text-xs text-gray-500 mt-2 text-right">
                        Image &copy; <a href={recipe.sourceUrl || "#"} target="_blank" rel="noreferrer" itemProp="author">{recipe.sourceName || "Author"}</a>
                    </div>
                </div>
            </div>

            {/* Metadata Section */}
            <div className="flex justify-center mb-5">
                {/* Match the width of the image */}
                <div className="relative">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-gray-700 text-sm">
                        {/* Cost */}
                        <div>
                            <div className="flex justify-center items-center gap-2 mb-2">
                                <img
                                    src={getImagePath("/application/frontend/images/cheap.svg")}
                                    alt="Cost per serving"
                                    title="Cost per serving"
                                    className="badge w-12 h-12"
                                />
                                <img
                                    src={getImagePath("/application/frontend/images/cheap.svg")}
                                    alt="Cost per serving"
                                    title="Cost per serving"
                                    className="badge w-12 h-12"
                                />
                            </div>
                            <p className="font-bold">${((recipe.pricePerServing || 0) / 100).toFixed(2)} per serving</p>
                        </div>

                        {/* Likes */}
                        <div>
                            <img
                                src={getImagePath("/application/frontend/images/popular.svg")}
                                alt="Likes"
                                title="Likes"
                                className="badge w-12 h-12 mx-auto mb-2"
                            />
                            <p>
                                <span id="aggregateLikes">{recipe.aggregateLikes || 0}</span> likes
                            </p>
                        </div>

                        {/* Time */}
                        <div>
                            <img
                                src={getImagePath("/application/frontend/images/fast.svg")}
                                alt="Ready time"
                                title="Ready time"
                                className="badge w-12 h-12 mx-auto mb-2"
                            />
                            <p>Ready in {recipe.readyInMinutes || 0} minutes</p>
                        </div>

                        {/* Spoonacular Score */}
                        <div>
                            <img
                                src={getImagePath("/application/frontend/images/spoonacular-score-75.svg")}
                                alt="Spoonacular Score"
                                title="Spoonacular Score"
                                className="badge w-16 h-12 mx-auto mb-2"
                            />
                            <p>Spoonacular Score: {Math.round(recipe.spoonacularScore) || 0}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecipeDetails;