import mongoose, { Schema } from "mongoose";
// const AutoIncrement = require("mongoose-sequence")(mongoose);
export const PostManager = new Schema(
  {
    postId: { type: Number, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String },
    releaseDate: { type: Date, default: Date.now() },
    view: { type: Number, required: true },
    status: { type: Boolean, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  }
  // { _id: false }
);

// PostManager.plugin(AutoIncrement);
const postManager = mongoose.model("postManager", PostManager);
export default postManager;
