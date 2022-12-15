import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  let decoded: { userId: String; iat: Number };
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });
  }
  try {
    decoded = <any>jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};
