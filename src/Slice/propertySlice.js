import { createSlice } from "@reduxjs/toolkit";
import {
  CreatePropertyReview,
  fetchAllProperty,
  fetchPropertyDetails,
  fetchRecomendendProperty,
} from "../Action/propertyAction";

const initialState = {
  properties: [],
  property: {},
  loading: false,
  view: "grid",
  totalpropertycount: 0,
  error: null,
  recomdend: null,
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
    setProperty: (state, { payload }) => {
      state.loading = false;
      state.properties = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyDetails.fulfilled, (state, { payload }) => {
        state.property = payload;
        state.loading = false;
      })
      .addCase(fetchPropertyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(fetchAllProperty.fulfilled, (state, { payload }) => {
        state.properties = payload.properties.data;
        state.loading = false;
        state.totalpropertycount = payload.total_property_count;
      })
      .addCase(fetchAllProperty.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(fetchAllProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecomendendProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecomendendProperty.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.recomdend = payload;
        state.error = null;
      })
      .addCase(fetchRecomendendProperty.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(CreatePropertyReview.pending, (state)=>{
        state.loading  = true;
        state.error = null;
      })
      .addCase(CreatePropertyReview.fulfilled, (state,{payload}) => {
        state.loading = false;
        state.error  = null;
        
      })
      .addCase(CreatePropertyReview.rejected, (state,{payload}) => {
        state.loading = false;
        state.error = payload
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

export const { gridView, listView, setProperty } = propertySlice.actions;

export default propertySlice.reducer;
