import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user/userSlice";
import courseReducer from "./redux/instructor-course/courseSlice";
import studentCourseReducer from "./redux/student-course/studentCourseSlice";
import quizReducer from "./redux/instructor-quiz and Assignment/quizSlice";
import assignmentReducer from "./redux/instructor-quiz and Assignment/AssignmentSlice";
import gradeReducer from "./redux/grade/gradeSlice";
import DarkMode from "./redux/dark-mode/darkModeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    studentCourse: studentCourseReducer,
    quiz: quizReducer,
    assignment: assignmentReducer,
    grade: gradeReducer,
    theme: DarkMode,
  },
});

export default store;
