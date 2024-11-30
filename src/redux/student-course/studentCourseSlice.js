import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentCourses: {},
  studentCourseDetails: null,
  studentEnrolledCoursesList: [],
  studentCurrentCourseProgress: {},
};

const studentCourseSlice = createSlice({
  name: "studentCourse",
  initialState,
  reducers: {
    setStudentCourses: (state, action) => {
      state.studentCourses = action.payload;
    },
    setStudentCourseDetails: (state, action) => {
      state.studentCourseDetails = action.payload;
    },
    setStudentEnrolledCoursesList: (state, action) => {
      state.studentEnrolledCoursesList = action.payload;
    },
    setStudentCurrentCourseProgress: (state, action) => {
      state.studentCurrentCourseProgress = action.payload;
    },
  },
});
const { reducer: studentCourseReducer, actions } = studentCourseSlice;
export const {
  setStudentCourses,
  setStudentCourseDetails,
  setStudentEnrolledCoursesList,
  setStudentCurrentCourseProgress,
} = actions;
export default studentCourseReducer;
