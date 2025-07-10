"use server"

import { connectToDB } from "@/lib/connectDB"
import User from "@/models/User"

export async function generateAndSaveMifCode(userId) {
  await connectToDB
  // Generate a random 8-character alphanumeric code
  const mifCode = "MIF" + Math.random().toString(36).substring(2, 10).toUpperCase()
  await User.findByIdAndUpdate(userId, { mifCode })
  return mifCode
}

export async function getUserMifCode(userId) {
  await dbConnect()
  const user = await User.findById(userId)
  return user?.mifCode || ""
}

// export async function verifyMifCode(userId, code) {
//   await dbConnect()
//   const user = await User.findById(userId)
//   if (!user) return { success: false, message: "User not found" }
//   if (user.mifCode && user.mifCode === code) {
//     // Optionally clear the code after use
//     user.mifCode = undefined
//     await user.save()
//     return { success: true }
//   }
//   return { success: false, message: "Invalid IMF Code" }
// }