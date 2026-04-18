"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useExpenseStore } from "@/store/expenseStore";
import DashboardCards from "@/components/DashboardCards";
import Charts from "@/components/Charts";
import BudgetSection from "@/components/BudgetSection";
import TransactionsList from "@/components/TransactionsList";
import TransactionForm from "@/components/TransactionForm";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

export default function DashboardLayout() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    transactions,
    setTransactions,
    budget,
    setBudget,
    addTransaction,
    deleteTransaction,
    updateBudget,
    loadTransactions,
    loadBudget,
    getTotalExpenses,
    getTotalIncome,
  } = useExpenseStore();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Load data from backend
  useEffect(() => {
    if (session?.user) {
      loadData();
    }
  }, [session]);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadTransactions(),
        loadBudget(),
      ]);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (transaction) => {
    try {
      await addTransaction(transaction);

      const totalExpenses = getTotalExpenses();

      // Smart alerts
      if (
        totalExpenses >= budget.amount * 0.8 &&
        totalExpenses < budget.amount
      ) {
        toast("⚠️ You've reached 80% of your budget", { duration: 3000 });
      } else if (totalExpenses >= budget.amount) {
        toast("🚨 Budget exceeded! Please review your spending", {
          duration: 3000,
        });
      } else {
        toast.success("✅ Transaction added successfully!");
      }

      setShowTransactionForm(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Failed to add transaction");
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      toast.success("✅ Transaction deleted");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
    }
  };

  const handleUpdateBudget = async (amount) => {
    try {
      await updateBudget(amount);
      toast.success("✅ Budget updated successfully!");
    } catch (error) {
      console.error("Error updating budget:", error);
      toast.error("Failed to update budget");
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <DashboardCards transactions={transactions} budget={budget} />
            <Charts transactions={transactions} />
            <BudgetSection
              budget={budget.amount}
              totalExpenses={getTotalExpenses()}
              onUpdateBudget={handleUpdateBudget}
            />
          </div>
        );

      case "transactions":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-900">
                Transactions
              </h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTransactionForm(true)}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg"
              >
                + Add
              </motion.button>
            </div>
            <TransactionsList
              transactions={transactions}
              onDelete={handleDeleteTransaction}
            />
          </div>
        );

      case "budget":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">
              Budget Management
            </h1>
            <BudgetSection
              budget={budget.amount}
              totalExpenses={getTotalExpenses()}
              onUpdateBudget={handleUpdateBudget}
              fullView
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg">
            <span className="text-2xl animate-bounce">💰</span>
          </div>
          <p className="text-slate-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
        user={session?.user}
        onLogout={() => signOut({ redirect: true, callbackUrl: "/" })}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          user={session?.user}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onLogout={() => signOut({ redirect: true, callbackUrl: "/" })}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {showTransactionForm && (
          <TransactionForm
            onAdd={handleAddTransaction}
            onClose={() => setShowTransactionForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
