import { toast } from "react-toastify";
import {
  createAssignment,
  createAssignmentSubmission,
  fetchAllAssignmentsList,
  fetchAllAssignmentsSubmissionList,
  fetchAssignmentById,
  fetchSubmittedAssignmentById,
  updateAssignmentStatus,
} from "@/axios/quiz and assignment/assignmentAxios";
import {
  setAssignment,
  setAssignments,
  setAssignmentStatus,
  setSubmittedAssignment,
  setSubmittedAssignmentsList,
} from "./AssignmentSlice";

// get all assignments list
export const fetchAllAssignmentListAction = () => async (dispatch) => {
  //call API
  const response = await fetchAllAssignmentsList();

  if (response?.status === "error") {
    return toast.error(response.message);
  }
  dispatch(setAssignments(response.data));
};

//  create a  new assignmet
export const createAssignmentAction = (assignmentData) => async (dispatch) => {
  const response = await createAssignment(assignmentData);

  if (response?.status === "error") {
    return toast.error(response.message);
  }
  toast.success(response.message);
  dispatch(fetchAllAssignmentListAction());
};

//get a assignment by course id
export const fetchAssignmentByIdAction = (courseId) => async (dispatch) => {
  const response = await fetchAssignmentById(courseId);

  if (response?.status === "error") {
    return toast.error(response.message);
  }
  dispatch(setAssignment(response.data));
};

// update a quiz status
export const updateAssignmentStatusAction =
  (assignmentId, status) => async (dispatch) => {
    const response = await updateAssignmentStatus(assignmentId, status);

    if (response?.status === "error") {
      return toast.error(response.message);
    }

    dispatch(setAssignmentStatus());
    dispatch(fetchAllAssignmentListAction());
  };

//ASSIGNMENT SUBMITSSION ACTION

// get all submitted assignments list
export const fetchAllSubmittedAssignmentsListAction =
  () => async (dispatch) => {
    //call API
    const response = await fetchAllAssignmentsSubmissionList();

    if (response?.status === "error") {
      return toast.error(response.message);
    }
    dispatch(setSubmittedAssignmentsList(response.data));
  };

//  create a  new assignmet Submission
export const createAssignmentSubmissionAction =
  (submissionData) => async (dispatch) => {
    const response = await createAssignmentSubmission(submissionData);

    if (response?.status === "error") {
      return toast.error(response.message);
    }
    toast.success(response.message);
    dispatch(fetchAllSubmittedAssignmentsListAction());
  };

//get a submitted assignment by  submission  id
export const fetchSubmittedAssignmentByIdAction =
  (assignmentId) => async (dispatch) => {
    const response = await fetchSubmittedAssignmentById(assignmentId);

    if (response?.status === "error") {
      return toast.error(response.message);
    }
    dispatch(setSubmittedAssignment(response.data));
  };
