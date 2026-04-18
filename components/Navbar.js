import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Menu, Search, LogOut } from 'lucide-react';

export default function Navbar({ user, onMenuToggle, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, message: '✅ Transaction added', time: '5 mins ago' },
    { id: 2, message: '⚠️ Budget nearing limit', time: '1 hour ago' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuToggle}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
          >
            <Menu size={24} className="text-slate-600" />
          </motion.button>

          <div className="hidden md:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="bg-transparent border-none outline-none text-sm w-64"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-slate-100 rounded-lg"
            >
              <Bell size={20} className="text-slate-600" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"
              />
            </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg border border-slate-200 shadow-xl z-50"
                >
                  <div className="p-4 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <motion.div
                          key={notif.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="px-4 py-3 hover:bg-slate-50 border-b border-slate-100 cursor-pointer"
                        >
                          <p className="text-sm text-slate-900">{notif.message}</p>
                          <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-slate-500">No notifications</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-lg"
            >
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </motion.button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-slate-200 shadow-xl z-50"
                >
                  <div className="p-4 border-b border-slate-200">
                    <p className="text-sm font-medium text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded text-sm text-slate-700">
                      Profile Settings
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded text-sm text-slate-700">
                      Preferences
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded text-sm text-slate-700">
                      Help & Support
                    </button>
                  </div>
                  <div className="border-t border-slate-200 p-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-50 rounded text-sm text-red-600 font-medium"
                    >
                      <LogOut size={16} />
                      Logout
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}