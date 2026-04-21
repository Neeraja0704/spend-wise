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

  // Load transactions from API
  loadTransactions: async () => {
    try {
      const response = await fetch('/api/transactions');
      if (!response.ok) {
        throw new Error(`Failed to load transactions: ${response.status}`);
      }
      const transactions = await response.json();
      set({ transactions });
      return transactions;
    } catch (error) {
      console.error('Failed to load transactions:', error);
      throw error;
    }
  },

  // Add transaction via API
  addTransaction: async (transactionData) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `Failed to add transaction: ${response.status}`);
      }

      const newTransaction = await response.json();
      set((state) => ({
        transactions: [newTransaction, ...state.transactions],
      }));
      return newTransaction;
    } catch (error) {
      console.error('Failed to add transaction:', error);
      throw error;
    }
  },

  // Delete transaction via API
  deleteTransaction: async (id) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `Failed to delete transaction: ${response.status}`);
      }

      set((state) => ({
        transactions: state.transactions.filter(t => t._id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      throw error;
    }
  },

  // Load budget from API
  loadBudget: async () => {
    try {
      const response = await fetch('/api/budget');
      if (!response.ok) {
        throw new Error(`Failed to load budget: ${response.status}`);
      }
      const budget = await response.json();
      set({ budget });
      return budget;
    } catch (error) {
      console.error('Failed to load budget:', error);
      throw error;
    }
  },

  // Update budget via API
  updateBudget: async (amount) => {
    try {
      const response = await fetch('/api/budget', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `Failed to update budget: ${response.status}`);
      }

      const updatedBudget = await response.json();
      set({ budget: updatedBudget });
      return updatedBudget;
    } catch (error) {
      console.error('Failed to update budget:', error);
      throw error;
    }
  },

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
