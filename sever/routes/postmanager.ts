import express from "express";
import {
  postmanager,
  getPost,
  findPostById,
  deletePost,
} from "../controller/postmanager";
const router = express.Router();
import { verifyToken } from "../middleware/auth";
// @route GET post/read-post
// @route POST post/create-post

// Get post
router.get("/get-manager", verifyToken, getPost);
// find post
router.get("/get-manager/:id", verifyToken, findPostById);
// post
router.post("/create-post", verifyToken, postmanager);
//delete post
router.delete("/delete-manager/:id", verifyToken, deletePost);
export default router;
