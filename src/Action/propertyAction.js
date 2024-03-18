import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";
import { useSelector } from "react-redux";

export const fetchAllProperty = createAsyncThunk(
  "property/all/fetch",
  async (filter, { rejectWithValue }) => {
    console.log(filter)
    const {keyword = "", page,sort_option, min_price, max_price } = filter
    const config = {
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem("userToken"),
      },
    };
    try {
      const resp = await axios.get(
        `${BASE_URL}/properties?keyword=${keyword}&sort_option=${sort_option}&min_price=${min_price}&max_price=${max_price}&page=${page}`,
        config
      );

      return resp.data;
    } catch (error) {
      console.log(error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchPropertyDetails = createAsyncThunk(
  "fetch/propertyDetails",
  async (id, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem("userToken"),
      },
    };
    try {
      const resp = await axios.get(
        `${BASE_URL}/properties/property_detail?id=${id}`,
        config
      );
      return resp.data.data.attributes;
    } catch (error) {
      console.log(error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchRecomendendProperty = createAsyncThunk(
  "fetch/recomanded/properties",
  async (id, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem("userToken"),
      },
    };
    try {
      const resp = await axios.get(
        `${BASE_URL}/properties?recomended_property=true`,
        config
      );
      return resp.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const filterProperties = createAsyncThunk(
  "filter/properties",
  async (filter , {rejectWithValue}) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem("userToken"),
      },
    };
    try {

      const {sort_option, min_price, max_price, prop_type} = filter
        const resp = await axios.get(
          `${BASE_URL}/properties/filter_property?sort_option=${sort_option}&min_price=${min_price}&max_price=${max_price}`,
          config
        );
        console.log(resp.data)
      return resp.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
