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
  const { postId, title, imageUrl, view, status } = req.body;

  // validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Missing something" });
  }
  // if (!accessToken) {
  //   res.status(500).json({ success: false, message: "Internal sever err" });
  // }
  try {
    const newPost = new postManager({
      postId,
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

export const findPostById = async (req: Request, res: Response) => {
  try {
    const postFindCondition = { _id: req.params.id, user: req.userId };
    const findPost = await postManager.find(postFindCondition);

    // User not authorised or post not found
    if (!findPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({ success: true, post: findPost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};
// delete - post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await postManager.findOneAndDelete(postDeleteCondition);

    // User not authorised or post not found
    if (!deletedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({ success: true, post: postDeleteCondition });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};
