import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchHistoryState {
  terms: string[];
}

const initialState: SearchHistoryState = {
  terms: [],
};

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState,
  reducers: {
    addSearchTerm: (state, action: PayloadAction<string>) => {
      state.terms.push(action.payload);
      console.log(state);
    },
  },
});

export const { addSearchTerm } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
