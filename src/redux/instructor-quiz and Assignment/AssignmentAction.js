import { toast } from "react-toastify";
import {
  createAssignment,
  createAssignmentSubmission,
  deleteAssignment,
  deleteAssignmentSubmission,
  editAssignment,
  editSubmittedAssignment,
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
export const fetchAllAssignmentListAction =
  (instructorId) => async (dispatch) => {
    //call API
    const response = await fetchAllAssignmentsList(instructorId);

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

//edit assignment by assignment id
export const editAssignmentAction =
  (assignmentId, assignmentData) => async (dispatch) => {
    const response = await editAssignment(assignmentId, assignmentData);

    if (response?.status === "error") {
      return toast.error(response.message);
    }
    toast.success(response.message);
    dispatch(fetchAllAssignmentListAction());
  };

//delete assignment by assignment id
export const deleteAssignmentAction = (assignmentId) => async (dispatch) => {
  const response = await deleteAssignment(assignmentId);

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

// update a Assignment status
export const updateAssignmentStatusAction =
  (assignmentId, status) => async (dispatch) => {
    const response = await updateAssignmentStatus(assignmentId, status);

    if (response?.status === "error") {
      return toast.error(response.message);
    }

    dispatch(setAssignmentStatus());
    dispatch(fetchAllAssignmentListAction());
  };

//ASSIGNMENT SUBMITSSION ACTION / USER

// get all submitted assignments list by assignment ID | for tutor
export const fetchAllSubmittedAssignmentsListAction =
  (assignmentId) => async (dispatch) => {
    //call API
    const response = await fetchAllAssignmentsSubmissionList(assignmentId);

    if (response?.status === "error") {
      return toast.error(response.message);
    }
    dispatch(setSubmittedAssignmentsList(response.data));
  };

// edit assignment grade  by id | for tutor
export const editSubmittedAssignmentAction =
  (assignmentId, studentId, payload) => async (dispatch) => {
    const response = await editSubmittedAssignment(
      assignmentId,
      studentId,
      payload
    );

    if (response?.status === "error") {
      return toast.error(response.message);
    }

    // Re-fetch the updated submission data
    dispatch(fetchSubmittedAssignmentById(assignmentId, studentId));
  };

//delete assignment submission grade by id | for tutor
export const deleteAssignmentSubmissionAction =
  (submissionId, assignmentId) => async (dispatch) => {
    const response = await deleteAssignmentSubmission(submissionId);

    if (response?.status === "error") {
      return toast.error(response.message);
    }

    toast.success(response.message);
    dispatch(fetchAllSubmittedAssignmentsListAction(assignmentId));
  };

// SUBMITTED ASSIGNMENT ACTION / USER
//get a submitted assignment by  student id and assignment id
export const fetchSubmittedAssignmentByIdAction =
  (assignmentId, studentId) => async (dispatch) => {
    const response = await fetchSubmittedAssignmentById(
      assignmentId,
      studentId
    );

    if (response?.status === "error") {
      return toast.error(response.message);
    }

    dispatch(setSubmittedAssignment(response.data));
  };

//  create a  new assignmet Submission
export const createAssignmentSubmissionAction =
  (submissionData) => async (dispatch) => {
    const response = await createAssignmentSubmission(submissionData);

    if (response?.status === "error") {
      return toast.error(response.message);
    }
    toast.success(response.message);
    dispatch(fetchSubmittedAssignmentByIdAction(response?.data?.studentId));
  };
