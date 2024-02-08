import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../App";



const initialState = {
    userdetail: [],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    isAuthenticated: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchUser.pending,(state,action)=>{
            state.loading = 'pending'
            state.isAuthenticated = false
        })  
       .addCase(fetchUser.fulfilled,(state,action)=>{
            state.userdetail.push(action.payload)
            state.loading = 'succeeded'
            state.isAuthenticated = true
            sessionStorage.setItem('token', action.payload.data['auth_token'])
            sessionStorage.setItem('authenticated', true)

        })
        .addCase(fetchUser.rejected, (state,action)=> {
            state.loading = 'rejected'

        }).addCase(loadUser.fulfilled,(state,action)=> {
            state.userdetail.push(action.payload)
            state.loading = 'succeeded'
            state.isAuthenticated = true
        })
        .addCase(loadUser.rejected,(state,action) => {

        })
    }
})

export  const fetchUser = createAsyncThunk('users/fetch', async (user) => {
    const resp = await axios.post(`${BASE_URL}/users/sessions`, {user},{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return resp.data
})

export const loadUser = createAsyncThunk('user/me', async (token) => {
    const config = {
        headers: {
            'Content-Type': "application/json",
            'auth_token': token
        }
    }
    const resp = await axios.get(`${BASE_URL}/users/sessions`,config)
    return resp.data
})
// export const {} = userSlice.actions;
export default userSlice.reducer;