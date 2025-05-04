export const formatRecipeData = (data) => {
    // Format the recipe data as needed
    return {
        id: data.id,
        title: data.title,
        image: data.image,
        ingredients: data.extendedIngredients.map((ingredient) => ingredient.name),
        instructions: data.instructions,
    };
};

export const calculateCookingTime = (prepTime, cookTime) => {
    return prepTime + cookTime;
};

export const isValidIngredient = (ingredient) => {
    return ingredient && ingredient.trim().length > 0;
};

export const getImagePath = (path) => {
    return `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;
  };
  