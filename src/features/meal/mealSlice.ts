import type { MealPayload, MealResponse, Totals } from "@/types/Meal";
import api from "@/utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



interface MealState {
  meals: MealPayload[]; 
  totals: Totals;
  loading: boolean;
  error: string;
  totalPageNum: number;
  pageSize: number;
  success: boolean;
}

export const getMyMeal = createAsyncThunk(
  "meal/getMyMeal",
  async (query: { date?: string; type?: string }, { rejectWithValue }) => {
    try {
      const response = await api.get("/meal", { params: query });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Unknown error");
    }
  }
);

export const createMeal = createAsyncThunk<
  MealPayload, // fulfilled 반환 타입
  MealPayload,          // argument 타입
  { rejectValue: string }
>(
  "meal/createMeal",
  async (formData, { /*dispatch,*/ rejectWithValue }) => {
    try {
      const response = await api.post<MealResponse>("/meal", formData);
      // dispatch(
      //   showToastMessage({ message: "상품 생성 완료! 🎉", status: "success" })
      // );
      console.log(response)
      return response.data.meals;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Unknown error");
    }
  }
);

export const updateMeal= createAsyncThunk(
  "meal/updateMeal",
  async (payload: { mealId: string; data: MealPayload}, { rejectWithValue }) => {
    try {
      const { mealId, data } = payload;

      const response = await api.put(`/meal/${mealId}`, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Unknown error");
    }
  }
);

export const deleteMeal = createAsyncThunk(
  "meal/deleteMeal",
  async (query: { mealId?: string; foodId?: string }, { rejectWithValue }) => {
    try {
      const response = await api.delete("/meal", { params: query });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Unknown error");
    }
  }
);

const initialState: MealState = {
  meals: [], 
  totals: {
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
    sugar: 0,
    byType: {
      breakfast: { calories: 0 },
      lunch: { calories: 0 },
      dinner: { calories: 0 },
      snack: { calories: 0 },
    },
  },
  loading: false,
  error: "",
  totalPageNum: 1,
  pageSize: 10,
  success: false,
};

const mealSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMeal.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
        state.success = true; // 상품 생성을 성공 했다 ? 모달 닫기 : 실패 메세지
      })
      .addCase(createMeal.rejected, (state, /*action*/) => {
        state.loading = false;
        // state.error = action.payload;
        state.success = false;
      })
      .addCase(getMyMeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyMeal.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload.data.meals;
        state.totals = action.payload.data.totals;
        state.error = "";
        state.totalPageNum = action.payload.totalPageNum;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(getMyMeal.rejected, (state, /*action*/) => {
        state.loading = false;
        // state.error = action.payload;
      })
      .addCase(updateMeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMeal.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
        state.success = true;
      })
      .addCase(updateMeal.rejected, (state, /*action*/) => {
        state.loading = false;
        // state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteMeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMeal.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteMeal.rejected, (state, /*action*/) => {
        state.loading = false;
        // state.error = action.payload;
      })
    }
});
// export const { setSelectedProduct, setFilteredList, clearError } =
//   mealSlice.actions;
export default mealSlice.reducer;