// hooks/useOffline.js - Hook for offline functionality
import { useEffect, useState } from 'react';
import { offlineSync } from '@/lib/offlineSync';

export function useOfflineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize offline sync
    offlineSync.init();
    setIsOnline(offlineSync.isOnline);
    setIsLoading(false);

    // Subscribe to online/offline changes
    const unsubscribe = offlineSync.subscribe((online) => {
      setIsOnline(online);
    });

    return unsubscribe;
  }, []);

  return { isOnline, isLoading };
}

export function useOfflineDB() {
  const [db, setDb] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      try {
        const { offlineDB } = await import('@/lib/offlineDB');
        await offlineDB.init();
        setDb(offlineDB);
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize offline DB:', error);
      }
    };

    if (typeof window !== 'undefined') {
      initDB();
    }
  }, []);

  return { db, isReady };
}