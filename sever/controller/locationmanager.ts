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

export const findLocationById = async (req: Request, res: Response) => {
  try {
    const postFindCondition = { _id: req.params.id, user: req.userId };
    const findLocation = await locationManager.find(postFindCondition);

    // User not authorised or post not found
    if (!findLocation)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({ success: true, locations: findLocation });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};
// delete - location
export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedLocation = await locationManager.findOneAndDelete(
      postDeleteCondition
    );

    // User not authorised or post not found
    if (!deletedLocation)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({ success: true, locations: postDeleteCondition });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};
