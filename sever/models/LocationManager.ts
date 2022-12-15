import mongoose, { Schema } from "mongoose";
// const AutoIncrement = require("mongoose-sequence")(mongoose);
export const LocationManager = new Schema(
  {
    addressId: { type: Number, required: true },
    address: { type: String, required: true },
    imageUrl: { type: String },
    location: { type: String, required: true },
    releaseDate: { type: Date, default: Date.now() },
    status: { type: Boolean, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  }
  // { _id: false }
);

// LocationManager.plugin(AutoIncrement);
const locationManager = mongoose.model("locationManager", LocationManager);
export default locationManager;
