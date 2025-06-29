import { connectToDB } from "@/lib/connectDB"
import User from "@/models/User"
import bcrypt from "bcrypt"

export async function POST(req) {
  try {
    await connectToDB()

    const { email, otp, newPassword } = await req.json()

    // Validate inputs
    if (!email || !otp || !newPassword) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), {
        status: 400,
      })
    }

    // Find user with email
    const user = await User.findOne({ email }).select("+otp +otpExpiry")
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      })
    }

    // Check OTP
    if (user.otp !== otp) {
      return new Response(JSON.stringify({ message: "Invalid reset code" }), {
        status: 400,
      })
    }

    // Check expiry
    const now = new Date()
    if (user.otpExpiry < now) {
      return new Response(JSON.stringify({ message: "Reset code expired" }), {
        status: 400,
      })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update user
    user.password = hashedPassword
    user.otp = null
    user.otpExpiry = null
    await user.save()

    return new Response(JSON.stringify({ message: "Password updated successfully" }), {
      status: 200,
    })
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error)
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 })
  }
}
