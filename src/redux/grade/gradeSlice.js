import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentMarks: [],
  allStudentMarks: [],
  isLoading: false,
  uniqueCourses: [],
};

const gradeSlice = createSlice({
  name: "grade",
  initialState,
  reducers: {
    setStudentMarks: (state, action) => {
      state.studentMarks = action.payload;
    },
    setAllStudentMarks: (state, action) => {
      state.allStudentMarks = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUniqueCourses: (state, action) => {
      state.uniqueCourses = action.payload;
    },
  },
});

const { reducer: gradeReducer, actions } = gradeSlice;
export const {
  setStudentMarks,
  setAllStudentMarks,
  setLoading,
  setUniqueCourses,
} = actions;
export default gradeReducer;
