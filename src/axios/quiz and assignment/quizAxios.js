import { axiosApiCall } from "../axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/quiz`;

//   create a  new quiz | POST | | private Route
export const createQuiz = (quizData) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/create`,
    data: quizData,
  });
};

// get  all quizes  list |GET | Public Route
export const fetchAllQuizesList = () => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/get`,
  });
};

//get a Quiz by quizID and CourseId  | GET | public Route
export const fetchQuizById = (courseId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/quiz/${courseId}`,
  });
};

// update a quiz status by ID  | PATCH | private Route
export const updateQuizStatus = (quizId, status) => {
  return axiosApiCall({
    method: "patch",
    url: `${USER_API_URL}/update-status/${quizId}`,
    data: { status },
  });
};
