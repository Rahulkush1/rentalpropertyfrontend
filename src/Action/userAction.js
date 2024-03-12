import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from "../App";

// export const registerUser = createAsyncThunk(
//     'auth/register',
//     async ({ firstName, email, password }, { rejectWithValue }) => {
//       try {
//         const config = {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//         await axios.post(
//           `${BASE_URL}/api/user/register`,
//           { firstName, email, password },
//           config
//         )
//       } catch (error) {
//       // return custom error message from backend if present
//         if (error.response && error.response.data.message) {
//           return rejectWithValue(error.response.data.message)
//         } else {
//           return rejectWithValue(error.message)
//         }
//       }
//     }
//   )


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