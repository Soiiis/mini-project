import express from "express";
import { getLocation, postLocation } from "../controller/locationmanager";
const router = express.Router();
import { verifyToken } from "../middleware/auth";
// @route GET post/read-post
// @route POST post/create-post

// Get manager
router.get("/get-location", verifyToken, getLocation);
// post manager
router.post("/create-location", verifyToken, postLocation);

export default router;
