import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import OTP from "@/models/Otp";
import { connectToDB } from "@/lib/connectDB";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/mail/sendVerificationEmail";


export async function POST(req) {
  try {
    await connectToDB();

    const {
      legalFirstName,
      middleName,
      legalLastName,
      username,
      email,
      phone,
      country,
      accountType,
      transactionPin,
      password,
    } = await req.json();

    if (
      !legalFirstName ||
      !legalLastName ||
      !username ||
      !email ||
      !phone ||
      !country ||
      !accountType ||
      !transactionPin ||
      !password
    ) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "Email or username already registered." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPin = await bcrypt.hash(transactionPin, 10);

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour

    // Create user
    const user = await User.create({
      userID: uuidv4(),
      legalFirstName,
      middleName,
      legalLastName,
      username,
      email,
      phone,
      country,
      accountType,
      transactionPin: hashedPin,
      password: hashedPassword,
      role: "user",
      isVerified: false,
      verificationToken,
      verificationTokenExpiry,
    });


   // Send verification email
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email/email-auth?verifyToken=${verificationToken}&id=${user._id}`;
    await sendVerificationEmail({
      to: user.email,
      name: user.legalFirstName,
      verificationUrl,
    });

    return NextResponse.json({ success: true, userId: user._id });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}