import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { loginUser, googleLogin } from '../services/authService';

export default function Login({ onLogin, onGoogleLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo123');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const result = await loginUser(email, password);
      
      if (result.success) {
        toast.success(`Welcome back, ${result.user.name}!`);
        onLogin(email, password);
      } else {
        toast.error(result.error || 'Login failed');
        setErrors({ submit: result.error });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      const result = await googleLogin();
      
      if (result.success) {
        toast.success('Logged in with Google successfully!');
        onGoogleLogin();
      } else {
        toast.error(result.error || 'Google login failed');
      }
    } catch (error) {
      toast.error('An error occurred during Google login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg">
              <span className="text-2xl">💰</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">ExpenseTracker PRO</h1>
            <p className="text-slate-500">Your personal financial companion</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                  errors.email
                    ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500'
                    : 'border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                }`}
                placeholder="you@example.com"
                disabled={isLoading}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                  errors.password
                    ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500'
                    : 'border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                }`}
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </motion.div>

            {/* Submit Error */}
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
              >
                {errors.submit}
              </motion.div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                  defaultChecked
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-700 font-medium transition"
                disabled={isLoading}
              >
                Forgot?
              </button>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or continue with</span>
            </div>
          </div>

          {/* Google Login Button */}
          <motion.button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="w-full py-3 border-2 border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50 text-slate-900 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </motion.button>

          {/* Sign Up Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-slate-600 mt-6"
          >
            New to ExpenseTracker?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition"
              disabled={isLoading}
            >
              Create an account
            </button>
          </motion.p>
        </div>

        {/* Demo Hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 bg-indigo-50/50 border border-indigo-200 rounded-lg text-center text-sm text-indigo-700 backdrop-blur-sm"
        >
          <p className="font-medium">💡 Demo Credentials</p>
          <p className="mt-1 text-indigo-600">Email: demo@example.com</p>
          <p className="text-indigo-600">Password: demo123</p>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
