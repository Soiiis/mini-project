import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constants/constants";
import { Payment } from "../../types/type";

export const getPayment = createAsyncThunk("payment/Getpayments", async () => {
  try {
    const response = await axios.get(`${apiUrl}/payment/get-payment`);
    return response.data.payments;
  } catch (err) {
    return err;
  }
});

export const addPayment = createAsyncThunk(
  "payment/AddPayments",
  async (newPaymentManager: Payment) => {
    try {
      const response = await axios.post(
        `${apiUrl}/payment/create-payment`,
        newPaymentManager
      );
      return response.data.payment;
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  }
);

export const findPaymentById = createAsyncThunk(
  "payments/findPaymentById",
  async (paymentId: string) => {
    try {
      const response = await axios.get(
        `${apiUrl}/payment/get-payment/${paymentId}`
      );

      console.log(response.data.payments);
      return response.data.payments;
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  }
);

export const deletePayment = createAsyncThunk(
  "payments/deletePayments",
  async (paymentId: string) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/payment/delete-payment/${paymentId}`
      );

      console.log(response.data.payments);
      return response.data.payments;
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  }
);
