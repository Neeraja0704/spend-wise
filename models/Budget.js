import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries by userId, month, year
budgetSchema.index({ userId: 1, month: 1, year: 1 });

export default mongoose.models.Budget || mongoose.model("Budget", budgetSchema);
