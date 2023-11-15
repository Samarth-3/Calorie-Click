import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    setUserId: (state, action) => {
        state.currentUser = action.payload;
      },
    removeUser: (state) => {
      state.currentUser = null;
    },
  },
});
export const selectUser = (state) => state.user.currentUser;
export const { loginStart,loginFailure,loginSuccess,setUserId,removeUser } = userSlice.actions;
export default userSlice.reducer;

