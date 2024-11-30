import { axiosApiCall } from "./axiosApiCall";

const USER_API_URL = `${
  import.meta.env.VITE_APP_API_BASE_URL
}/api/student/my-courses`;

//get the  enroll student courses by student id | GET | Private
export const getEnrolledCourses = (studentId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/${studentId}`,
    isPrivate: true,
  });
};
