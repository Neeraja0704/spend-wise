"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-lg">
            <span className="text-3xl">💰</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            ExpenseTracker
          </h1>
          <p className="text-slate-600">
            Smart budgeting for modern finances
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Sign In
          </h2>

          {/* Google Sign In Button */}
          <button
            onClick={() =>
              signIn("google", { redirect: true, callbackUrl: "/dashboard" })
            }
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-slate-300 rounded-lg font-semibold text-slate-900 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 shadow-sm"
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
            Sign in with Google
          </button>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 text-center mb-4">
              ✨ Real Google OAuth authentication <br />
              🔒 Secure & encrypted
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-slate-100 shadow-sm">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm font-semibold text-slate-900">Smart Budgets</p>
            <p className="text-xs text-slate-600 mt-1">Set & track monthly</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-100 shadow-sm">
            <div className="text-2xl mb-2">🔔</div>
            <p className="text-sm font-semibold text-slate-900">Real Alerts</p>
            <p className="text-xs text-slate-600 mt-1">Instant notifications</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-100 shadow-sm">
            <div className="text-2xl mb-2">📈</div>
            <p className="text-sm font-semibold text-slate-900">Charts</p>
            <p className="text-xs text-slate-600 mt-1">Visual insights</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-100 shadow-sm">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-sm font-semibold text-slate-900">Secure</p>
            <p className="text-xs text-slate-600 mt-1">Your data safe</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-8">
          Your financial data is secure and encrypted
        </p>
      </div>
    </div>
  );
}
