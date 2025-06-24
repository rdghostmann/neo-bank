import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import OTP from "@/models/Otp"; // Ensure this model exists
import { connectToDB } from "@/lib/connectDB";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    await connectToDB();

    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "Email already registered." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      userID: uuidv4(),
      username,
      email,
      password: hashedPassword,
      role: "user",
      isVerified: false,
    });

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to database
    await OTP.create({
      user: user._id,
      code: otpCode,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 mins expiry
    });

    // TODO: Send OTP via email (if needed)

    return NextResponse.json({ success: true, userId: user._id });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
