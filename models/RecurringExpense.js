import mongoose from "mongoose";

const recurringExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "biweekly", "monthly", "quarterly", "yearly"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    walletId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastExecuted: {
      type: Date,
      default: null,
    },
    nextDueDate: {
      type: Date,
      required: true,
    },
    notifyBefore: {
      type: Number,
      default: 1,
      description: "Days before due date to send notification",
    },
  },
  {
    timestamps: true,
  }
);

recurringExpenseSchema.index({ userId: 1, nextDueDate: 1 });
recurringExpenseSchema.index({ userId: 1, frequency: 1 });

export default mongoose.models.RecurringExpense ||
  mongoose.model("RecurringExpense", recurringExpenseSchema);