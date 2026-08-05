export interface Food {
  name: string;
  englishName: string;
  estimatedWeight: number;
}

export interface MealAnalysis {
  foods: {
    name: string;
    estimatedWeight: number;
  }[];

  coachComment: string;
}