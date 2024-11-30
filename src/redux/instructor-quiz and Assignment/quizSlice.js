import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quiz: [],
  quizes: [],
  quizStatus: "Draft",
};
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setQuizes: (state, action) => {
      state.quizes = action.payload;
    },
    setQuizStatus: (state, action) => {
      state.quizStatus = action.payload;
    },
  },
});
const { reducer: quizReducer, actions } = quizSlice;
export const { setQuiz, setQuizes, setQuizStatus } = actions;
export default quizReducer;
