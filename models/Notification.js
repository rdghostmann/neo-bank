// models/Notification.js
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    time: {
      type: String, // Example: "2 hours ago" (UI-friendly); optionally replace with a `Date` field
      required: true,
    },
    type: {
      type: String,
      enum: ["success", "warning", "info", "error"],
      default: "info",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Notification =  mongoose.models?.Notification || mongoose.model("Notification", NotificationSchema);

export default Notification;
