import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignment: [],
  assignments: [],
  assignmentStatus: "Draft",
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
  },
});
const { reducer: assignmentReducer, actions } = assignmentSlice;
export const { setAssignment, setAssignments, setAssignmentStatus } = actions;
export default assignmentReducer;
