import { Request, Response } from "express";
import locationManager from "../models/LocationManager";

export const getLocation = async (req: Request, res: Response) => {
  try {
    const locations = await locationManager
      .find({ user: req.userId })
      .populate("user", ["username"]);
    res.json({ success: true, locations });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};

export const postLocation = async (req: any, res: Response) => {
  const { addressId, address, imageUrl, location, status } = req.body;

  // validation
  if (!address || !imageUrl || !location) {
    return res
      .status(400)
      .json({ success: false, message: "Missing something" });
  }
  try {
    const newLocation = new locationManager({
      addressId,
      address,
      imageUrl,
      location,
      status,
      user: req.userId,
    });
    await newLocation.save();

    res.json({
      success: true,
      message: "Created post successfully",
      locations: newLocation,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};
