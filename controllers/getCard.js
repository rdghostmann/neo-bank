"use server";

import { connectToDB } from "@/lib/connectDB";
import Account from "@/models/Account";

// Get all accounts for a user and return as cards
export async function getCardsByUserId(userId) {
  if (!userId) return [];

  await connectToDB();

  // Find all accounts for the user and select needed fields
  const accounts = await Account.find({ user: userId })
    .select("type number balance color")
    .lean();

  // Format _id and return as cards
  return accounts.map(account => ({
    id: account._id.toString(),
    type: account.type,
    number: account.number,
    balance: account.balance,
    color: account.color,
  }));
}