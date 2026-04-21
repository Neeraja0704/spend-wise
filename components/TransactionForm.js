import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

const TRANSACTION_CATEGORIES = {
  income: [
    { id: 'salary', label: 'Salary', icon: '💼', color: '#10B981' },
    { id: 'freelance', label: 'Freelance', icon: '💻', color: '#3B82F6' },
    { id: 'investment', label: 'Investment', icon: '📈', color: '#F59E0B' },
    { id: 'bonus', label: 'Bonus', icon: '🎁', color: '#EC4899' },
    { id: 'other', label: 'Other', icon: '📝', color: '#6B7280' },
  ],
  expense: [
    { id: 'food', label: 'Food & Dining', icon: '🍔', color: '#F97316' },
    { id: 'transport', label: 'Transport', icon: '🚗', color: '#06B6D4' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️', color: '#EC4899' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎬', color: '#8B5CF6' },
    { id: 'utilities', label: 'Utilities', icon: '💡', color: '#EAB308' },
    { id: 'healthcare', label: 'Healthcare', icon: '⚕️', color: '#EF4444' },
    { id: 'education', label: 'Education', icon: '📚', color: '#3B82F6' },
    { id: 'bills', label: 'Bills & Fee', icon: '📋', color: '#6B7280' },
    { id: 'other', label: 'Other', icon: '📝', color: '#64748B' },
  ],
};

export default function TransactionForm({ onAdd, onClose }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!category) {
      toast.error('Please select a category');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          amount: parseFloat(amount),
          category,
          date,
          description,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add transaction');
      }

      const transaction = await response.json();
      toast.success('✅ Transaction added successfully!');
      onAdd(transaction);
      onClose();
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error(error.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAmount('');
    setDescription('');
    setCategory(TRANSACTION_CATEGORIES[type][0].id);
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Add Transaction</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Transaction Type</label>
              <div className="flex gap-4">
                {[
                  { id: 'income', label: 'Income', icon: '📈', color: 'from-green-500 to-emerald-500' },
                  { id: 'expense', label: 'Expense', icon: '📉', color: 'from-red-500 to-pink-500' },
                ].map(option => (
                  <motion.button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setType(option.id);
                      setCategory(TRANSACTION_CATEGORIES[option.id][0].id);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      type === option.id
                        ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span className="text-2xl mr-2">{option.icon}</span>
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-slate-700 mb-2">
                Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-bold">₹</span>
                <input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg font-semibold"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-2">
                Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {TRANSACTION_CATEGORIES[type].map(cat => (
                  <motion.button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      category === cat.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                    disabled={loading}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="text-xs font-medium text-slate-700">{cat.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-slate-700 mb-2">
                Date
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
                Description (Optional)
              </label>
              <input
                id="description"
                type="text"
                placeholder="Add a note..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            {/* Summary */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-700">Amount:</span>
                <span className={`text-lg font-bold ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {type === 'income' ? '+' : '-'}₹{amount || '0'}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                {type === 'income' ? 'Income will be added' : 'Expense will be deducted'} on {new Date(date).toLocaleDateString()}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <motion.button
                type="button"
                onClick={handleReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                Clear
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : (
                  '✓ Add Transaction'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}