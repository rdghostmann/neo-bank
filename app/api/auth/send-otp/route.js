import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDB } from "@/lib/connectDB";
import { sendVerificationEmail } from "@/lib/mail/sendVerificationEmail";
import EmailOtp from "@/models/EmailOtpSchema";

export async function POST(req) {
  try {
    await connectToDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "Email already registered." }, { status: 409 });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 4 * 60 * 1000); // ✅ 4 minutes = 4 * 60 * 1000 ms



    // Upsert OTP in EmailOtp collection
    await EmailOtp.findOneAndUpdate(
      { email },
      { otp, otpExpiry, verified: false },
      { upsert: true, new: true }
    );

    // Send OTP email
    await sendVerificationEmail({ to: email, otp });

    return NextResponse.json({ success: true, message: "OTP sent to email." });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}