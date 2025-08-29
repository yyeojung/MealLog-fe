import { configureStore } from "@reduxjs/toolkit";
import mealSlice from '@/features/meal/mealSlice'

const store = configureStore({
  reducer: {
    meal: mealSlice,
  }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;