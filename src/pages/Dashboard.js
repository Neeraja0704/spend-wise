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
      toast('⚠️ You\'ve reached 80% of your budget', {
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
            {/* Dashboard Cards */}
            <DashboardCards 
              totalIncome={getTotalIncome()}
              totalExpenses={getTotalExpenses()}
              budget={budget}
              budgetStatus={getBudgetStatus()}
            />
            
            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Charts Section */}
              <div className="lg:col-span-2 space-y-6">
                <Charts transactions={transactions} />
              </div>
              
              {/* Budget & Quick Actions */}
              <div className="space-y-6">
                <BudgetSection 
                  budget={budget}
                  totalExpenses={getTotalExpenses()}
                  onUpdateBudget={handleUpdateBudget}
                />
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTransactionForm(true)}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  + Add Transaction
                </motion.button>
              </div>
            </div>
            
            {/* Transactions Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Recent Transactions</h2>
              <TransactionsList 
                transactions={transactions}
                onDelete={handleDeleteTransaction}
              />
            </div>
          </div>
        );
      
      case 'transactions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-slate-900">All Transactions</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BudgetSection 
                budget={budget}
                totalExpenses={getTotalExpenses()}
                onUpdateBudget={handleUpdateBudget}
                fullView
              />
            </div>
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
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
        user={user}
        onLogout={onLogout}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar 
          user={user}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onLogout={onLogout}
        />
        
        {/* Content Area */}
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
      
      {/* Transaction Form Modal */}
      <AnimatePresence>
        {showTransactionForm && (
          <TransactionForm
            onAdd={handleAddTransaction}
            onClose={() => setShowTransactionForm(false)}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        show={deleteModal.show}
        onConfirm={handleDeleteTransaction}
        onCancel={() => setDeleteModal({ show: false, id: null })}
      />
    </div>
  );
}
  const handleSetBudget = () => {
    const amount = parseFloat(budgetInput);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid budget amount', { duration: 2000 });
      return;
    }

    const newBudget = { amount, month: new Date().getMonth() };
    setBudget(newBudget);
    const key = `budget_${user.id}`;
    localStorage.setItem(key, JSON.stringify(newBudget));
    setShowBudgetModal(false);
    toast.success('Budget updated successfully!', { duration: 2000 });
  };

  // Calculate stats
  const totalIncome = transactions.reduce(
    (sum, t) => t.type === 'income' ? sum + parseFloat(t.amount) : sum,
    0
  );

  const totalExpense = transactions.reduce(
    (sum, t) => t.type === 'expense' ? sum + parseFloat(t.amount) : sum,
    0
  );

  const totalBalance = totalIncome - totalExpense;
  const remainingBudget = budget.amount - totalExpense;
  const budgetPercentage = Math.min((totalExpense / budget.amount) * 100, 100);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount).replace('₹', '₹ ');
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (transactions.length === 0) {
      toast('No transactions to export', { icon: 'ℹ️', duration: 2000 });
      return;
    }

    const headers = ['Date', 'Category', 'Type', 'Amount', 'Note'];
    const rows = transactions.map(t => [
      new Date(t.date).toLocaleDateString('en-IN'),
      t.category,
      t.type.toUpperCase(),
      t.amount,
      t.note || '-'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expense-tracker_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);

    toast.success('CSV exported successfully!', { duration: 2000 });
  };

  // Clear all data
  const handleClearAllData = () => {
    setDeleteModal({ show: false, id: null });
    const confirmed = window.confirm(
      'Are you sure? This will permanently delete ALL transactions. This action cannot be undone.'
    );
    if (confirmed) {
      const newTransactions = [];
      setTransactions(newTransactions);
      saveTransactions(newTransactions);
      toast.success('All transactions cleared', { duration: 2000 });
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            <div className="dashboard-logo">💳</div>
            <div className="dashboard-title">ExpenseTracker</div>
          </div>
        </div>
        <div className="dashboard-content">
          <div className="skeleton-loader">
            <div className="skeleton-bar"></div>
            <div className="skeleton-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-left">
          <div className="dashboard-logo">💳</div>
          <div className="dashboard-title">ExpenseTracker</div>
        </div>
        <div className="dashboard-actions">
          <div className="user-profile">
            <span className="user-name">{user.name}</span>
          </div>
          <button className="btn-icon" onClick={handleExportCSV} title="Export transactions">
            ⬇️
          </button>
          <button className="btn-icon danger" onClick={handleClearAllData} title="Delete all data">
            🗑️
          </button>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        {/* Greeting */}
        <div className="greeting-section">
          <div className="greeting">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">💰</div>
                <div className="stat-label">Total Balance</div>
              </div>
              <div className={`stat-value ${totalBalance >= 0 ? 'positive' : 'negative'}`}>
                {formatCurrency(totalBalance)}
              </div>
              <div className="stat-change">
                {totalBalance >= 0 ? '✓ Positive balance' : '✕ Negative balance'}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon income">📈</div>
                <div className="stat-label">Total Income</div>
              </div>
              <div className="stat-value income">
                {formatCurrency(totalIncome)}
              </div>
              <div className="stat-change">
                {transactions.filter(t => t.type === 'income').length} credit{transactions.filter(t => t.type === 'income').length !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon expense">📉</div>
                <div className="stat-label">Total Expense</div>
              </div>
              <div className="stat-value expense">
                {formatCurrency(totalExpense)}
              </div>
              <div className="stat-change">
                {transactions.filter(t => t.type === 'expense').length} debit{transactions.filter(t => t.type === 'expense').length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        {transactions.length > 0 && (
          <Chart 
            totalIncome={totalIncome} 
            totalExpense={totalExpense}
          />
        )}

        {/* Budget Section */}
        <BudgetSection
          budget={budget}
          totalExpense={totalExpense}
          remainingBudget={remainingBudget}
          budgetPercentage={budgetPercentage}
          onSetBudget={() => setShowBudgetModal(true)}
          formatCurrency={formatCurrency}
        />

        {/* Add Transaction Form */}
        <TransactionForm onAddTransaction={handleAddTransaction} />

        {/* Transactions List */}
        <div className="transactions-section">
          <div className="section-header">
            <div className="section-title">
              📋 Recent Transactions
            </div>
            <div className="section-actions">
              <span className="transaction-count">
                {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <TransactionsList
            transactions={transactions}
            onDeleteTransaction={(id) => setDeleteModal({ show: true, id })}
            formatCurrency={formatCurrency}
          />
        </div>
      </div>

      {/* Budget Modal */}
      {showBudgetModal && (
        <div className="modal-overlay" onClick={() => setShowBudgetModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">Set Monthly Budget</div>
            <p className="modal-description">Enter your desired monthly spending limit</p>
            <div className="form-group">
              <label htmlFor="budgetAmount">Budget Amount (₹)</label>
              <input
                id="budgetAmount"
                type="number"
                placeholder="Enter amount"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                min="1"
                step="100"
              />
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={handleSetBudget}
              >
                Save Budget
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowBudgetModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        show={deleteModal.show}
        onConfirm={handleDeleteTransaction}
        onCancel={() => setDeleteModal({ show: false, id: null })}
      />
    </div>
  );
}

export default Dashboard;
