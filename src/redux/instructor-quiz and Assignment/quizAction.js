import {
  createQuiz,
  fetchAllQuizesList,
  fetchAllSubmittedQuizByQuizId,
  fetchQuizById,
  fetchSubmittedQuizById,
  submitQuiz,
  updateQuizStatus,
} from "@/axios/quiz and assignment/quizAxios";
import {
  setQuiz,
  setQuizes,
  setQuizesGradeDetails,
  setQuizGradeDetails,
  setQuizStatus,
} from "./quizSlice";
import { toast } from "react-toastify";

// get all quizes list | for tutor
export const fetchAllQuizesListAction = () => async (dispatch) => {
  //call API
  const response = await fetchAllQuizesList();

  if (response?.status === "error") {
    return toast.error(response.message);
  }
  dispatch(setQuizes(response.data));
};

//  create a  new quizes | for tutor
export const createQuizAction = (quizData) => async (dispatch) => {
  const response = await createQuiz(quizData);

  if (response?.status === "error") {
    return toast.error(response.message);
  }
  toast.success(response.message);
  dispatch(fetchAllQuizesListAction());
};

// update a quiz status | for tutor
export const updateQuizStatusAction = (quizId, status) => async (dispatch) => {
  const response = await updateQuizStatus(quizId, status);

  if (response?.status === "error") {
    return toast.error(response.message);
  }

  dispatch(setQuizStatus());
  dispatch(fetchAllQuizesListAction());
};

//get a quiz for attempt  by course ID | for student
export const fetchQuizByIdAction = (courseId) => async (dispatch) => {
  const response = await fetchQuizById(courseId);

  if (response?.status === "error") {
    return toast.error(response.message);
  }
  dispatch(setQuiz(response.data));
};

//QUIZ SUBMITSSION ACTION / USER
// submitted a quiz  | for student
export const submitQuizAction = (quizPayload) => async (dispatch) => {
  const response = await submitQuiz(quizPayload);

  if (response?.status === "error") {
    return toast.error(response.message);
  }
  toast.success(response.message);
  dispatch(
    fetchSubmittedQuizByIdAction(
      response?.data?.quizId || quizPayload.quizId,
      response?.data?.studentId || quizPayload.studentId
    )
  );
};

// fetch submitted quiz by student ID and  quiz ID | for student
export const fetchSubmittedQuizByIdAction =
  (quizId, studentId) => async (dispatch) => {
    const response = await fetchSubmittedQuizById(quizId, studentId);

    if (response?.status === "error") {
      return toast.error(response.message);
    }
    dispatch(setQuizGradeDetails(response.data));
  };

// fetch all the submitted quiz by quiz ID  | for tutor
export const fetchAllSubmittedQuizByQuizIdAction =
  (quizId) => async (dispatch) => {
    const response = await fetchAllSubmittedQuizByQuizId(quizId);

    if (response?.status === "error") {
      return toast.error(response.message);
    }
    dispatch(setQuizesGradeDetails(response.data));
  };
