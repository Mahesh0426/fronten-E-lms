import { axiosApiCall } from "./axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/course`;

// get  all courss |GET | Public Route
export const fetchAllCourses = () => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/get`,
  });
};

//get a course details by id  | GET | public Route
export const fetchCourseById = (courseId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/${courseId}`,
  });
};

//   create a  new course | POST | | private Route
export const createCourse = (courseData) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/create`,
    data: courseData,
  });
};

//update  course details by id  | PUT | private Route
export const updateCourseById = (courseId, courseData) => {
  return axiosApiCall({
    method: "put",
    url: `${USER_API_URL}/update/${courseId}`,
    data: courseData,
  });
};

// delete lecture details by id | DELETE | private Route
export const deleteLecture = (courseId, lectureId) => {
  return axiosApiCall({
    method: "delete",
    url: `${USER_API_URL}/delete/${courseId}/${lectureId}`,
  });
};
