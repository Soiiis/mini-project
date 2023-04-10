import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./slice/authSlice";
import postReducer from "./slice/postSlice";
import locationReducer from "./slice/locationSlice";
import paymentReducer from "./slice/paymentSlice";
import rewardReducer from "./slice/rewardSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    postReducer,
    locationReducer,
    paymentReducer,
    rewardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
