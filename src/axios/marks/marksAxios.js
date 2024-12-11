import { axiosApiCall } from "../axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/marks`;

//get all the marks by instructor id | GET | private Route
export const fetchAllMarksByInstructorId = (instructorId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/get-all-marks/instructor/${instructorId}`,
  });
};
