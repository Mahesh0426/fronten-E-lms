import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quiz: [],
  quizes: [],
  quizStatus: "Draft",
  quizGradeDetails: {},
  quizesGradeDetails: [],
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
    setQuizGradeDetails: (state, action) => {
      state.quizGradeDetails = action.payload;
    },
    setQuizesGradeDetails: (state, action) => {
      state.quizesGradeDetails = action.payload;
    },
  },
});
const { reducer: quizReducer, actions } = quizSlice;
export const {
  setQuiz,
  setQuizes,
  setQuizStatus,
  setQuizGradeDetails,
  setQuizesGradeDetails,
} = actions;
export default quizReducer;
