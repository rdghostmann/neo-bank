// models/Account.js
import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Checking", "Savings", "Credit"],
      required: true,
    },
    number: {
      type: String,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    availableBalance: {
      type: Number,
      required: true,
      default: 0,
    },
    color: {
      type: String, // Tailwind gradient string
      default: "from-gray-600 to-gray-800",
    },
    status: {
      type: String,
      enum: ["active", "locked", "closed"],
      default: "active",
    },
    expiryDate: {
      type: String, // "MM/YY" format
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    interestRate: {
      type: String, // e.g., "1.25%"
      default: "0%",
    },
    openedDate: {
      type: String, // or use Date if you want accurate sorting/filtering
      required: true,
    },
    creditLimit: {
      type: Number,
      default: 0, // Only for credit accounts
    },
    paymentDue: {
      type: String, // Optional, for credit accounts
    },
    minimumPayment: {
      type: Number,
      default: 0,
    },
    transactions: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.models?.Account || mongoose.model("Account", AccountSchema);
export default Account;
