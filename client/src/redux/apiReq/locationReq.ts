import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constants/constants";
import { Location } from "../../types/type";

export const getManagerLocations = createAsyncThunk(
  "locations/getlocations",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/location/get-location`);
      return response.data.locations;
    } catch (err) {
      return err;
    }
  }
);

export const addManagerLocation = createAsyncThunk(
  "locations/addLocations",
  async (newLocationManager: Location) => {
    try {
      const response = await axios.post(
        `${apiUrl}/location/create-location`,
        newLocationManager
      );

      console.log(response.data.locations);

      return response.data.locations;
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  }
);

export const findLocationById = createAsyncThunk(
  "locations/findLocationById",
  async (locationId: string) => {
    try {
      const response = await axios.get(
        `${apiUrl}/location/get-location/${locationId}`
      );

      console.log(response.data.locations);
      return response.data.locations;
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  }
);

export const deleteManagerLocation = createAsyncThunk(
  "locations/deleteLocations",
  async (locationId: string) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/location/delete-location/${locationId}`
      );

      console.log(response.data.locations);
      return response.data.locations;
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  }
);
