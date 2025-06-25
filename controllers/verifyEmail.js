import User from "@/models/User";
import { connectToDB } from "@/lib/connectDB";

export async function verifyEmail({ verificationToken, userId }) {
  await connectToDB();
  const user = await User.findOne({
    _id: userId,
    verificationToken,
    verificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return { success: false, message: "Invalid or expired verification link." };
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;
  await user.save();

  return { success: true };
}