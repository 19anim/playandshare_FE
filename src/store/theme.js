import { createSlice } from "@reduxjs/toolkit";

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const themeReducer = createSlice({
  name: "theme",
  initialState: {
    mode: isDarkMode ? "dark" : "bright",
  },
  reducers: {
    toggleTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme } = themeReducer.actions;
export default themeReducer.reducer;
