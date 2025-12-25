import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDarkMode ? "dark" : "light";
};

const themeReducer = createSlice({
  name: "theme",
  initialState: {
    mode: getInitialTheme(),
  },
  reducers: {
    toggleTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { toggleTheme } = themeReducer.actions;
export default themeReducer.reducer;
