import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";
import axios from "axios";
import { fetchAllProperty, fetchPropertyDetails } from "../Action/propertyAction";

const initialState = {
  properties: [],
  recomended_properties: [],
  property: {},
  loading: true,
  view: "grid",
  totalpropertycount: 0,
  error: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProperty.fulfilled, (state, { payload }) => {
        state.properties  = payload;
        state.loading = false;
      })
      .addCase(fetchAllProperty.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(fetchAllProperty.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRecomendendProperty.fulfilled, (state, action) => {
        state.recomended_properties = action.payload;
        state.loading = false;
      })
      .addCase(fetchRecomendendProperty.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(fetchTotalPropertyCount.fulfilled, (state, action) => {
        state.totalpropertycount = action.payload;
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
      });
  },
});


export const fetchRecomendendProperty = createAsyncThunk(
  "property/recomended/fetch",
  async ({ rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        auth_token: sessionStorage.getItem("token"),
      },
    };
    try {
      const resp = await axios.get(
        `${BASE_URL}/properties?recomended_property=true`,
        config
      );
      return resp.data.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchTotalPropertyCount = createAsyncThunk(
  "property/count",
  async ({ rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        auth_token: sessionStorage.getItem("token"),
      },
    };
    try {
      const resp = await axios.get(
        `${BASE_URL}/properties/total_Property_count`,
        config
      );
      return resp.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchTotalPropertyCount = createAsyncThunk('property/count', async()=> {
    
    const config = {
        headers: {
            'Content-Type': "application/json",
            'auth_token': sessionStorage.getItem('token')
        }
    }
    const resp = await axios.get(`${BASE_URL}/properties/total_Property_count`,config)
    return resp.data    
})

export const filterProperties = createAsyncThunk(
  "filter/properties",
  async ({ filters }) => {
    console.log(filters);
  }
);
export const { gridView, listView } = propertySlice.actions;

export default propertySlice.reducer;
