import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user/userSlice";
import courseContentReducer from "./redux/instructor-course/courseContentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    courseContent: courseContentReducer,
  },
});

export default store;
