export interface Recipe {
  id: number;
  title: string;
  image: string;
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

export interface Step {
  number: number;
  step: string;
}

export interface Instruction {
  name: string;
  steps: Step[];
}

export interface RecipeDetail {
  id: number;
  title: string;
  image: string;
  summary: string;
  dishTypes: string[];
  extendedIngredients: Ingredient[];
  analyzedInstructions: Instruction[];
}

export interface Nutrition {
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
}
