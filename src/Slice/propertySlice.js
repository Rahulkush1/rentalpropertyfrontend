import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";
import axios from "axios";
import { fetchAllProperty, fetchPropertyDetails, fetchRecomendendProperty, filterProperties } from "../Action/propertyAction";

const initialState = {
  properties: [],
  property: {},
  loading: true,
  view: "grid",
  totalpropertycount: 0,
  error: null,
  recomdend: null,
  filterProperty: null,
};

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    gridView(state) {
      state.view = "grid";
    },
    listView(state) {
      state.view = "list";
    },
    setProperty: (state,{payload}) => {
        state.loading  = false;
        state.properties = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProperty.fulfilled, (state, { payload }) => {
        state.properties  = payload.properties.data;
        state.loading = false;
        state.totalpropertycount = payload.total_property_count
      })
      .addCase(fetchAllProperty.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(fetchAllProperty.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPropertyDetails.fulfilled, (state, {payload}) => {
        state.property = payload;
        state.loading = false;
      })
      .addCase(fetchPropertyDetails.pending, (state, {payload}) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyDetails.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(fetchRecomendendProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecomendendProperty.fulfilled,(state, {payload}) => {
        state.loading = false;
        state.recomdend = payload;
        state.error = null;
      })
      .addCase(fetchRecomendendProperty.rejected,(state,{payload})=>{
        state.loading = false;
        state.error = payload;
      })
      .addCase(filterProperties.pending,(state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterProperties.fulfilled,(state, {payload}) => {
        console.log(payload)
        state.loading = false;
        state.filterProperty = payload;
        state.error = null;
      })
      .addCase(filterProperties.rejected, (state,{payload}) => {
        state.error = payload;
        state.loading = false;
      })
  },
});


// export const fetchTotalPropertyCount = createAsyncThunk('property/count', async()=> {
    
//     const config = {
//         headers: {
//             'Content-Type': "application/json",
//             'auth_token': sessionStorage.getItem('token')
//         }
//     }
//     const resp = await axios.get(`${BASE_URL}/properties/total_Property_count`,config)
//     return resp.data    
// })
  

export const { gridView, listView,setProperty } = propertySlice.actions;

export default propertySlice.reducer;
