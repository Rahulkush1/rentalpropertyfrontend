import {createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../Action/userAction";



const initialState = {
  userInfo: {},
  loading: false,
  userToken: null,
  error: null,
  success: false,
  isAuthenticated: false
};

 initialState.userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
      state.isAuthenticated = true
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;

    })
    .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.auth_token;
        state.isAuthenticated = true
    })
    .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
    })
  },
});

export const {setCredentials} = userSlice.actions;
export default userSlice.reducer;
