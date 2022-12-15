require("dotenv").config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import authRoute from "./routes/auth";
import postManagerRoute from "./routes/postmanager";
import locationManagerRoute from "./routes/locationmanager";
import paymentRecordRoute from "./routes/paymentrecord";
import rewardManagerRoute from "./routes/rewardmanager";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mini-project.hiz1y8a.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
declare global {
  namespace Express {
    interface Request {
      userId: String;
    }
  }
}
app.use("/auth", authRoute);
app.use("/post", postManagerRoute);
app.use("/location", locationManagerRoute);
app.use("/payment", paymentRecordRoute);
app.use("/reward", rewardManagerRoute);

const PORT = 5000;

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));
