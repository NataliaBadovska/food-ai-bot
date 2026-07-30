export interface FoodNutrition {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface MealNutrition {
  foods: FoodNutrition[];
  total: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}