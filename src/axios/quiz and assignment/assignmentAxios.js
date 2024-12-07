import { axiosApiCall } from "../axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/assignment`;

//   create a  new assignment | POST | | private Route
export const createAssignment = (assignmentData) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/create`,
    data: assignmentData,
  });
};

// get  all assignments  list |GET | Public Route
export const fetchAllAssignmentsList = () => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/get`,
  });
};

//get a assignment by courseId   | GET | public Route
export const fetchAssignmentById = (courseId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/assignment/${courseId}`,
  });
};

// update a assignments status by ID  | PATCH | private Route
export const updateAssignmentStatus = (assignmentId, status) => {
  return axiosApiCall({
    method: "patch",
    url: `${USER_API_URL}/update-status/${assignmentId}`,
    data: { status },
  });
};

//  grade a submission | PATCH | private Route
export const gradeAssignmentSubmission = (assignmentId, studentId) => {
  return axiosApiCall({
    method: "patch",
    url: `${USER_API_URL}/grade-submission/${assignmentId}/${studentId}`,
  });
};

//ASSIGNMENT SUBMITSSION

//   create a  new assignment Submission | POST | | private Route
export const createAssignmentSubmission = (submissionData) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/create-submission`,
    data: submissionData,
  });
};

// get  all assignments Submission list | GET | Public Route | for  tutor
export const fetchAllAssignmentsSubmissionList = (assignmentId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/get-allSubmissions/${assignmentId}`,
  });
};

// get   submitted  assignment by id  | GET | public Route | for student
export const fetchSubmittedAssignmentById = (assignmentId, studentId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/get-submission/${assignmentId}/${studentId}`,
    isPrivate: true,
  });
};

//  update score and review  by tutor  | PATCH | private Route
export const gradeAssignmentAxios = (assignmentId, studentId, payload) => {
  return axiosApiCall({
    method: "patch",
    url: `${USER_API_URL}/grade-submission/${assignmentId}/${studentId}`,
    data: payload,
  });
};
