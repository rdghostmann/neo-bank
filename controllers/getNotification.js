"use server";

import { connectToDB } from "@/lib/connectDB";
import Notification from "@/models/Notification";

export async function getNotificationsByUserId(userId) {
  if (!userId) return [];

  await connectToDB();

  // Find all notifications for the user, sorted by newest first
  const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 }).lean();
  // Convert _id to string for easier handling in the frontend
  notifications.forEach(notification => {
    notification._id = notification._id.toString();
    notification.user = notification.user.toString();
  });
  return notifications;


}