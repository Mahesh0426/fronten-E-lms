import { axiosApiCall } from "../axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/marks`;

//get all the marks by instructor id | GET | private Route
export const fetchAllMarksByInstructorId = (instructorId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/get-all-marks/instructor/${instructorId}`,
  });
};

//get  particular courses marks by student id | GET | private Route
export const fetchMarksByStudentId = (studentId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/get-marks/student/${studentId}`,
  });
};

// GET average scores of all courses taught by a particular instructor
export const fetchAverageScoresByInstructorId = (instructorId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/get-course-stats/instructor/${instructorId}`,
  });
};

// GET Activity Log by instructor id  | GET
export const fetchActivityLogByInstructorId = (instructorId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/get-activity-log/instructor/${instructorId}`,
  });
};
