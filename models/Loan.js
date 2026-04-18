import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    loanName: {
      type: String,
      required: true,
    },
    loanType: {
      type: String,
      enum: ["home_loan", "personal_loan", "car_loan", "education_loan", "credit_card", "other"],
      required: true,
    },
    principal: {
      type: Number,
      required: true,
      min: 0,
    },
    currentAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    interestRate: {
      type: Number,
      required: true,
      min: 0,
    },
    tenureMonths: {
      type: Number,
      required: true,
      min: 1,
    },
    emiAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    paidEmi: {
      type: Number,
      default: 0,
      min: 0,
    },
    remainingEmi: {
      type: Number,
      required: true,
    },
    nextEmiDate: {
      type: Date,
      required: true,
    },
    lender: {
      type: String,
      default: "",
    },
    accountNumber: {
      type: String,
      default: "",
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

loanSchema.index({ userId: 1, nextEmiDate: 1 });
loanSchema.index({ userId: 1, isActive: 1 });

export default mongoose.models.Loan ||
  mongoose.model("Loan", loanSchema);