import User from "@/models/User";
import { connectToDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { NextResponse } from "next/server";
import EmailOtp from "@/models/EmailOtpSchema";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();

    const {
      legalFirstName,
      middleName,
      legalLastName,
      username,
      email,
      country,
      accountType,
      transactionPin,
      password,
    } = body;

    // Validate required fields
    if (
      !legalFirstName ||
      !middleName ||
      !legalLastName ||
      !username ||
      !email ||
      !country ||
      !accountType ||
      !transactionPin ||
      !password
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled." },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email or username already exists." },
        { status: 409 }
      );
    }

    // Check if email is verified in EmailOtp
    const otpRecord = await EmailOtp.findOne({ email });
    if (!otpRecord || !otpRecord.verified) {
      return NextResponse.json(
        { success: false, message: "Email not verified. Please verify your email before registering." },
        { status: 400 }
      );
    }

    // Hash password and pin
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPin = await bcrypt.hash(transactionPin, 10);

    // Generate verification token (for admin activation or future use)
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour

    // Create user with status inactive and isVerified true
    const user = await User.create({
      legalFirstName,
      middleName,
      legalLastName,
      username,
      email,
      country,
      accountType,
      transactionPin: hashedPin,
      password: hashedPassword,
      role: "user",
      isVerified: true, // Already verified via OTP
      verificationToken,
      verificationTokenExpiry,
      status: "inactive", // Pending admin approval
    });

    // Delete OTP record after successful registration
    await EmailOtp.deleteOne({ email });

    return NextResponse.json({
      success: true,
      message: "Registration successful! Your account is pending admin approval.",
      userId: user._id,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Registration failed." },
      { status: 500 }
    );
  }
}