import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    setCredentials: (state, action) => {
      state.user = { ...action.payload };
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectAccessToken = (state) => state.auth.user?.accessToken || null;
export const selectAuthedUserid = (state) => state.auth.user?.id || null;
export const selectAuthedUser = (state) => state.auth.user;
export default authSlice.reducer;
