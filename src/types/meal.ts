export interface Food {
  name: string;
  englishName?: string;
  estimatedWeight: number;
}

export interface MealAnalysis {
  mealName: string;

  foods: Food[];

  coachComment: string;
}