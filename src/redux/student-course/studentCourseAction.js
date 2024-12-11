import {
  fetchAllStudentCourses,
  fetchStudentCourseById,
} from "@/axios/student-course/studentCourseAxios";
import {
  setStudentCourseDetails,
  setStudentCourses,
} from "./studentCourseSlice";
import { toast } from "react-toastify";

// get all  student courses
export const fetchAllStudentCoursesAction = (query) => async (dispatch) => {
  //call API
  const response = await fetchAllStudentCourses(query);

  if (response?.status === "error") {
    return toast.error(response.message);
  }
  dispatch(setStudentCourses(response.data));
};

//get a  student course   details by id
export const fetchStudentCourseByIdAction = (courseId) => async (dispatch) => {
  const response = await fetchStudentCourseById(courseId);

  if (response?.status === "error") {
    return toast.error(response.message);
  }
  dispatch(setStudentCourseDetails(response.data));
};
