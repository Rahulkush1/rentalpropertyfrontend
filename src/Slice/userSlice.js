import {createSlice } from "@reduxjs/toolkit";
import { registerUser, userLocation, userLogin } from "../Action/userAction";



const initialState = {
  userInfo: {},
  loading: false,
  userToken: null,
  error: null,
  success: false,
  isAuthenticated: false,
  location: null
};

 initialState.userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state , action) => {
      state.userInfo = {};
      localStorage.removeItem('userToken');
      state.userToken = null;
      state.isAuthenticated = false;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearErrors: (state, {payload}) => {
      state.error = null;
    }
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
        state.error= null;
    })
    .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isAuthenticated = false;

    })
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    })
    .addCase(registerUser.rejected, (state, {payload} ) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    })
    .addCase(userLocation.pending, (state) => {
      state.loading =true;
      state.error = null;
    })
    .addCase(userLocation.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.location = payload;
    })
    .addCase(userLocation.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.location = null;
    })
  },
});

export const {logout, setCredentials,clearErrors} = userSlice.actions;
export default userSlice.reducer;
