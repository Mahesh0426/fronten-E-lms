import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user/userSlice";
import courseReducer from "./redux/instructor-course/courseSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
  },
});

export default store;
