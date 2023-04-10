import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constants/constants";
import { Reward } from "../../types/type";

export const getReward = createAsyncThunk("reward/GetRewards", async () => {
  try {
    const response = await axios.get(`${apiUrl}/reward/get-reward`);
    return response.data.rewards;
  } catch (err) {
    return err;
  }
});

export const addReward = createAsyncThunk(
  "reward/AddRewards",
  async (newRewardManager: Reward) => {
    try {
      const response = await axios.post(
        `${apiUrl}/reward/create-reward`,
        newRewardManager
      );
      return response.data.reward;
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  }
);

export const findRewardById = createAsyncThunk(
  "reward/findRewardById",
  async (rewardId: string) => {
    try {
      const response = await axios.get(
        `${apiUrl}/reward/get-reward/${rewardId}`
      );

      console.log(response.data.rewards);
      return response.data.rewards;
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  }
);

export const deleteManagerReward = createAsyncThunk(
  "reward/deleteRewards",
  async (rewardId: string) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/reward/delete-reward/${rewardId}`
      );

      console.log(response.data.rewards);
      return response.data.rewards;
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  }
);
