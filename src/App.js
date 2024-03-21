import React, { useEffect } from "react";
import Footer from "./component/Footer/Footer";
import Navbar from "./component/Navbar/Navbar";
import Home from "./component/Home/Home";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import SignUp from "./component/Authentication/Signup";
import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./component/Authentication/Login";
import store from "./store";
import {  clearErrors, loadUser, setCredentials, setUserError } from "./Slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Property from "./component/Property/Property";
import PropertyDetails from "./component/Property/PropertyDetails";
import { useGetUserDetailsQuery } from "./services/auth/authService";
import Loader from "./component/Helper/Loader";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import UserDial from "./component/Helper/UserDial";
import { setProperty } from "./Slice/propertySlice";
import { useGetPropertiesQuery } from "./services/auth/propertyService";
import Appointment from "./component/Appointment/Appointment";

export default function App() {
  const dispatch = useDispatch()
  const { userInfo, error,  isAuthenticated, loading } = useSelector(
    (state) => state.user
  );
  const { data,  isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 9000000,
  });
  const { data1, isloading } = useGetPropertiesQuery("properties", {
    pollingInterval: 9000000,
  });
 
  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
    if(data1){
        dispatch(setProperty(data1))
    }
  }, [dispatch, data, data1]);

  return (

    <>
      <BrowserRouter>
        <Navbar />
        {
          isAuthenticated && <UserDial user={userInfo}  />
        }
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Property />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/users/appointments" element={<Appointment />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </>
  );
}
export const BASE_URL = "http://localhost:5000/api/v1/";
