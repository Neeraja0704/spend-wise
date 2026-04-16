export const TRANSACTION_CATEGORIES = {
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

export const getCategoryLabel = (categoryId, type = 'expense') => {
  const categories = TRANSACTION_CATEGORIES[type] || [];
  return categories.find(c => c.id === categoryId)?.label || categoryId;
};

export const getCategoryIcon = (categoryId, type = 'expense') => {
  const categories = TRANSACTION_CATEGORIES[type] || [];
  return categories.find(c => c.id === categoryId)?.icon || '📝';
};

export const getCategoryColor = (categoryId, type = 'expense') => {
  const categories = TRANSACTION_CATEGORIES[type] || [];
  return categories.find(c => c.id === categoryId)?.color || '#64748B';
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-IN').format(number);
};

export const calculateMonthlyExpenses = (transactions, month, year) => {
  return transactions
    .filter(t => {
      const date = new Date(t.date);
      return t.type === 'expense' && 
        date.getMonth() === month && 
        date.getFullYear() === year;
    })
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateMonthlyIncome = (transactions, month, year) => {
  return transactions
    .filter(t => {
      const date = new Date(t.date);
      return t.type === 'income' && 
        date.getMonth() === month && 
        date.getFullYear() === year;
    })
    .reduce((sum, t) => sum + t.amount, 0);
};

export const getBudgetAlert = (totalExpenses, budgetAmount) => {
  const percentage = (totalExpenses / budgetAmount) * 100;
  
  if (percentage >= 100) {
    return {
      type: 'error',
      message: `🚨 Budget Exceeded! You've spent ${Math.round(percentage)}% of your budget.`,
      color: 'error',
    };
  }
  
  if (percentage >= 80) {
    return {
      type: 'warning',
      message: `⚠️ Nearing Limit! You've spent ${Math.round(percentage)}% of your budget.`,
      color: 'warning',
    };
  }
  
  return {
    type: 'success',
    message: `✅ You're within budget. ${Math.round(100 - percentage)}% remaining.`,
    color: 'success',
  };
};

export const exportToCSV = (transactions, filename = 'transactions.csv') => {
  const headers = ['Date', 'Type', 'Category', 'Amount', 'Description'];
  const csvContent = [
    headers.join(','),
    ...transactions.map(t => [
      new Date(t.date).toLocaleDateString(),
      t.type,
      t.category,
      t.amount,
      t.description || '',
    ].join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const getAiInsights = (transactions, budget) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyExpenses = calculateMonthlyExpenses(transactions, currentMonth, currentYear);
  const categoryBreakdown = {};
  
  transactions
    .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === currentMonth)
    .forEach(t => {
      categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + t.amount;
    });
  
  const insights = [];
  
  // Highest spending category
  const [topCategory, topAmount] = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1])[0] || [null, 0];
  if (topCategory) {
    insights.push(`💡 Your highest spending is on ${topCategory} (₹${Math.round(topAmount)})`);
  }
  
  // Budget status
  const percentage = (monthlyExpenses / budget.amount) * 100;
  if (percentage > 100) {
    insights.push(`⚠️ You're ${Math.round(percentage - 100)}% over budget this month`);
  } else if (percentage > 80) {
    insights.push(`⚠️ You're approaching your budget limit (${Math.round(percentage)}% used)`);
  }
  
  return insights;
};
