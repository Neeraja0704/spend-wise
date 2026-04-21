import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Trash2, Download, Search, Filter } from 'lucide-react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getCategoryIcon = (categoryId, type = 'expense') => {
  const categories = {
    income: {
      salary: '💼',
      freelance: '💻',
      investment: '📈',
      bonus: '🎁',
      other: '📝',
    },
    expense: {
      food: '🍔',
      transport: '🚗',
      shopping: '🛍️',
      entertainment: '🎬',
      utilities: '💡',
      healthcare: '⚕️',
      education: '📚',
      bills: '📋',
      other: '📝',
    },
  };
  return categories[type]?.[categoryId] || '📝';
};

const exportToCSV = (transactions, filename) => {
  const headers = ['Date', 'Type', 'Category', 'Amount', 'Description'];
  const csvContent = [
    headers.join(','),
    ...transactions.map(t => [
      t.date,
      t.type,
      t.category,
      t.amount,
      t.description || ''
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

export default function TransactionsList({ transactions, onDelete, showFilters = false }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, searchTerm, filterType]);

  const handleDeleteClick = (id) => {
    setDeleteConfirm(id);
  };

  const handleConfirmDelete = (id) => {
    onDelete(id);
    setDeleteConfirm(null);
    toast.success('Transaction deleted');
  };

  const handleExport = () => {
    exportToCSV(filteredTransactions, 'transactions.csv');
    toast.success('Transactions exported to CSV');
  };

  if (transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center"
      >
        <div className="text-5xl mb-4">📭</div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No transactions yet</h3>
        <p className="text-slate-600">Start tracking your finances by adding your first income or expense</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters & Search */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-slate-600 flex items-center gap-1"><Filter size={16} /> Filter:</span>
            {['all', 'income', 'expense'].map(type => (
              <motion.button
                key={type}
                onClick={() => setFilterType(type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filterType === type
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {type === 'all' ? 'All' : type === 'income' ? '📈 Income' : '📉 Expense'}
              </motion.button>
            ))}

            <div className="flex-1"></div>

            <motion.button
              onClick={handleExport}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all flex items-center gap-1 text-sm font-medium"
            >
              <Download size={16} />
              Export
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Transactions List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filteredTransactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-8 text-slate-500"
            >
              No transactions match your filters
            </motion.div>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  {/* Left Section */}
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${
                      transaction.type === 'income'
                        ? 'bg-green-100'
                        : 'bg-red-100'
                    }`}>
                      {getCategoryIcon(transaction.category, transaction.type)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 capitalize">
                        {transaction.category}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                        <span>{new Date(transaction.date).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: '2-digit'
                        })}</span>
                        {transaction.description && (
                          <>
                            <span>•</span>
                            <span className="truncate">{transaction.description}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex items-center gap-4">
                    <span className={`text-lg font-bold ${
                      transaction.type === 'income'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </span>

                    {/* Delete Button */}
                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteClick(transaction._id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </motion.button>

                      {/* Delete Confirmation */}
                      <AnimatePresence>
                        {deleteConfirm === transaction._id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute right-0 top-full mt-2 bg-white border-2 border-red-200 rounded-lg shadow-xl p-3 whitespace-nowrap z-20"
                          >
                            <p className="text-sm font-medium text-slate-900 mb-2">Delete?</p>
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setDeleteConfirm(null)}
                                className="px-3 py-1 bg-slate-100 text-slate-700 rounded text-sm font-medium hover:bg-slate-200"
                              >
                                No
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleConfirmDelete(transaction._id)}
                                className="px-3 py-1 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600"
                              >
                                Yes
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Summary Footer */}
      {filteredTransactions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4 mt-4"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-slate-600">Total Transactions</p>
              <p className="text-lg font-bold text-slate-900">{filteredTransactions.length}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Income</p>
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(filteredTransactions
                  .filter(t => t.type === 'income')
                  .reduce((sum, t) => sum + t.amount, 0)
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Expenses</p>
              <p className="text-lg font-bold text-red-600">
                {formatCurrency(filteredTransactions
                  .filter(t => t.type === 'expense')
                  .reduce((sum, t) => sum + t.amount, 0)
                )}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}