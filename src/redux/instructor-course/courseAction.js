import { uploadMedia } from "@/axios/instructor-course/uploadAxios";
import { toast } from "react-toastify";
import { setCourse, setCourseContent, setCourses } from "./courseSlice";
import {
  fetchAllCourses,
  fetchCourseById,
  createCourse,
  updateCourseById,
  deleteLecture,
} from "@/axios/instructor-course/courseAxios";

// upload course video
export const uploadMediaAction = () => async (dispatch) => {
  const response = await uploadMedia(formData);

  if (response?.status == "error") {
    return toast.error(response.message);
  }
  toast.success(response.message);
  dispatch(setCourseContent(response.data));
};

// get all courss
export const fetchAllCoursesAction = () => async (dispatch) => {
  //call API
  const response = await fetchAllCourses();

  if (response?.status === "error") {
    return toast.error(response.message);
  }
  dispatch(setCourses(response.data));
};

//get a course details by id
export const fetchCourseByIdAction = (courseId) => async (dispatch) => {
  const response = await fetchCourseById(courseId);
  // console.log("details", response);

  if (response?.status === "error") {
    return toast.error(response.message);
  }
  dispatch(setCourse(response.data));
};

//  create a  new course
export const createCourseAction = (courseData) => async (dispatch) => {
  const response = await createCourse(courseData);

  if (response?.status === "error") {
    return toast.error(response.message);
  }
  toast.success(response.message);
  dispatch(fetchAllCoursesAction());
};

//update  course details by id
export const updateCourseByIdAction =
  (courseId, courseData) => async (dispatch) => {
    const response = await updateCourseById(courseId, courseData);

    if (response?.status === "error") {
      return toast.error(response.message);
    }
    toast.success(response.message);

    dispatch(fetchCourseByIdAction(courseId));
  };

// delete a course lecture  by id
export const deleteLectureAction =
  (courseId, lectureId) => async (dispatch) => {
    const response = await deleteLecture(courseId, lectureId);

    if (response?.status === "error") {
      return toast.error(response.message);
    }
    toast.success(response.message);

    // Dispatch action to refresh course data again
    dispatch(fetchCourseByIdAction(courseId));
  };
