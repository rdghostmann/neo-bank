import mongoose from "mongoose";

const EmailOtpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    otpExpiry: { type: Date, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const EmailOtp = mongoose.models?.EmailOtp || mongoose.model("EmailOtp", EmailOtpSchema);
export default EmailOtp;

