import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      enum: ["Cash", "Savings Account", "Current Account", "UPI", "Credit Card", "Investment", "Other"],
    },
    type: {
      type: String,
      enum: ["cash", "bank", "upi", "credit_card", "investment", "other"],
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    color: {
      type: String,
      default: "#6366f1",
    },
    icon: {
      type: String,
      default: "💰",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

walletSchema.index({ userId: 1, type: 1 });

export default mongoose.models.Wallet ||
  mongoose.model("Wallet", walletSchema);