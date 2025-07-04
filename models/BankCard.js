// models/BankCard.js
import mongoose from "mongoose";

const BankCardSchema = new mongoose.Schema(
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
      default: 0,
    },
    color: {
      type: String, // e.g., "from-blue-600 to-blue-800"
      default: "from-gray-600 to-gray-800",
    },
    status: {
      type: String,
      enum: ["active", "locked", "inactive"],
      default: "active",
    },
    expiryDate: {
      type: String, // e.g., "12/26"
      required: true,
    },
    cvv: {
      type: String,
      required: true,
      select: false, // don't expose CVV by default
    },
  },
  {
    timestamps: true,
  }
);

const BankCard = mongoose.models?.BankCard || mongoose.model("BankCard", BankCardSchema);
export default BankCard;
