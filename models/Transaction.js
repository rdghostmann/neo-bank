// models/Transaction.js
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BankCard",
      required: false, // Optional, depending on whether transactions are tied to a card
    },
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // or store in `date` as Date object with time if preferred
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    account: {
      type: String, // e.g., "Checking", "Credit", "Savings"
      required: true,
    },
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"],
      default: "completed",
    },
    avatar: {
      type: String, // Emoji or emoji string
      default: "💸",
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.models?.Transaction || mongoose.model("Transaction", TransactionSchema);
export default Transaction;
