// app/actions/getBalance.js or wherever you keep server functions
"use server";

import { connectToDB } from "@/lib/connectDB";
import User from "@/models/User";

export async function getBalance(userId) {
  if (!userId) return 0;

  await connectToDB();

  const user = await User.findById(userId).lean();

  if (!user) return 0;

  return user.balance || 0;
}
