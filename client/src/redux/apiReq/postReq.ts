import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constants/constants";
import { Post } from "../../types/type";

export const getManagerPosts = createAsyncThunk("post/getPosts", async () => {
  try {
    const response = await axios.get(`${apiUrl}/post/get-manager`);
    // if (response.data.success) {
    //     dispatch({ type: 'POSTS_LOAD_SUCCESS', payload: response.data.posts })
    //     console.log('Created Post Successfully')
    // }
    console.log(response.data);

    return response.data.posts;
  } catch (err) {
    // dispatch({ type: 'POSTS_LOAD_ERROR' })
    return err;
  }
});

export const addManagerPost = createAsyncThunk(
  "post/addPosts",
  async (newPostManager: Post) => {
    try {
      const response = await axios.post(
        `${apiUrl}/post/create-post`,
        newPostManager
      );
      // if (response.data.success) {
      //     dispatch({ type: 'ADD_POST_MANAGER', payload: response.data.post })
      //     return response.data
      // }

      return response.data.post;
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  }
);

export const findPostById = createAsyncThunk(
  "posts/findPostById",
  async (postId: string) => {
    try {
      const response = await axios.get(`${apiUrl}/post/get-manager/${postId}`);

      console.log(response.data.post);
      return response.data.post;
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  }
);

export const deleteManagerpost = createAsyncThunk(
  "posts/deleteposts",
  async (postId: string) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/post/delete-manager/${postId}`
      );

      console.log(response.data.post);
      return response.data.post;
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  }
);
