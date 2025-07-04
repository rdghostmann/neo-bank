import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectDB";
import EmailOtp from "@/models/EmailOtpSchema";

export async function POST(req) {
  try {
    await connectToDB();
    const { email, otp } = await req.json();

    const record = await EmailOtp.findOne({ email });
    if (!record) {
      return NextResponse.json({ success: false, message: "No OTP found for this email." }, { status: 404 });
    }
    if (record.verified) {
      return NextResponse.json({ success: true, message: "Email already verified." });
    }
    if (record.otp !== otp || Date.now() > record.otpExpiry) {
      return NextResponse.json({ success: false, message: "Invalid or expired OTP." }, { status: 400 });
    }

    record.verified = true;
    await record.save();

    return NextResponse.json({ success: true, message: "Email verified." });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}