import { axiosApiCall } from "./axiosApiCall";

const USER_API_URL = `${
  import.meta.env.VITE_APP_API_BASE_URL
}/api/studentCourse`;

// get  all  student course |GET | Public Route
export const fetchAllStudentCourses = (query) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/get?${query}`,
  });
};

//get a course student  details by id  | GET | public Route
export const fetchStudentCourseById = (courseId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/${courseId}`,
  });
};

// Check if the course is purchased by the student | GET
export const checkCoursePurchased = (courseId, studentId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/purchase-info/${courseId}/${studentId}`,
  });
};
