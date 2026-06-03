import { MealFoodResult } from "./MealFoodResult";

export interface SchedulePlan {
  mealName: string; // "Bữa sáng", "Bữa trưa", "Bữa tối"
  percentage: number; // Tỷ lệ phần trăm năng lượng
  recommendedFoods: MealFoodResult[];
}