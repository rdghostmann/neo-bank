// app/api/verify-otp/route.js
import { connectToDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";
import Otp from "@/models/Otp";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectToDB();
    const { email, otp } = await req.json();

    const record = await Otp.findOne({ email });
    if (!record) return Response.json({ success: false, message: "OTP not found or expired." }, { status: 400 });

    const valid = await bcrypt.compare(otp, record.otp);
    if (!valid) return Response.json({ success: false, message: "Invalid OTP." }, { status: 401 });

    // Mark user as verified
    await User.findOneAndUpdate({ email }, { isVerified: true });

    // Delete OTP after use
    await Otp.deleteOne({ _id: record._id });

    return Response.json({ success: true, message: "Email verified successfully!" });
  } catch (err) {
    console.error("OTP Verification Error:", err);
    return Response.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
