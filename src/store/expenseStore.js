import { create } from 'zustand';
import { addMonths, getMonth, getYear } from 'date-fns';

export const useExpenseStore = create((set, get) => ({
  // User State
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  // Transactions State
  transactions: [],
  
  // Budget State
  budget: {
    amount: 5000,
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
  
  // UI State
  alerts: [],
  
  // Auth Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () => set({ user: null, isAuthenticated: false, transactions: [], budget: { amount: 5000, month: new Date().getMonth(), year: new Date().getFullYear() } }),
  
  // Transaction Actions
  setTransactions: (transactions) => set({ transactions }),
  
  addTransaction: (transaction) => set((state) => {
    const newTransactions = [...state.transactions, { ...transaction, id: Date.now().toString() }];
    return { transactions: newTransactions };
  }),
  
  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter(t => t.id !== id),
  })),
  
  updateTransaction: (id, updates) => set((state) => ({
    transactions: state.transactions.map(t => t.id === id ? { ...t, ...updates } : t),
  })),
  
  // Budget Actions
  setBudget: (budget) => set({ budget }),
  updateBudget: (amount) => set((state) => ({
    budget: { ...state.budget, amount },
  })),
  
  // Alert Actions
  addAlert: (alert) => set((state) => ({
    alerts: [...state.alerts, { ...alert, id: Date.now().toString() }],
  })),
  
  removeAlert: (id) => set((state) => ({
    alerts: state.alerts.filter(a => a.id !== id),
  })),
  
  // Computed
  getTotalExpenses: () => {
    const state = get();
    return state.transactions
      .filter(t => t.type === 'expense' && getMonth(new Date(t.date)) === state.budget.month && getYear(new Date(t.date)) === state.budget.year)
      .reduce((sum, t) => sum + t.amount, 0);
  },
  
  getTotalIncome: () => {
    const state = get();
    return state.transactions
      .filter(t => t.type === 'income' && getMonth(new Date(t.date)) === state.budget.month && getYear(new Date(t.date)) === state.budget.year)
      .reduce((sum, t) => sum + t.amount, 0);
  },
  
  getBudgetStatus: () => {
    const state = get();
    const totalExpenses = state.getTotalExpenses();
    const percentage = (totalExpenses / state.budget.amount) * 100;
    
    if (percentage >= 100) return 'exceeded';
    if (percentage >= 80) return 'warning';
    return 'safe';
  },
  
  getBudgetPercentage: () => {
    const state = get();
    const totalExpenses = state.getTotalExpenses();
    return Math.min((totalExpenses / state.budget.amount) * 100, 100);
  },
  
  getCategoryBreakdown: () => {
    const state = get();
    const breakdown = {};
    
    state.transactions
      .filter(t => t.type === 'expense' && getMonth(new Date(t.date)) === state.budget.month && getYear(new Date(t.date)) === state.budget.year)
      .forEach(t => {
        breakdown[t.category] = (breakdown[t.category] || 0) + t.amount;
      });
    
    return Object.entries(breakdown).map(([category, amount]) => ({ category, amount }));
  },

  getMonthlyTrends: () => {
    const state = get();
    const trends = {};
    
    state.transactions.forEach(t => {
      const date = new Date(t.date);
      const monthYear = `${getMonth(date) + 1}/${getYear(date)}`;
      
      if (!trends[monthYear]) {
        trends[monthYear] = { income: 0, expense: 0 };
      }
      
      if (t.type === 'income') {
        trends[monthYear].income += t.amount;
      } else {
        trends[monthYear].expense += t.amount;
      }
    });
    
    return Object.entries(trends).map(([month, values]) => ({
      month,
      ...values,
    }));
  },
}));
