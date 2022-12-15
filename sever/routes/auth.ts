import express, { Request, Response } from "express";
import { register, login, check } from "../controller/auth";
import { verifyToken } from "../middleware/auth";
const router = express.Router();
// check logins
router.get("/check", verifyToken, check);
// @route POST auth/register
// @desc Register user
// @access public

router.post("/register", register);

// Login

router.post("/login", login);

export default router;
