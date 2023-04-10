import express from "express";
import {
  deletePayment,
  findPaymentById,
  getPayment,
  postPayment,
} from "../controller/paymentrecord";
const router = express.Router();
import { verifyToken } from "../middleware/auth";
// @route GET post/read-post
// @route POST post/create-post

// Get payment
router.get("/get-payment", verifyToken, getPayment);
// find payment
router.get("/get-payment/:id", verifyToken, findPaymentById);
// post payment
router.post("/create-payment", verifyToken, postPayment);
//delete payment
router.delete("/delete-payment/:id", verifyToken, deletePayment);

export default router;
