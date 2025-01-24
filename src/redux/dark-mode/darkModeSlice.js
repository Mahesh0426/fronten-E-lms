import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      // Persist theme in localStorage
      localStorage.setItem("theme", state.isDarkMode ? "dark" : "light");
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

const { reducer: DarkMode, actions } = themeSlice;
export const { toggleDarkMode, setDarkMode } = actions;
export default DarkMode;
