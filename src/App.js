import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useExpenseStore } from './store/expenseStore';
import { getCurrentUser, isAuthenticated } from './services/authService';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, logout: storeLogout } = useExpenseStore();

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const user = getCurrentUser();
      if (user && isAuthenticated()) {
        setCurrentUser(user);
        setUser(user);
        setCurrentPage('dashboard');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [setUser]);

  const handleLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      setUser(user);
      setCurrentPage('dashboard');
      
      // Initialize user data
      const userDataKey = `transactions_${user.id}`;
      const budgetKey = `budget_${user.id}`;
      
      if (!localStorage.getItem(userDataKey)) {
        localStorage.setItem(userDataKey, JSON.stringify([]));
      }
      if (!localStorage.getItem(budgetKey)) {
        localStorage.setItem(budgetKey, JSON.stringify({ amount: 5000, month: new Date().getMonth(), year: new Date().getFullYear() }));
      }
    }
  };

  const handleGoogleLogin = () => {
    const googleUser = {
      id: Date.now().toString(),
      email: `user_${Date.now()}@gmail.com`,
      name: 'Google User',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=google${Date.now()}`,
      loginMethod: 'google',
      createdAt: new Date().toISOString()
    };

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(googleUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(googleUser));
    
    setCurrentUser(googleUser);
    setUser(googleUser);
    setCurrentPage('dashboard');

    // Initialize user data
    const userDataKey = `transactions_${googleUser.id}`;
    const budgetKey = `budget_${googleUser.id}`;
    localStorage.setItem(userDataKey, JSON.stringify([]));
    localStorage.setItem(budgetKey, JSON.stringify({ amount: 5000, month: new Date().getMonth(), year: new Date().getFullYear() }));
  };

  const handleSignup = (email, password, name) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Initialize user data
    const userDataKey = `transactions_${newUser.id}`;
    const budgetKey = `budget_${newUser.id}`;
    localStorage.setItem(userDataKey, JSON.stringify([]));
    localStorage.setItem(budgetKey, JSON.stringify({ amount: 5000, month: new Date().getMonth(), year: new Date().getFullYear() }));

    setCurrentUser(newUser);
    setUser(newUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    storeLogout();
    setCurrentPage('login');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg">
            <span className="text-3xl animate-pulse">💰</span>
          </div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster 
        position="top-right" 
        reverseOrder={false}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 3000 },
        }}
      />
      
      {!currentUser ? (
        currentPage === 'login' ? (
          <Login 
            onLogin={handleLogin}
            onGoogleLogin={handleGoogleLogin}
            onSwitchToSignup={() => setCurrentPage('signup')}
          />
        ) : (
          <Signup 
            onSignup={handleSignup} 
            onSwitchToLogin={() => setCurrentPage('login')}
          />
        )
      ) : (
        <Dashboard 
          user={currentUser} 
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default App;
