require("dotenv").config();
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import User from "../models/User";

//check login

export const check = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};
// Register
export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  var regex = /^[A-Za-z0-9 ]+$/;
  var isvalid = regex.test(username);
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: " Missing username and/or password" });
  if (password.length < 6)
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters.",
    });
  if (username.length < 6) {
    return res.status(404).json({
      success: false,
      message: "Username must be at least 6 characters",
    });
  }
  if (!isvalid) {
    return res.status(404).json({
      success: false,
      message: "Username not includes the special character",
      // message: "Oke",
    });
  }
  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: " User already exists" });
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    // return token
    const accessToken = <any>(
      jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET as string
      )
    );
    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};

//Login
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: " Missing username and/or password" });
  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });
    }
    // User name found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });
    }

    // valid true
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET as string
    );
    res.json({
      success: true,
      message: "Login successfully",
      accessToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal sever err" });
  }
};
