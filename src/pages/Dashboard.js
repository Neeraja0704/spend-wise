import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import BudgetSection from '../components/BudgetSection';
import TransactionForm from '../components/TransactionForm';
import TransactionsList from '../components/TransactionsList';
import Chart from '../components/Chart';
import DeleteModal from '../components/DeleteModal';

function Dashboard({ user, onLogout, showToast }) {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState({ amount: 5000, month: new Date().getMonth() });
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgetInput, setBudgetInput] = useState(budget.amount);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [loading, setLoading] = useState(true);

  // Load data from localStorage
  useEffect(() => {
    setLoading(true);
    // Simulate loading delay for UX
    setTimeout(() => {
      loadTransactions();
      loadBudget();
      setLoading(false);
    }, 300);
  }, [user.id]);

  const loadTransactions = () => {
    const key = `transactions_${user.id}`;
    const data = localStorage.getItem(key);
    if (data) {
      try {
        setTransactions(JSON.parse(data));
      } catch (e) {
        console.error('Error loading transactions:', e);
        setTransactions([]);
      }
    }
  };

  const loadBudget = () => {
    const key = `budget_${user.id}`;
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const budgetData = JSON.parse(data);
        setBudget(budgetData);
        setBudgetInput(budgetData.amount);
      } catch (e) {
        console.error('Error loading budget:', e);
      }
    }
  };

  // Save transactions to localStorage
  const saveTransactions = (txns) => {
    const key = `transactions_${user.id}`;
    localStorage.setItem(key, JSON.stringify(txns));
  };

  // Add transaction
  const handleAddTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    const newTransactions = [newTransaction, ...transactions];
    setTransactions(newTransactions);
    saveTransactions(newTransactions);
    toast.success('Transaction added successfully!', { duration: 2000 });

    // Check budget
    const totalExpense = newTransactions.reduce((sum, t) => t.type === 'expense' ? sum + parseFloat(t.amount) : sum, 0);
    if (totalExpense > budget.amount) {
      setTimeout(() => {
        toast('Budget exceeded! Monitor your spending.', { 
          icon: '⚠️',
          duration: 3000,
          style: {
            background: '#FFFBEB',
            color: '#78350F'
          }
        });
      }, 500);
    }
  };

  // Delete transaction
  const handleDeleteTransaction = () => {
    if (deleteModal.id) {
      const newTransactions = transactions.filter(t => t.id !== deleteModal.id);
      setTransactions(newTransactions);
      saveTransactions(newTransactions);
      toast.success('Transaction deleted', { duration: 2000 });
      setDeleteModal({ show: false, id: null });
    }
  };

  // Set budget
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
