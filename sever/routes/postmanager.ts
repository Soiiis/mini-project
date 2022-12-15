import express from "express";
import { postmanager, getPost } from "../controller/postmanager";
const router = express.Router();
import { verifyToken } from "../middleware/auth";
// @route GET post/read-post
// @route POST post/create-post

// Get manager
router.get("/get-manager", verifyToken, getPost);
// post manager
router.post("/create-post", verifyToken, postmanager);

export default router;
