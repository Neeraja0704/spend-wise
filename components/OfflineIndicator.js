"use client";

import { useOfflineStatus } from "@/hooks/useOffline";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function OfflineIndicator() {
  const { isOnline, isLoading } = useOfflineStatus();

  useEffect(() => {
    if (!isLoading) {
      if (!isOnline) {
        toast.custom((t) => (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-yellow-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <span className="text-xl">⚠️</span>
            <span>You're offline - changes will sync when online</span>
          </motion.div>
        ));
      } else {
        toast.custom((t) => (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <span className="text-xl">✅</span>
            <span>Back online - syncing data...</span>
          </motion.div>
        ));
      }
    }
  }, [isOnline, isLoading]);

  if (isLoading) return null;

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-0 left-0 right-0 bg-yellow-400 text-yellow-900 px-4 py-2 text-center text-sm font-semibold z-50 flex items-center justify-center gap-2"
        >
          <div className="animate-pulse w-2 h-2 bg-yellow-900 rounded-full"></div>
          📱 Offline Mode - Your data is saved locally and will sync automatically
        </motion.div>
      )}
    </AnimatePresence>
  );
}