import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../constants/constants";
import { setAuthToken } from "../../utils/setAuthToken";

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
    setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
  }
  // try {
  //   const response = await axios.get(`${apiUrl}/auth/check`);

  //   console.log(" response", response.data.success);
  //   return response.data;
  // } catch (error) {
  //   localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  //   setAuthToken(null);
  //   console.log(error);
  //   return error;
  // }
  const response = await axios.get(`${apiUrl}/auth/check`);
  if (response.data.success) {
    console.log(" response", response.data.success);
    return response.data;
  }
});

interface userForm {
  username: string;
  password: string;
}
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userForm: userForm, { dispatch }) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);

      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }
      await dispatch(loadUser());
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  }
);

interface registerForm {
  username: string;
  password: string;
  confirmPassword: string;
}
export const registerUser = createAsyncThunk(
  "auth/resgisterUser",
  async (userForm: registerForm, { dispatch }) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      console.log(response);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }
      await dispatch(loadUser());
      return response.data;
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  }
);
