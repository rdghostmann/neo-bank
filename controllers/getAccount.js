"use server";

import { connectToDB } from "@/lib/connectDB";
import Account from "@/models/Account";

// Get all accounts for a user 
export async function getAccountByUserId(userId) {
  if (!userId) return [];

  await connectToDB();

  // Find all accounts for the user and select needed fields
  const accounts = await Account.find({ user: userId })
    .select("type number balance color availableBalance status expiryDate cvv interestRate openedDate creditLimit paymentDue minimumPayment transactions")
    .lean();

  // Format _id 
  return accounts.map(account => ({
    id: account._id.toString(),
    type: account.type,
    number: account.number,
    balance: account.balance,
    availableBalance: account.availableBalance,
    color: account.color,
    status: account.status,
    expiryDate: account.expiryDate,
    cvv: account.cvv,
    interestRate: account.interestRate,
    openedDate: account.openedDate,
    creditLimit: account.creditLimit,
    paymentDue: account.paymentDue,
    minimumPayment: account.minimumPayment,
    transactions: account.transactions,
  }));
}