// User Model
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // Legal First Name
    legalFirstName: {
      type: String,
      required: [true, "Legal first name is required"],
    },
    // Middle Name
    middleName: {
      type: String,
      default: "",
    },
    // Legal Last Name
    legalLastName: {
      type: String,
      required: [true, "Legal last name is required"],
    },
    // User Name (Unique)
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    // Email
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    // Phone
    phone: {
      type: String,
      default: "",
    },
    // Country
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    // Account Type
    accountType: {
      type: String,
      required: [true, "Account type is required"],
    },
    // 4 Digit Transaction Pin
    transactionPin: {
      type: String,
      required: [true, "Transaction pin is required"],
      // minlength: [4, "Transaction pin must be 4 digits"],
      // maxlength: [4, "Transaction pin must be 4 digits"],
      select: false,
    },
    // Password
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    // Avatar (optional)
    avatar: {
      type: String,
      default: null,
    },
    //Kyc Status
    Kyc: {
      type: String,
      default: "pending",
    },
    // Balance (optional)
    balance: {
      type: Number,
      default: 0.00,
    },
    // Join Date (optional)
    joinDate: {
      type: Date,
      default: null,
    },
    // Last Login (optional)
    lastLogin: {
      type: Date,
      default: null,
    },
    // Role
    role: {
      type: String,
      enum: ["user", "superAdmin", "admin", "writer", "editor"],
      default: "user",
    },
    // Status
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    // Verification fields
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

const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User;