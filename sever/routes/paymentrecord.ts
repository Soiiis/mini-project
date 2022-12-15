import express from "express";
import { getPayment, postPayment } from "../controller/paymentrecord";
const router = express.Router();
import { verifyToken } from "../middleware/auth";
// @route GET post/read-post
// @route POST post/create-post

// Get manager
router.get("/get-payment", verifyToken, getPayment);
// post manager
router.post("/create-payment", verifyToken, postPayment);

export default router;
