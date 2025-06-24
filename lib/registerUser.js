"use server";

import { connectToDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import User from "@/models/User";
import Account from "@/models/Account";
import Otp from "@/models/Otp";
import { sendMagicLink } from "@/lib/sendEmail";

// Email template
const verificationEmailTemplate = (verificationLink, otp) => `
  <html>
  <body style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>Verify Your Email</h2>
    <p>Click the button below to verify your email address and complete your registration.</p>
    <p>Your OTP is: <strong>${otp}</strong></p>
    <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Verify Email</a>
    <p style="color: #999;">This link will expire in 10 minutes.</p>
  </body>
  </html>
`;

export async function registerUser({ username, email, password }) {
  try {
    await connectToDB();

    // Input validation
    if (!username || !email || !password) {
      return { success: false, message: "All fields are required." };
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) return { success: false, message: "User already exists." };

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userID = uuidv4();

    // Generate verification token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    const tokenExpiry = Date.now() + 10 * 60 * 1000;

    // Create user
    const newUser = await User.create({
      userID,
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken: hashedToken,
      verificationTokenExpiry: tokenExpiry,
    });

    // Generate 10-digit account number
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    // Create default account (e.g. Checking)
    await Account.create({
      user: newUser._id,
      type: "Checking",
      number: accountNumber,
      balance: 0,
      availableBalance: 0,
      expiryDate: "12/30",
      cvv: Math.floor(100 + Math.random() * 900).toString(),
      openedDate: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
    });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await Otp.create({
      userId: newUser._id,
      email,
      otp: hashedOtp,
    });

    // Send email
    const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify-email?verifyToken=${rawToken}&id=${newUser._id}`;
    const emailBody = verificationEmailTemplate(verificationLink, otp);

    await sendMagicLink(email, "Email Verification", emailBody);

    return {
      success: true,
      message: "Registration successful! Please check your email to verify your account.",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
