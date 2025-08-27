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

export interface Totals {  
  calories: number,
  carbs: number,
  protein: number,
  fat: number,
  sugar: number,
  byType: {
      breakfast: {
          calories: number
      },
      lunch: {
          calories: number
      },
      dinner: {
          calories: number
      },
      snack: {
          calories: number
      }
  }
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
  meals: MealPayload;
  totals: Totals;
}
