export interface MealFoodResult {
  food_id: string;
  name: string;
  similarity: number;
  calculatedGram: number; 
  caloriesInMeal: number; 
  species: string;
}