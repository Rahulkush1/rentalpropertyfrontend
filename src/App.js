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
import { loadUser, setCredentials } from "./Slice/userSlice";
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

export default function App() {
  const dispatch = useDispatch()
  // const {userInfo} = useSelector(state => state.user)

  // const {data, isFetching} = useGetUserDetailsQuery('userDetails',{
  //   pollingInterval: 800000,
  // })
  // useEffect(()=>{
  //   if(data){
  //     dispatch(setCredentials(data))
  //     }
  // },[dispatch,data])
  const { userInfo, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 90000000,
  });
  const { data1, isloading } = useGetPropertiesQuery("properties", {
    pollingInterval: 90000000,
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

        {/* <UserDial  /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Property />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
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
