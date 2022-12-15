import mongoose, { Schema } from "mongoose";
// const AutoIncrement = require("mongoose-sequence")(mongoose);
export const PaymentRecord = new Schema(
  {
    logId: { type: Number },
    title: { type: String, required: true },
    imageUrl: { type: String },
    moneyUsed: { type: Number, required: true },
    usedDate: { type: Date, default: Date.now() },
    status: { type: Boolean, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  }
  //   { _id: false }
);

// PaymentRecord.plugin(AutoIncrement);
const paymentRecord = mongoose.model("paymentRecord", PaymentRecord);
export default paymentRecord;
