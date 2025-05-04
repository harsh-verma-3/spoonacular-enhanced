import axios from 'axios';

const API_KEY = '23e32e03741048778ba061ec1f6bf139';
const BASE_URL = 'https://api.spoonacular.com';

export const fetchRecipes = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
            params: {
                apiKey: API_KEY,
                query,
                number: 9, // Number of results to return
                addRecipeInformation: true, // Include basic recipe information
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

export const fetchRecipeDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
            params: {
                apiKey: API_KEY,
                includeNutrition: true, // Include nutrition data
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        throw error;
    }
};