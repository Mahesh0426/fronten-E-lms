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
// edit quiz | PATCH | private Route
export const editQuiz = (quizId, quizData) => {
  return axiosApiCall({
    method: "patch",
    url: `${USER_API_URL}/edit/${quizId}`,
    data: quizData,
  });
};
// delete quiz | DELETE | private Route
export const deleteQuiz = (quizId) => {
  return axiosApiCall({
    method: "delete",
    url: `${USER_API_URL}/delete/${quizId}`,
  });
};

// get  all quizes  list |GET | Public Route
export const fetchAllQuizesList = (instructorId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/get/${instructorId}`,
    isPrivate: true,
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

// submitted a quiz by student | POST | private Route
export const submitQuiz = (quizPayload) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/submit`,
    data: quizPayload,
  });
};

// fetch  sumbitted quiz by student ID and QuizId | GET | private Route
export const fetchSubmittedQuizById = (quizId, studentId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/get-quiz/${quizId}/${studentId}`,
    isPrivate: true,
  });
};

// fetch all submitted quiz by quiz ID | GET | private Route
export const fetchAllSubmittedQuizByQuizId = (quizId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/get-all-quizes/${quizId}`,
  });
};
