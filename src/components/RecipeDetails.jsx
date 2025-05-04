import React from "react";

const RecipeDetails = () => {
    return (
        <section className="">
            {/* Recipe Title */}
            <h1
                itemProp="name"
                className="text-3xl  text-left mb-6"
            >
                Roasted Brussels Sprouts with Glazed Pancetta and Pecans
            </h1>

            {/* Recipe Image */}
            <div className="flex justify-center mb-6">
                <div className="relative">
                    <img
                        itemProp="image"
                        src="https://img.spoonacular.com/recipes/1096309-556x370.jpg"
                        alt="Roasted Brussels Sprouts with glazed pancetta and pecans"
                        title="Roasted Brussels Sprouts with glazed pancetta and pecans"
                        className="w-full max-w-3xl rounded-lg"
                    />
                    <div className="text-xs text-gray-500 mt-2 text-right">
                        Image &copy; <a href="#" target="_blank" itemProp="author">Author</a>
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
                        src="/application/frontend/images/cheap.svg"
                        alt="One serving costs about $4"
                        title="One serving costs about $4"
                        className="badge w-12 h-12"
                    />
                    <img
                        src="/application/frontend/images/cheap.svg"
                        alt="One serving costs about $4"
                        title="One serving costs about $4"
                        className="badge w-12 h-12"
                    />
                </div>
                <p className="font-bold">$4.00 per serving</p>
            </div>

            {/* Likes */}
            <div>
                <img
                    src="/application/frontend/images/popular.svg"
                    alt="1 people like this recipe"
                    title="1 people like this recipe"
                    className="badge w-12 h-12 mx-auto mb-2"
                />
                <p>
                    <span id="aggregateLikes">1</span> likes
                </p>
            </div>

            {/* Time */}
            <div>
                <img
                    src="/application/frontend/images/fast.svg"
                    alt="This recipe is ready in 45 minutes"
                    title="This recipe is ready in 45 minutes"
                    className="badge w-12 h-12 mx-auto mb-2"
                />
                <p>Ready in 45 minutes</p>
            </div>

            {/* Spoonacular Score */}
            <div>
                <img
                    src="/application/frontend/images/spoonacular-score-75.svg"
                    alt="Spoonacular Score: 69%"
                    title="Spoonacular Score: 69%"
                    className="badge w-16 h-12 mx-auto mb-2"
                />
                <p>Spoonacular Score: 69%</p>
            </div>
        </div>
    </div>
</div>
        </section>
    );
};

export default RecipeDetails;