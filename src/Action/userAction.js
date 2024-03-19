import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from "../App";

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ userData}, { rejectWithValue }) => {
      try {
        const {email , password } = userData
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const data = await axios.post(
          `${BASE_URL}/users/registerations`,
          { user: {email, password}},
          config
        )
        return data
      } catch (error) {
      // return custom error message from backend if present
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )


  export const userLogin = createAsyncThunk(
    'auth/login',
    async (user, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const { data } = await axios.post(
            `${BASE_URL}/users/sessions`,
          {user},
          config
        )
        // store user's token in local storage
        localStorage.setItem('userToken', data.data.auth_token)
        
        return data.data
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

  export const userLocation = createAsyncThunk('user/location', async ({latitude,longitude}, {rejectWithValue}) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const {data}  = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=5b638185a6f44e1991c42f86f42660b2`
      )       
      return data.features[0].properties
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  })

