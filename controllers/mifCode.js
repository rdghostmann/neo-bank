"use server"

import { connectToDB } from "@/lib/connectDB"
import User from "@/models/User"

export async function verifyMifCode(userId, code) {
  await connectToDB()
  const user = await User.findById(userId)
  if (!user) return { success: false, message: "User not found" }
  if (user.mifCode && user.mifCode === code) {
    // Optionally clear the code after use
    user.mifCode = undefined
    await user.save()
    return { success: true }
  }
  return { success: false, message: "Invalid IMF Code" }
}