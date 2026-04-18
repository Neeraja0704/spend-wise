import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";
import Budget from "@/models/Budget";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI);
};

// GET user's budget
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectDB();

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let budget = await Budget.findOne({
      userId: session.user.id,
      month: currentMonth,
      year: currentYear,
    });

    // If no budget for current month, return default
    if (!budget) {
      return new Response(
        JSON.stringify({
          amount: 5000,
          month: currentMonth,
          year: currentYear,
          currency: "INR",
        }),
        { status: 200 }
      );
    }

    return new Response(JSON.stringify(budget), { status: 200 });
  } catch (error) {
    console.error("GET budget error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch budget" }), {
      status: 500,
    });
  }
}

// PUT update budget
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await request.json();

    // Input validation
    const { amount, currency } = body;

    if (!amount || typeof amount !== "number" || amount < 0) {
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400,
      });
    }

    if (currency && typeof currency !== "string") {
      return new Response(JSON.stringify({ error: "Invalid currency" }), {
        status: 400,
      });
    }

    await connectDB();

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let budget = await Budget.findOneAndUpdate(
      {
        userId: session.user.id,
        month: currentMonth,
        year: currentYear,
      },
      {
        userId: session.user.id,
        amount,
        month: currentMonth,
        year: currentYear,
        currency: currency || "INR",
      },
      { upsert: true, new: true }
    );

    return new Response(JSON.stringify(budget), { status: 200 });
  } catch (error) {
    console.error("PUT budget error:", error);
    return new Response(JSON.stringify({ error: "Failed to update budget" }), {
      status: 500,
    });
  }
}
