import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { registerUser } from '../services/authService';

export default function Signup({ onSignup, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validatePassword = (pwd) => {
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
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
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const result = await registerUser(email, password, name);
      
      if (result.success) {
        toast.success('Account created successfully!');
        onSignup(email, password, name);
      } else {
        toast.error(result.error || 'Signup failed');
        setErrors({ submit: result.error });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-yellow-500';
    if (passwordStrength <= 3) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 2) return 'Fair';
    if (passwordStrength <= 3) return 'Good';
    return 'Strong';
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
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-500">Join millions managing their finances</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4 mb-6">
            {/* Full Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                  errors.name
                    ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500'
                    : 'border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                }`}
                placeholder="John Anderson"
                disabled={isLoading}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </motion.div>

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
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
                  setPasswordStrength(validatePassword(e.target.value));
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                  errors.password
                    ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500'
                    : 'border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                }`}
                placeholder="At least 6 characters"
                disabled={isLoading}
              />
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-slate-600">{getPasswordStrengthText()}</span>
                </div>
              )}
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </motion.div>

            {/* Confirm Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                }}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                  errors.confirmPassword
                    ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500'
                    : 'border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                }`}
                placeholder="Re-enter your password"
                disabled={isLoading}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
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

            {/* Terms Checkbox */}
            <label className="flex items-start gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 mt-0.5"
                defaultChecked
              />
              <span>
                I agree to the <span className="text-indigo-600 hover:underline cursor-pointer">Terms of Service</span> and{' '}
                <span className="text-indigo-600 hover:underline cursor-pointer">Privacy Policy</span>
              </span>
            </label>

            {/* Signup Button */}
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
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </motion.button>
          </form>

          {/* Sign In Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-slate-600"
          >
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition"
              disabled={isLoading}
            >
              Sign in
            </button>
          </motion.p>
        </div>
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
