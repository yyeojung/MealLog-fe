export type MEALTYPE = "breakfast"| "lunch"| "dinner"| "snack";

export interface Nutrients {
  carbs: number;
  protein: number;
  fat: number;
  sugar: number;
}

export interface Food {
  _id?: string;
  num: number;
  name: string;
  amount: number;
  calories: number;
  nutrients: Nutrients;
}

export interface MealPayload {
  _id?: string;
  userId: string;
  date: Date;
  type: string;
  foods: Food[];
  photo?: string;
  memo?: string;
}
export interface MealResponse {
  status: string;
  data: {
    _id: string;
    userId: string;
    date: string;
    type: string;
    foods: Food[];
    photo?: string;
    memo?: string;
  };
}
