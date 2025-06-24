// models/Otp.js
import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true, // Hashed OTP
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // 10 minutes auto-delete
  },
});

const Otp = mongoose.models.Otp || mongoose.model("Otp", OtpSchema);
export default Otp;
