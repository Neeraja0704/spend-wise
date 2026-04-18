import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["bill", "budget_alert", "emi", "subscription", "custom"],
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    reminderTime: {
      type: String,
      default: "09:00",
      description: "HH:MM format",
    },
    amount: {
      type: Number,
      default: 0,
    },
    reminderDays: {
      type: [Number],
      default: [1],
      description: "Days before due date to remind (e.g., [1, 3, 7])",
    },
    frequency: {
      type: String,
      enum: ["once", "daily", "weekly", "monthly", "yearly"],
      default: "once",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    isNotified: {
      type: Boolean,
      default: false,
    },
    notifiedAt: {
      type: Date,
      default: null,
    },
    linkedTo: {
      type: String,
      enum: ["transaction", "recurring_expense", "loan", "none"],
      default: "none",
    },
    linkedId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

reminderSchema.index({ userId: 1, dueDate: 1 });
reminderSchema.index({ userId: 1, isCompleted: 1 });

export default mongoose.models.Reminder ||
  mongoose.model("Reminder", reminderSchema);