import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignment: [],
  assignments: [],
  assignmentStatus: "Draft",
  submittedAssignment: {},
  submittedAssignmentsList: [],
};
const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    setAssignment: (state, action) => {
      state.assignment = action.payload;
    },
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    setAssignmentStatus: (state, action) => {
      state.assignmentStatus = action.payload;
    },
    setSubmittedAssignment: (state, action) => {
      state.submittedAssignment = action.payload;
    },
    setSubmittedAssignmentsList: (state, action) => {
      state.submittedAssignmentsList = action.payload;
    },
  },
});
const { reducer: assignmentReducer, actions } = assignmentSlice;
export const {
  setAssignment,
  setAssignments,
  setAssignmentStatus,
  setSubmittedAssignment,
  setSubmittedAssignmentsList,
} = actions;
export default assignmentReducer;
