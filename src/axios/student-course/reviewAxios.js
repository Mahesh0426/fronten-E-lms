import { axiosApiCall } from "../axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/reviews`;

// POST | create a review for a course | authenticated route
export const createReview = (reviewData) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/create`,
    data: reviewData,
    isPrivate: true,
  });
};

// GET  | get all the  review based on Course ID
export const getReviewByCourseId = (courseId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/${courseId}`,
  });
};
