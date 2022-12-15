import mongoose, { Schema } from "mongoose";
export const RewardManager = new Schema({
  code: { type: Number },
  information: { type: String, required: true },
  imageUrl: { type: String },
  expired: { type: String, required: true },
  activeDate: { type: Date, default: Date.now() },
  status: { type: Boolean, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const rewardManager = mongoose.model("rewardManager", RewardManager);
export default rewardManager;
