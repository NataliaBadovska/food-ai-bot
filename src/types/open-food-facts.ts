export interface OpenFoodFactsProduct {
  product_name?: string;

  nutriments?: {
    "energy-kcal_100g"?: number;
    proteins_100g?: number;
    fat_100g?: number;
    carbohydrates_100g?: number;
  };
}

export interface OpenFoodFactsResponse {
  products: OpenFoodFactsProduct[];
}