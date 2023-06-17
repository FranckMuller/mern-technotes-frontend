import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    setCredentials: (state, action) => {
      state.user = { ...action.payload };
    },
    logOut: (state, action) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export const selectCurrentToken = (state) => state.auth.user.accessToken;
export const selectAuthedUserid = (state) => state.auth.user.id
export default authSlice.reducer;
