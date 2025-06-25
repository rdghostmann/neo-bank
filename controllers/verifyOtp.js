import User from "@/models/User";
import OTP from "@/models/Otp";
import { connectToDB } from "@/lib/connectDB";

export async function verifyOtp({ userId, email, otp }) {
  try {
    await connectToDB();

    if (!userId || !email || !otp) {
      return { success: false, message: "All fields are required." };
    }

    // Find user by _id and email
    const user = await User.findOne({ _id: userId, email });
    if (!user) {
      return { success: false, message: "User not found." };
    }

    // Find OTP for user
    const otpDoc = await OTP.findOne({ user: userId, code: otp });
    if (!otpDoc) {
      return { success: false, message: "Invalid OTP." };
    }

    // Check if OTP expired
    if (otpDoc.expiresAt < Date.now()) {
      return { success: false, message: "OTP has expired." };
    }

    // Mark user as verified
    user.isVerified = true;
    await user.save();

    // Remove OTP after successful verification
    await OTP.deleteOne({ _id: otpDoc._id });

     return { success: true, message: "OTP verified successfully." };
  } catch (error) {
    return { success: false, message: error.message || "Verification failed." };
  }
}