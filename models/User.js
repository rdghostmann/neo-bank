// User Model
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't return password by default
    },
    avatar: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: null,
    },
    joinDate: {
      type: Date,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    accountType: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "superAdmin", "admin", "writer", "editor"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // ✅ Verification fields
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Fix the model export
const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User;
