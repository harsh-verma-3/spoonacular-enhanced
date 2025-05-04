export const formatRecipeData = (data: any) => {
    // Format the recipe data as needed
    return {
        id: data.id,
        title: data.title,
        image: data.image,
        ingredients: data.extendedIngredients.map((ingredient: any) => ingredient.name),
        instructions: data.instructions,
    };
};

export const calculateCookingTime = (prepTime: number, cookTime: number) => {
    return prepTime + cookTime;
};

export const isValidIngredient = (ingredient: string) => {
    return ingredient && ingredient.trim().length > 0;
};