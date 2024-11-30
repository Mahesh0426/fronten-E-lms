import {
  createQuiz,
  fetchAllQuizesList,
  fetchQuizById,
  updateQuizStatus,
} from "@/axios/quiz and assignment/quizAxios";
import { setQuiz, setQuizes, setQuizStatus } from "./quizSlice";
import { toast } from "react-toastify";

// get all quizes list
export const fetchAllQuizesListAction = () => async (dispatch) => {
  //call API
  const response = await fetchAllQuizesList();

  if (response?.status === "error") {
    return toast.error(response.message);
  }
  dispatch(setQuizes(response.data));
};

//  create a  new quizes
export const createQuizAction = (quizData) => async (dispatch) => {
  const response = await createQuiz(quizData);

  if (response?.status === "error") {
    return toast.error(response.message);
  }
  toast.success(response.message);
  dispatch(fetchAllQuizesListAction());
};

//get a quiz by course ID
export const fetchQuizByIdAction = (courseId) => async (dispatch) => {
  const response = await fetchQuizById(courseId);

  if (response?.status === "error") {
    return toast.error(response.message);
  }
  dispatch(setQuiz(response.data));
};

// update a quiz status
export const updateQuizStatusAction = (quizId, status) => async (dispatch) => {
  const response = await updateQuizStatus(quizId, status);

  if (response?.status === "error") {
    return toast.error(response.message);
  }

  dispatch(setQuizStatus());
  dispatch(fetchAllQuizesListAction());
};
