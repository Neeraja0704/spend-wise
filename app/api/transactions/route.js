import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";
import Transaction from "@/models/Transaction";

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI);
};

// GET all transactions for current user
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectDB();

    const transactions = await Transaction.find({
      userId: session.user.id,
    }).sort({ date: -1 });

    return new Response(JSON.stringify(transactions), { status: 200 });
  } catch (error) {
    console.error("GET transactions error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch transactions" }), {
      status: 500,
    });
  }
}

// POST new transaction
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await request.json();

    // Input validation
    const { type, amount, category, description, date } = body;

    if (!type || !["income", "expense"].includes(type)) {
      return new Response(JSON.stringify({ error: "Invalid transaction type" }), {
        status: 400,
      });
    }

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400,
      });
    }

    if (!category || typeof category !== "string" || category.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Invalid category" }), {
        status: 400,
      });
    }

    if (description && typeof description !== "string") {
      return new Response(JSON.stringify({ error: "Invalid description" }), {
        status: 400,
      });
    }

    let transactionDate;
    if (date) {
      transactionDate = new Date(date);
      if (isNaN(transactionDate.getTime())) {
        return new Response(JSON.stringify({ error: "Invalid date" }), {
          status: 400,
        });
      }
    } else {
      transactionDate = new Date();
    }

    await connectDB();

    const transaction = new Transaction({
      userId: session.user.id,
      type,
      amount,
      category: category.trim(),
      description: description ? description.trim() : "",
      date: transactionDate,
      month: transactionDate.getMonth(),
      year: transactionDate.getFullYear(),
    });

    await transaction.save();

    return new Response(JSON.stringify(transaction), { status: 201 });
  } catch (error) {
    console.error("POST transaction error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create transaction" }),
      { status: 500 }
    );
  }
}
