import { Request, Response } from "express";
import postManager, { PostManager } from "../models/PostManager";

export const getPost = async (req: Request, res: Response) => {
  try {
    const posts = await postManager
      .find({ user: req.userId })
      .populate("user", ["username"]);
    res.json({ success: true, posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};

export const postmanager = async (req: any, res: Response) => {
  const { _id, title, imageUrl, view, status } = req.body;

  // validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Missing something" });
  }
  try {
    const newPost = new postManager({
      _id,
      title,
      imageUrl,
      view,
      status,
      user: req.userId,
    });
    await newPost.save();

    res.json({
      success: true,
      message: "Created post successfully",
      post: newPost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};
