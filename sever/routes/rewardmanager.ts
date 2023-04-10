import express from "express";
import {
  postReward,
  getReward,
  findRewardById,
  deleteReward,
} from "../controller/rewardmanager";
const router = express.Router();
import { verifyToken } from "../middleware/auth";
// @route GET post/read-post
// @route POST post/create-post

// Get reward
router.get("/get-reward", verifyToken, getReward);
// find reward
router.get("/get-reward/:id", verifyToken, findRewardById);
// post reward
router.post("/create-reward", verifyToken, postReward);
//delete reward
router.delete("/delete-reward/:id", verifyToken, deleteReward);

export default router;
