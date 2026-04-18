// lib/offlineDB.js - IndexedDB for offline functionality
class OfflineDB {
  constructor() {
    this.dbName = 'ExpenseTrackerDB';
    this.version = 1;
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object stores
        const stores = [
          { name: 'transactions', keyPath: '_id' },
          { name: 'budgets', keyPath: '_id' },
          { name: 'wallets', keyPath: '_id' },
          { name: 'categories', keyPath: '_id' },
          { name: 'recurringExpenses', keyPath: '_id' },
          { name: 'loans', keyPath: '_id' },
          { name: 'reminders', keyPath: '_id' },
          { name: 'netWorth', keyPath: '_id' },
          { name: 'syncQueue', keyPath: 'id', autoIncrement: true },
        ];

        stores.forEach((store) => {
          if (!db.objectStoreNames.contains(store.name)) {
            const objectStore = db.createObjectStore(store.name, {
              keyPath: store.keyPath,
              autoIncrement: store.autoIncrement,
            });
            objectStore.createIndex('userId', 'userId', { unique: false });
            objectStore.createIndex('createdAt', 'createdAt', { unique: false });
          }
        });
      };
    });
  }

  // Save transaction
  async saveTransaction(transaction) {
    const store = this.db.transaction(['transactions'], 'readwrite').objectStore('transactions');
    return new Promise((resolve, reject) => {
      const request = store.put(transaction);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Get all transactions for user
  async getTransactions(userId) {
    const store = this.db.transaction(['transactions'], 'readonly').objectStore('transactions');
    const index = store.index('userId');
    return new Promise((resolve, reject) => {
      const request = index.getAll(userId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Delete transaction
  async deleteTransaction(id) {
    const store = this.db.transaction(['transactions'], 'readwrite').objectStore('transactions');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Save to sync queue (for offline actions)
  async addToSyncQueue(action, data, userId) {
    const store = this.db.transaction(['syncQueue'], 'readwrite').objectStore('syncQueue');
    return new Promise((resolve, reject) => {
      const request = store.add({
        action,
        data,
        userId,
        timestamp: Date.now(),
        synced: false,
      });
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Get unsync queue
  async getSyncQueue() {
    const store = this.db.transaction(['syncQueue'], 'readonly').objectStore('syncQueue');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Mark as synced
  async markSynced(id) {
    const store = this.db.transaction(['syncQueue'], 'readwrite').objectStore('syncQueue');
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => {
        const item = request.result;
        item.synced = true;
        const updateRequest = store.put(item);
        updateRequest.onsuccess = () => resolve();
        updateRequest.onerror = () => reject(updateRequest.error);
      };
      request.onerror = () => reject(request.error);
    });
  }

  // Save wallet
  async saveWallet(wallet) {
    const store = this.db.transaction(['wallets'], 'readwrite').objectStore('wallets');
    return new Promise((resolve, reject) => {
      const request = store.put(wallet);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Get wallets for user
  async getWallets(userId) {
    const store = this.db.transaction(['wallets'], 'readonly').objectStore('wallets');
    const index = store.index('userId');
    return new Promise((resolve, reject) => {
      const request = index.getAll(userId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Save budget
  async saveBudget(budget) {
    const store = this.db.transaction(['budgets'], 'readwrite').objectStore('budgets');
    return new Promise((resolve, reject) => {
      const request = store.put(budget);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Get budgets for user
  async getBudgets(userId) {
    const store = this.db.transaction(['budgets'], 'readonly').objectStore('budgets');
    const index = store.index('userId');
    return new Promise((resolve, reject) => {
      const request = index.getAll(userId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Save recurring expense
  async saveRecurringExpense(expense) {
    const store = this.db.transaction(['recurringExpenses'], 'readwrite').objectStore('recurringExpenses');
    return new Promise((resolve, reject) => {
      const request = store.put(expense);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Get recurring expenses
  async getRecurringExpenses(userId) {
    const store = this.db.transaction(['recurringExpenses'], 'readonly').objectStore('recurringExpenses');
    const index = store.index('userId');
    return new Promise((resolve, reject) => {
      const request = index.getAll(userId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Clear all data (for logout)
  async clearAll() {
    const storeNames = [
      'transactions',
      'budgets',
      'wallets',
      'categories',
      'recurringExpenses',
      'loans',
      'reminders',
      'netWorth',
    ];

    for (const storeName of storeNames) {
      const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName);
      await new Promise((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }
  }
}

export const offlineDB = new OfflineDB();