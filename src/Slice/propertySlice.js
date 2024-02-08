import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../App"
import axios from "axios"
import userSlice from "./userSlice"

 

const initialState = {
    properties: [],
    recomended_properties: [],
    loading: true,
    view: "grid"
}

const propertySlice = createSlice({
    name: "properties",
    initialState,
    reducers:{
        gridView(state) {
            state.view = "grid"
        },
        listView(state){
            state.view = "list"
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProperty.fulfilled,(state,action) => {
            state.properties = action.payload
            state.loading = false
        })
        .addCase(fetchAllProperty.rejected,(state,action) => {
            state.loading = true
        })
        .addCase(fetchRecomendendProperty.fulfilled,(state,action) => {
            state.recomended_properties = action.payload
            state.loading = false
        })
        .addCase(fetchRecomendendProperty.rejected,(state,action) => {
            state.loading = true
        })
    }
})

export const fetchAllProperty = createAsyncThunk('property/all/fetch', async (pagination) => {
    const config = {
        headers: {
            'Content-Type': "application/json",
            'auth_token': sessionStorage.getItem('token')
        }
    }
    const resp = await axios.get(`${BASE_URL}/properties?page=${pagination.page}&perPage=${pagination.perPage}`,config)
    return resp.data.data
})


export const fetchRecomendendProperty = createAsyncThunk('property/recomended/fetch', async () => {
    const config = {
        headers: {
            'Content-Type': "application/json",
            'auth_token': sessionStorage.getItem('token')
        }
    }
    const resp = await axios.get(`${BASE_URL}/properties?recomended_property=true`,config)
    return resp.data.data
})

export const  {gridView, listView}  = propertySlice.actions

export default propertySlice.reducer