"use server";

import { NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/User";
import { connectToDB } from "@/lib/connectDB";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const verificationToken = searchParams.get("verifyToken");
  const userId = searchParams.get("id");

  const result = await verifyEmail({ verificationToken, userId });

  return NextResponse.json(
    {
      verified: result.success,
      message: result.message,
    },
    { status: result.success ? 200 : 400 }
  );
}

// Helper function to verify email
async function verifyEmail({ verificationToken, userId }) {
  try {
    await connectToDB();

    if (!verificationToken || !userId) {
      return { success: false, message: "Invalid verification link." };
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    const user = await User.findOne({
      _id: userId,
      verificationToken: hashedToken,
      verificationTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return {
        success: false,
        message: "Verification token is invalid or expired.",
      };
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;

    await user.save();

    return { success: true, message: "Email verified successfully!" };
  } catch (error) {
    console.error("Verification Error:", error);
    return {
      success: false,
      message: "Something went wrong while verifying the email.",
    };
  }
}
