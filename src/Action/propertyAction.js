import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";
import { useSelector } from "react-redux";

export const fetchAllProperty = createAsyncThunk(
  "property/all/fetch",
  async (pagination, { rejectWithValue }) => {
    console.log(pagination);
    // const { userToken } = useSelector((state) => state.user);
    // console.log(userToken)
    const config = {
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem("userToken"),
      },
    };
    try {
      const resp = await axios.get(
        `${BASE_URL}/properties?page=${pagination.page}&perPage=${pagination.perPage}`,
        config
      );

      return resp.data.data;
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
