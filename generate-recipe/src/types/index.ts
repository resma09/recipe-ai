export type Recipe = {
  id: number;
  name: string;
  description: string;
  cuisine: string;
  cooking_time: string;
  servings: number;
  ingredients: string[];
  steps: string[];
  like_count: number;
  created_at: string;
  image_url?: string;
  image_credit?: string | null;
};
