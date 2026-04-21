import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function BudgetSection({ budget, totalExpenses = 0, onUpdateBudget, fullView = false }) {
  // Handle both numeric and object budget values
  const budgetAmount = typeof budget === 'object' ? budget.amount : budget;
  const [showEditModal, setShowEditModal] = useState(false);
  const [budgetInput, setBudgetInput] = useState(budgetAmount);

  const percentage = Math.min((totalExpenses / budgetAmount) * 100, 100);
  const remaining = budgetAmount - totalExpenses;

  const getStatusColor = () => {
    if (percentage >= 100) return { bg: 'from-red-500 to-pink-500', light: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', percent: '100%+' };
    if (percentage >= 80) return { bg: 'from-yellow-500 to-orange-500', light: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', percent: `${percentage.toFixed(0)}%` };
    return { bg: 'from-green-500 to-emerald-500', light: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', percent: `${percentage.toFixed(0)}%` };
  };

  const getStatusLabel = () => {
    if (percentage >= 100) return { icon: '🚨', label: 'Budget Exceeded', detail: `Over by ${formatCurrency(Math.abs(remaining))}` };
    if (percentage >= 80) return { icon: '⚠️', label: 'Nearing Limit', detail: `${formatCurrency(remaining)} remaining` };
    return { icon: '✅', label: 'Within Budget', detail: `${formatCurrency(remaining)} available` };
  };

  const handleUpdateBudget = () => {
    const amount = parseInt(budgetInput);
    if (!amount || amount < 0) {
      toast.error('Please enter a valid budget amount');
      return;
    }
    onUpdateBudget(amount);
    setShowEditModal(false);
    setBudgetInput(budgetAmount);
  };

  const status = getStatusColor();
  const statusLabel = getStatusLabel();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">💰 Monthly Budget</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEditModal(true)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
          >
            Edit
          </motion.button>
        </div>

        {/* Budget Amount */}
        <div className="mb-6">
          <p className="text-sm text-slate-600 mb-2">Total Budget</p>
          <h2 className="text-3xl font-bold text-slate-900">{formatCurrency(budgetAmount)}</h2>
        </div>

        {/* Spent Amount */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">Amount Spent</p>
            <span className={`text-sm font-semibold ${statusLabel.icon === '✅' ? 'text-green-600' : statusLabel.icon === '⚠️' ? 'text-yellow-600' : 'text-red-600'}`}>
              {status.percent}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">{formatCurrency(totalExpenses)}</h3>

          {/* Progress Bar */}
          <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              layoutId="budget-progress"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${status.bg} shadow-lg`}
            />
          </div>
        </div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${status.light} border-2 ${status.border} rounded-xl p-4`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{statusLabel.icon}</span>
            <div>
              <p className={`font-semibold ${status.text}`}>{statusLabel.label}</p>
              <p className={`text-sm ${status.text} opacity-75`}>{statusLabel.detail}</p>
            </div>
          </div>
        </motion.div>

        {/* Breakdown */}
        {fullView && (
          <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Budget Limit</span>
              <span className="font-semibold text-slate-900">{formatCurrency(budgetAmount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Spent</span>
              <span className="font-semibold text-slate-900">{formatCurrency(totalExpenses)}</span>
            </div>
            <div className="flex justify-between items-center py-2 bg-indigo-50 px-3 rounded-lg">
              <span className="text-slate-600">Remaining</span>
              <span className={`font-semibold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(remaining)}
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Update Budget</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Budget Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-semibold">₹</span>
                  <input
                    type="number"
                    value={budgetInput}
                    onChange={(e) => setBudgetInput(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter budget amount"
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUpdateBudget}
                  className="flex-1 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all"
                >
                  Update
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}