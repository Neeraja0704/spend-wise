import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import './styles/theme.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check authentication on mount
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(user));
      setCurrentPage('dashboard');
    }
  }, []);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    if (type === 'success') {
      toast.success(message, { duration: 3000, position: 'top-right' });
    } else if (type === 'error') {
      toast.error(message, { duration: 3000, position: 'top-right' });
    } else if (type === 'warning') {
      toast(message, { duration: 3000, position: 'top-right', icon: '⚠️' });
    }
  };

  // Handle login
  const handleLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setIsAuthenticated(true);
      setCurrentUser(user);
      setCurrentPage('dashboard');
      showToast(`Welcome back, ${user.name}!`, 'success');
    } else {
      showToast('Invalid email or password', 'error');
    }
  };

  // Handle Google login - realistic simulation
  const handleGoogleLogin = () => {
    const googleUser = {
      id: Date.now(),
      email: `user_${Date.now()}@gmail.com`,
      name: 'Google User',
      loginMethod: 'google',
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('currentUser', JSON.stringify(googleUser));
    const userDataKey = `transactions_${googleUser.id}`;
    const budgetKey = `budget_${googleUser.id}`;
    
    if (!localStorage.getItem(userDataKey)) {
      localStorage.setItem(userDataKey, JSON.stringify([]));
      localStorage.setItem(budgetKey, JSON.stringify({ amount: 5000, month: new Date().getMonth() }));
    }

    setIsAuthenticated(true);
    setCurrentUser(googleUser);
    setCurrentPage('dashboard');
    showToast('Logged in with Google successfully!', 'success');
  };

  // Handle signup
  const handleSignup = (email, password, name) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
      showToast('Email already registered', 'error');
      return;
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
      name,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Initialize user data
    const userDataKey = `transactions_${newUser.id}`;
    const budgetKey = `budget_${newUser.id}`;
    localStorage.setItem(userDataKey, JSON.stringify([]));
    localStorage.setItem(budgetKey, JSON.stringify({ amount: 5000, month: new Date().getMonth() }));

    setIsAuthenticated(true);
    setCurrentUser(newUser);
    setCurrentPage('dashboard');
    showToast(`Welcome ${name}! Your account is ready.`, 'success');
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentPage('login');
    showToast('Logged out successfully', 'success');
  };

  return (
    <div className="app">
      <Toaster 
        position="top-right" 
        reverseOrder={false}
        toastOptions={{
          success: { style: { background: '#ECFDF5', color: '#065F46' } },
          error: { style: { background: '#FEF2F2', color: '#7F1D1D' } }
        }}
      />
      
      {!isAuthenticated ? (
        <div className="auth-container">
          {currentPage === 'login' ? (
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
          )}
        </div>
      ) : (
        <Dashboard 
          user={currentUser} 
          onLogout={handleLogout}
          showToast={showToast}
        />
      )}
    </div>
  );
}

export default App;
