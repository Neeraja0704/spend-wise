import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useExpenseStore } from '../store/expenseStore';
import TransactionForm from '../components/TransactionForm';
import DashboardCards from '../components/DashboardCards';
import BudgetSection from '../components/BudgetSection';
import TransactionsList from '../components/TransactionsList';
import Charts from '../components/Charts';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Dashboard({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  
  const {
    transactions,
    setTransactions,
    budget,
    addTransaction,
    deleteTransaction,
    updateBudget,
    getTotalExpenses,
    getTotalIncome,
    getBudgetStatus,
  } = useExpenseStore();

  // Load user data from localStorage
  useEffect(() => {
    const key = `transactions_${user.id}`;
    const data = localStorage.getItem(key);
    if (data) {
      try {
        setTransactions(JSON.parse(data));
      } catch (e) {
        console.error('Error loading transactions:', e);
      }
    }

    const budgetKey = `budget_${user.id}`;
    const budgetData = localStorage.getItem(budgetKey);
    if (budgetData) {
      try {
        const parsed = JSON.parse(budgetData);
        updateBudget(parsed.amount);
      } catch (e) {
        console.error('Error loading budget:', e);
      }
    }
  }, [user.id]);

  // Save transactions to localStorage
  useEffect(() => {
    const key = `transactions_${user.id}`;
    localStorage.setItem(key, JSON.stringify(transactions));
  }, [transactions, user.id]);

  const handleAddTransaction = (transaction) => {
    addTransaction(transaction);
    const totalExpenses = getTotalExpenses();
    
    // Show alerts
    if (totalExpenses >= budget.amount * 0.8 && totalExpenses < budget.amount) {
      toast("⚠️ You've reached 80% of your budget", {
        icon: '⚠️',
        duration: 3000,
      });
    } else if (totalExpenses >= budget.amount) {
      toast('🚨 Budget exceeded! Please review your spending', {
        icon: '🚨',
        duration: 3000,
      });
    } else {
      toast.success('✅ Transaction added successfully!');
    }
    
    setShowTransactionForm(false);
  };

  const handleDeleteTransaction = (id) => {
    deleteTransaction(id);
    toast.success('Transaction deleted');
  };

  const handleUpdateBudget = (amount) => {
    updateBudget(amount);
    const key = `budget_${user.id}`;
    localStorage.setItem(key, JSON.stringify({ amount, month: new Date().getMonth(), year: new Date().getFullYear() }));
    toast.success('Budget updated successfully!');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <DashboardCards 
              transactions={transactions}
              budget={budget}
            />
            <Charts transactions={transactions} />
            <BudgetSection 
              budget={budget.amount}
              totalExpenses={getTotalExpenses()}
              onUpdateBudget={handleUpdateBudget}
            />
          </div>
        );
      
      case 'transactions':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-900">Transactions</h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTransactionForm(true)}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold"
              >
                + Add
              </motion.button>
            </div>
            <TransactionsList 
              transactions={transactions}
              onDelete={handleDeleteTransaction}
              showFilters
            />
          </div>
        );
      
      case 'budget':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Budget Management</h1>
            <BudgetSection 
              budget={budget.amount}
              totalExpenses={getTotalExpenses()}
              onUpdateBudget={handleUpdateBudget}
              fullView
            />
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <p className="text-slate-600">Settings coming soon...</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
        user={user}
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar 
          user={user}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onLogout={onLogout}
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
