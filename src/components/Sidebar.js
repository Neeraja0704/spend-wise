import React from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen, activePage, setActivePage, user, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'transactions', label: 'Transactions', icon: '📝' },
    { id: 'budget', label: 'Budget', icon: '💰' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <>
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className={`fixed md:relative w-64 h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white shadow-2xl z-30 overflow-y-auto ${
          !isOpen ? '-translate-x-full md:translate-x-0 md:w-0' : ''
        }`}
      >
        <div className="p-6 space-y-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl font-bold">
              💰
            </div>
            <div>
              <h1 className="font-bold text-lg">ExpenseTracker</h1>
              <p className="text-xs text-indigo-200">PRO</p>
            </div>
          </motion.div>

          {/* User Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-3 bg-white/10 rounded-lg p-3"
          >
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{user.name}</p>
              <p className="text-xs text-indigo-200 truncate">{user.email}</p>
            </div>
          </motion.div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => {
                  setActivePage(item.id);
                  // Close sidebar on mobile when clicking
                  if (window.innerWidth < 768) {
                    setIsOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activePage === item.id
                    ? 'bg-white/20 border-l-4 border-white shadow-lg'
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Divider */}
          <div className="border-t border-white/20"></div>

          {/* Logout Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 font-medium transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
        />
      )}
    </>
  );
}
