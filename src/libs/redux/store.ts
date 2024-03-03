import { configureStore } from "@reduxjs/toolkit";
import { unsplashApi } from "./api"; 
import searchHistorySlice from "./searchHistorySlice";

export interface RootState {
  searchHistory: {
    terms: string[];
  };
}

export const store = configureStore({
  reducer: {
    [unsplashApi.reducerPath]: unsplashApi.reducer,
    searchHistory: searchHistorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(unsplashApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
