import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;

export const { setUser, setUsers } = actions;
export default userReducer;
