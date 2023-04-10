import { Request, Response } from "express";
import rewardManager from "../models/RewardManager";

export const getReward = async (req: Request, res: Response) => {
  try {
    const rewards = await rewardManager
      .find({ user: req.userId })
      .populate("user", ["username"]);
    res.json({ success: true, rewards });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};

export const postReward = async (req: any, res: Response) => {
  const { code, information, imageUrl, expired, activeDate, status } = req.body;

  // validation
  if (!code || !imageUrl || !expired) {
    return res
      .status(400)
      .json({ success: false, message: "Missing something" });
  }
  try {
    const newReward = new rewardManager({
      code,
      information,
      imageUrl,
      expired,
      activeDate,
      status,
      user: req.userId,
    });
    await newReward.save();

    res.json({
      success: true,
      message: "Created reward successfully",
      reward: newReward,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};

export const findRewardById = async (req: Request, res: Response) => {
  try {
    const postFindCondition = { _id: req.params.id, user: req.userId };
    const findReward = await rewardManager.find(postFindCondition);

    // User not authorised or post not found
    if (!findReward)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({ success: true, rewards: findReward });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};
// delete - post
export const deleteReward = async (req: Request, res: Response) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedReward = await rewardManager.findOneAndDelete(
      postDeleteCondition
    );

    // User not authorised or post not found
    if (!deletedReward)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({ success: true, rewards: postDeleteCondition });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};
