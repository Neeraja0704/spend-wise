import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";
import Transaction from "@/models/Transaction";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI);
};

// DELETE transaction
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectDB();

    const transaction = await Transaction.findById(params.id);

    if (!transaction) {
      return new Response(JSON.stringify({ error: "Transaction not found" }), {
        status: 404,
      });
    }

    // Verify ownership
    if (transaction.userId !== session.user.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    await Transaction.findByIdAndDelete(params.id);

    return new Response(JSON.stringify({ message: "Transaction deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("DELETE transaction error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete transaction" }), {
      status: 500,
    });
  }
}

// PUT update transaction
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectDB();

    const transaction = await Transaction.findById(params.id);

    if (!transaction) {
      return new Response(JSON.stringify({ error: "Transaction not found" }), {
        status: 404,
      });
    }

    // Verify ownership
    if (transaction.userId !== session.user.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    const body = await request.json();

    const updated = await Transaction.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    console.error("PUT transaction error:", error);
    return new Response(JSON.stringify({ error: "Failed to update transaction" }), {
      status: 500,
    });
  }
}
