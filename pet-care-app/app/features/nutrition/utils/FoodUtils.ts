import { Food } from '../types/Food';
import { SchedulePlan } from '../types/SchedulePlan';
import { cosineSimilarity } from './NutritionUtils';
import { getNutrition } from '../services/NutritionApi';

let cachedFoods: Food[] | null = null;
let cachedVectors: { food_id: any; name: string; vector: number[]; species: string }[] | null = null;

export function clearFoodCache() {
  cachedFoods = null;
  cachedVectors = null;
}

export async function loadFoodData(): Promise<Food[]> {

  if (cachedFoods) {
    return cachedFoods;
  }

  try {
    const rawData = await getNutrition();

    if (!Array.isArray(rawData)) {
      console.warn("Dữ liệu dinh dưỡng từ API không đúng định dạng mảng");
      return [];
    }

    const foods: Food[] = rawData.map((item: any) => ({
      food_id: item.food_id,
      food_name: item.food_name,
      calories: Number(item.calories),
      protein: Number(item.protein),
      fat: Number(item.fat),
      carb: Number(item.carb),
      species: item.species,
    }));

    cachedFoods = foods;
    return foods;
  } catch (error) {
    console.error("Lỗi khi loadFoodData từ API:", error);
    return [];
  }
}

export async function loadFoodVectors(): Promise<{ name: string; vector: number[]; species: string }[]> {
  if (cachedVectors) {
    return cachedVectors;
  }

  const foods = await loadFoodData();

  const vectors = foods.map(food => ({
    food_id: food.food_id,
    name: food.food_name,
    vector: [food.calories, food.protein, food.fat, food.carb],
    species: food.species,
  }));

  cachedVectors = vectors;
  return vectors;
}

export function recommendFoodsForMeals(
  dailyTargetVector: number[],
  foodVectors: any[],
  petSpecies: string,
  BASE_GRAM: number = 100
): SchedulePlan[] {
  
  // 1. Định nghĩa cấu trúc các bữa ăn trong ngày (Ví dụ: Sáng 40% - Trưa 30% - Tối 30%)
  const mealTemplates = [
    { name: "Bữa Sáng", percentage: 0.4 },
    { name: "Bữa Trưa", percentage: 0.3 },
    { name: "Bữa Tối", percentage: 0.3 },
  ];

  const filteredFoods = foodVectors.filter(
    food => food.species.toLowerCase() === petSpecies.toLowerCase()
  );

  // 2. Duyệt qua từng bữa ăn để tính toán cụ thể
  const mealPlans: SchedulePlan[] = mealTemplates.map(meal => {
    // Nhân tỷ lệ phần trăm để tìm mục tiêu dinh dưỡng riêng cho bữa ăn này
    const mealTargetVector = dailyTargetVector.map(val => val * meal.percentage);
    const targetMealCalories = mealTargetVector[0];

    // Tính độ khớp và số gram của tất cả các món đối với bữa ăn này
    const foodRecommendations = filteredFoods.map(food => {
      const similarity = cosineSimilarity(mealTargetVector, food.vector);
      const foodBaseCalories = food.vector[0]; // Lượng calo gốc có trong BASE_GRAM (100g)

      let calculatedGram = 0;
      if (foodBaseCalories > 0) {
        // Công thức: (Calo mục tiêu bữa / Calo gốc của món) * 100g
        calculatedGram = Math.round((targetMealCalories / foodBaseCalories) * BASE_GRAM);
      }

      return {
        food_id: food.food_id,
        name: food.name,
        similarity: similarity,
        calculatedGram: calculatedGram,
        caloriesInMeal: Math.round(targetMealCalories),
        species: food.species,
      };
    });

    // Sắp xếp các món ăn khớp nhất từ cao xuống thấp và lấy Top 3 món tốt nhất cho bữa này
    const topFoodsForMeal = foodRecommendations
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3);

    return {
      mealName: meal.name,
      percentage: meal.percentage,
      recommendedFoods: topFoodsForMeal,
    };
  });

  return mealPlans;
}