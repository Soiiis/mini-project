import express from "express";
import { postReward, getReward } from "../controller/rewardmanager";
const router = express.Router();
import { verifyToken } from "../middleware/auth";
// @route GET post/read-post
// @route POST post/create-post

// Get manager
router.get("/get-reward", verifyToken, getReward);
// post manager
router.post("/create-reward", verifyToken, postReward);

export default router;
