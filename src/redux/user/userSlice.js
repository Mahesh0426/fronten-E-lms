// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: {},
//   users: [],
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     setUsers: (state, action) => {
//       state.users = action.payload;
//     },
//   },
// });

// const { reducer: userReducer, actions } = userSlice;

// export const { setUser, setUsers } = actions;
// export default userReducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  users: [],
  isLoading: true, // Add this line
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false; // Set loading to false when user is set
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearUser: (state) => {
      state.user = {};
      state.isLoading = false;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;

export const { setUser, setUsers, setLoading, clearUser } = actions;
export default userReducer;
