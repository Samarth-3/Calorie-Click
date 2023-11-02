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
  },
});
export const selectUser = (state) => state.user.currentUser;
export const { loginStart,loginFailure,loginSuccess,setUserId } = userSlice.actions;
export default userSlice.reducer;

