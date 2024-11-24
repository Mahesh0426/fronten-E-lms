import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user/userSlice";
import courseReducer from "./redux/instructor-course/courseSlice";
import studentCourseReducer from "./redux/student-course/studentCourseSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    studentCourse: studentCourseReducer,
  },
});

export default store;
