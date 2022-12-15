import { Request, Response } from "express";
import paymentRecord from "../models/PaymentRecord";

export const getPayment = async (req: Request, res: Response) => {
  try {
    const payments = await paymentRecord
      .find({ user: req.userId })
      .populate("user", ["username"]);
    res.json({ success: true, payments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};

export const postPayment = async (req: any, res: Response) => {
  const { logId, title, imageUrl, moneyUsed, usedDate, status } = req.body;

  // validation
  if (!title || !imageUrl || !moneyUsed) {
    return res
      .status(400)
      .json({ success: false, message: "Missing something" });
  }
  try {
    const newPayment = new paymentRecord({
      logId,
      title,
      imageUrl,
      moneyUsed,
      usedDate,
      status,
      user: req.userId,
    });
    await newPayment.save();

    res.json({
      success: true,
      message: "Created payment successfully",
      payment: newPayment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};
