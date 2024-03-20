import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";

export const fetchAllProperty = createAsyncThunk(
  "property/all/fetch",
  async (filter, { rejectWithValue }) => {
    console.log(filter);
    const {
      keyword = "",
      page,
      sort_option,
      min_price,
      max_price,
      prop_type,
      posted,
      rating,
    } = filter;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const resp = await axios.get(
        `${BASE_URL}/properties?keyword=${keyword}&sort_option=${sort_option}&min_price=${min_price}&max_price=${max_price}&page=${page}&prop_type=${prop_type}&posted=${posted}&rating=${rating}`,
        config
      );

      return resp.data;
    } catch (error) {
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
  async (city, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const resp = await axios.get(
        `${BASE_URL}/properties?recomended_property=true&user_city=${city}`,
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

export const CreatePropertyReview = createAsyncThunk(
  "create/property/review",
  async (reviews, { rejectWithValue }) => {
    const {id, review, rating} = reviews
    const config = {
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem("userToken"),
      },
    };
    try {
      const { data } = await axios.post(
        `${BASE_URL}/reviews?property_id=${id}`,
        {review: {review, rating}},
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
