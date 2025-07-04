import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectDB";
import User from "@/models/User";
import { sendResetPasswordEmail } from "@/lib/mail/sendResetPasswordEmail";

export async function POST(req) {
  try {
    await connectToDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found with this email." }, { status: 404 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 4 * 60 * 1000); // ✅ 4 minutes = 4 * 60 * 1000 ms

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP
    await sendResetPasswordEmail({ to: email, otp });

    return NextResponse.json({ success: true, message: "Reset code sent to your email." });
  } catch (error) {
    console.error("SEND RESET OTP ERROR:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
