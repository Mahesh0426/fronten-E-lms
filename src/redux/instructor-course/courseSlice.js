// courseContentSlice.js
import {
  initialCourseContentFormData,
  initialCourseDetailsFormData,
} from "@/config/formConfig";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: {},
  courses: [],
  mediaUploadProgressPercentage: 0,
  courseContentFormData: initialCourseContentFormData || [],
  courseDetailsFormData: initialCourseDetailsFormData || [],
  currentEditedCourseId: null,
};

const courseContentSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
      state.courseDetailsFormData = {
        title: action.payload.title,
        description: action.payload.description,
        category: action.payload.category,
        level: action.payload.level,
        subtitle: action.payload.subtitle,
        primaryLanguage: action.payload.primaryLanguage,
        pricing: action.payload.pricing,
        objectives: action.payload.objectives,
        welcomeMessage: action.payload.welcomeMessage,
        image: action.payload.image,
      };
      state.courseContentFormData = action.payload.curriculum || [];
    },
    setCourses: (state, action) => {
      state.courses = Array.isArray(action.payload) ? action.payload : [];
    },

    setMediaUploadProgressPercentage: (state, action) => {
      state.mediaUploadProgressPercentage = action.payload;
    },
    setCourseContentFormData: (state, action) => {
      state.courseContentFormData = action.payload;
    },
    setCourseDetailsFormData: (state, action) => {
      state.courseDetailsFormData = action.payload;
    },
    setCurrentEditedCourseId: (state, action) => {
      state.currentEditedCourseId = action.payload;
    },

    resetForms: (state) => {
      state.courseContentFormData = initialCourseContentFormData;
      state.courseDetailsFormData = initialCourseDetailsFormData;
    },
  },
});
const { reducer: courseReducer, actions } = courseContentSlice;
export const {
  setCourse,
  setCourses,
  setCourseContent,
  setMediaUploadProgressPercentage,
  setCourseContentFormData,
  setCourseDetailsFormData,
  setCurrentEditedCourseId,
  resetForms,
} = actions;
export default courseReducer;
