import { connectToDB } from "@/lib/connectDB";
import User from "@/models/User";

export async function getAllUsers() {
  try {
    await connectToDB();

    // Explicitly select the fields you want, including mifCode
    const users = await User.find({}, { username: 1, email: 1, mifCode: 1 })
      .sort({ createdAt: -1 })
      .lean();

    const cleanUsers = users.map(({ _id, username, email, mifCode }) => ({
      id: _id.toString(),
      name: username,
      email,
      mifCode: mifCode || "",
    }));

    console.log("Fetched Users:", cleanUsers);

    return cleanUsers;
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    throw newError("Unable to fetch users");
  }
}