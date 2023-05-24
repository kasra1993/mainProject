import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {},
    isLoggedIn: false,
  },
  reducers: {
    loggedUser(state, action) {
      state.userData = action.payload.user;
      state.isLoggedIn = action.payload.isLoggedIn;
    },

    isLoggedIn(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});
export default authSlice;
export const authActions = authSlice.actions;
