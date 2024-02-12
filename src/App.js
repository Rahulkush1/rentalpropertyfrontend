import React, { useEffect } from 'react'
import Footer from './component/Footer/Footer'
import Navbar from './component/Navbar/Navbar'
import Home from './component/Home/Home'
import { RouterProvider } from 'react-router-dom'
import SignUp from './component/Authentication/Signup'
import { createBrowserRouter } from 'react-router-dom';
import "./App.css"
import Login from './component/Authentication/Login'
import store from './store'
import { loadUser } from './Slice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Property from './component/Property/Property'
import PropertyDetails from './component/Property/PropertyDetails'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/properties',
    element: <Property />
  },
  {
    path: '/properties/:id',
    element: <PropertyDetails />
  }

])

export default function App() {
 
  const dispatch = useDispatch()
  const token = sessionStorage.getItem('token')
  useEffect(()=>{
    if (sessionStorage.getItem('authenticated')){
      dispatch(loadUser(token))
    }
  },[token])
  
  return (
    <>
    
        <Navbar /> 
        <RouterProvider router={router} />
        <Footer />

    </>
  )
}
export const BASE_URL = 'http://localhost:5000/api/v1/';