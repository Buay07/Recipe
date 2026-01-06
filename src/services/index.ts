import axios from 'axios';
import { Recipe, RecipeDetail, Nutrition } from '../types';

const API_KEY = import.meta.env.VITE_API_KEY_RECIPE;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export async function getRandomRecipes(count: number = 6): Promise<Recipe[]> {
  const response = await axios.get(`${BASE_URL}/random?number=${count}&apiKey=${API_KEY}`);
  return response.data.recipes;
}

export async function getPopularRecipes(count: number = 4): Promise<Recipe[]> {
  return getRandomRecipes(count);
}

export async function searchRecipes(query: string, count: number = 9): Promise<Recipe[]> {
  const response = await axios.get(`${BASE_URL}/complexSearch?query=${query}&number=${count}&apiKey=${API_KEY}`);
  return response.data.results;
}

export async function getRecipesByCuisine(cuisine: string, count: number = 9): Promise<Recipe[]> {
  const response = await axios.get(`${BASE_URL}/complexSearch?cuisine=${cuisine}&number=${count}&apiKey=${API_KEY}`);
  return response.data.results;
}

export async function getRecipeDetails(id: string): Promise<RecipeDetail> {
  const response = await axios.get(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`);
  return response.data;
}

export async function getRecipeNutrition(id: string): Promise<Nutrition> {
  const response = await axios.get(`${BASE_URL}/${id}/nutritionWidget.json?apiKey=${API_KEY}`);
  return response.data;
}

export async function getRecipeWithNutrition(id: string): Promise<{ detail: RecipeDetail; nutrition: Nutrition }> {
  const [detail, nutrition] = await Promise.all([
    getRecipeDetails(id),
    getRecipeNutrition(id)
  ]);
  return { detail, nutrition };
}
