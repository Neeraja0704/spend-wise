// lib/offlineSync.js - Sync manager for offline-first app
export class OfflineSync {
  constructor() {
    this.isOnline = typeof navigator !== 'undefined' && navigator.onLine;
    this.syncInProgress = false;
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.isOnline));
  }

  init() {
    if (typeof window === 'undefined') return;

    window.addEventListener('online', () => {
      this.isOnline = true;
      this.notifyListeners();
      this.syncData();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.notifyListeners();
    });
  }

  async syncData() {
    if (this.syncInProgress || !this.isOnline) return;

    this.syncInProgress = true;
    try {
      // Import here to avoid circular dependency
      const { offlineDB } = await import('./offlineDB');

      const syncQueue = await offlineDB.getSyncQueue();
      for (const item of syncQueue) {
        if (!item.synced) {
          await this.syncItem(item, offlineDB);
        }
      }
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  async syncItem(item, offlineDB) {
    try {
      const response = await fetch(`/api/${item.action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.data),
      });

      if (response.ok) {
        await offlineDB.markSynced(item.id);
      }
    } catch (error) {
      console.error(`Failed to sync ${item.action}:`, error);
    }
  }
}

export const offlineSync = new OfflineSync();