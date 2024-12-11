import { axiosApiCall } from "../axiosApiCall";

const USER_API_URL = `${
  import.meta.env.VITE_APP_API_BASE_URL
}/api/student/course-progress`;

//get current course progress | GET
export const getCurrentCourseProgress = (userId, courseId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/${userId}/${courseId}`,
  });
};

//mark current lecture as viewed | POST
export const markLectureAsViewed = (userId, courseId, lectureId) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/mark-lecture-view`,
    data: { userId, courseId, lectureId },
  });
};

//reset course progress | POST
export const resetCourseProgress = (userId, courseId) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/reset-progress`,
    data: { userId, courseId },
  });
};
