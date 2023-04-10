import express from "express";
import {
  deleteLocation,
  findLocationById,
  getLocation,
  postLocation,
} from "../controller/locationmanager";
const router = express.Router();
import { verifyToken } from "../middleware/auth";
// @route GET post/read-post
// @route POST post/create-post

// Get location
router.get("/get-location", verifyToken, getLocation);
// find location
router.get("/get-location/:id", verifyToken, findLocationById);
// post location
router.post("/create-location", verifyToken, postLocation);
//delete location
router.delete("/delete-location/:id", verifyToken, deleteLocation);

export default router;
