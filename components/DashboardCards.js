import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function DashboardCards({ totalIncome, totalExpenses, budget, budgetStatus }) {
  const cards = [
    {
      id: 'income',
      label: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      accentColor: 'from-green-500 to-emerald-500',
    },
    {
      id: 'expenses',
      label: 'Total Expenses',
      amount: totalExpenses,
      icon: TrendingDown,
      bgGradient: 'from-red-500/20 to-pink-500/20',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      accentColor: 'from-red-500 to-pink-500',
    },
    {
      id: 'balance',
      label: 'Balance',
      amount: totalIncome - totalExpenses,
      icon: Target,
      bgGradient: 'from-indigo-500/20 to-purple-500/20',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-700',
      accentColor: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ translateY: -5 }}
          className={`relative bg-gradient-to-br ${card.bgGradient} border-2 ${card.borderColor} rounded-2xl p-6 overflow-hidden group`}
        >
          {/* Background Accent */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.accentColor} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500`}></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">{card.label}</h3>
              <div className={`w-10 h-10 bg-gradient-to-br ${card.accentColor} rounded-lg flex items-center justify-center`}>
                <card.icon size={20} className="text-white" />
              </div>
            </div>

            {/* Amount */}
            <div className={`text-3xl font-bold ${card.textColor}`}>
              {formatCurrency(Math.abs(card.amount))}
            </div>

            {/* Trend */}
            <div className="mt-4 text-xs text-slate-600">
              {card.id === 'balance' && (
                <span className={card.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {card.amount >= 0 ? '↑ Positive' : '↓ Negative'}
                </span>
              )}
              {card.id !== 'balance' && (
                <span>This month</span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}