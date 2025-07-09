"use server"

import { connectToDB } from "@/lib/connectDB"
import User from "@/models/User"

export async function addCustomer(formData) {
  await connectToDB()
  try {
    const user = await User.create({
      legalFirstName: formData.legalFirstName,
      middleName: formData.middleName,
      legalLastName: formData.legalLastName,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      accountType: formData.accountType,
      balance: 0.0,
      joinDate: Date.now(),
      role: "admin",
      status: "active",
      isVerified: true,
      password: "changeme123", // Set a secure password or handle properly
      transactionPin: "0000",  // Set a secure pin or handle properly
    })
    return { success: true }
  } catch (error) {
    return { success: false, message: error.message }
  }
}