import type { MealPayload, MealResponse } from "@/types/Meal";
import api from "@/utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


interface MealState {
  mealList: MealPayload[];
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
  MealResponse["data"], // fulfilled 반환 타입
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
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Unknown error");
    }
  }
);

const initialState: MealState = {
  mealList: [],
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
        state.mealList = action.payload.data;
        state.error = "";
        state.totalPageNum = action.payload.totalPageNum;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(getMyMeal.rejected, (state, /*action*/) => {
        state.loading = false;
        // state.error = action.payload;
      })
    }
});
// export const { setSelectedProduct, setFilteredList, clearError } =
//   mealSlice.actions;
export default mealSlice.reducer;