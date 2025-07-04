import { connectToDB } from "@/lib/connectDB";
import User from "@/models/User";

export async function getAllUsers() {
  try {
    await connectToDB();

    const users = await User.find({}, { password: 0, transactionPin: 0 })
      .sort({ createdAt: -1 })
      .lean();

    const cleanUsers = users.map(({ _id, username, email, status }) => ({
      id: _id.toString(),
      name: username,
      email,
      isActive: status === "active",
    }));

    console.log("Fetched Users:", cleanUsers);

    return cleanUsers;
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    throw new Error("Unable to fetch users");
  }
}


export async function toggleUserStatus(userId) {
  try {
    await connectToDB();

    const user = await User.findById(userId);
    if (!user) {    
      throw new Error("User not found");
    }   
    user.status = user.status === "active" ? "inactive" : "active";
    await user.save();
    
    console.log(`User ${userId} status updated to ${user.status}`);
    return { success: true, status: user.status };
  } catch (error) {
    console.error("Error in toggleUserStatus:", error);
    return { success: false, message: error.message };
  }
}