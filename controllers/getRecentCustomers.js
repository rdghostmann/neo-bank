import { connectToDB } from "@/lib/connectDB";
import User from "@/models/User";

export default async function getRecentCustomers() {
  await connectToDB();

  const users = await User.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .select("username email createdAt role avatar balance status"); // select the fields you need

  const formattedUsers = users.map((user) => ({
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    avatar: user.avatar || "/placeholder.svg",
    joinDate: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : "",
    type: user.status || "N/A", // or whatever status field you use
    balance: user.balance
      ? `$${Number(user.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
      : "$0.00",
  }));
  console.log("recentCustomers", formattedUsers);

  return formattedUsers;
}