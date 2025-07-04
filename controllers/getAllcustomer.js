// controllers/getAllUsers.js
"use server";

import { connectToDB } from "@/lib/connectDB";
import User from "@/models/User";

export async function getAllcustomer() {
  await connectToDB();

  const users = await User.find().lean();

  return users.map((user) => ({
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    phone: user.phone ?? "N/A",
    status: user.status,
    kycStatus: user.kycStatus ?? "pending",
    balance: user.balance,
    joinDate: user.createdAt?.toISOString().split("T")[0] ?? "",
    lastLogin: user.lastLogin ?? "N/A",
    accountType: user.accountType,
    avatar: user.avatar ?? "/placeholder.svg",
  }));
}
