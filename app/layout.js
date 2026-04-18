import "./globals.css";
import { RootLayoutClient } from "@/components/RootLayoutClient";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ExpenseTracker Pro - Smart Finance Management",
  description:
    "Production-ready expense tracker with real authenticated accounts, smart budgets, and AI-powered insights. Works offline!",
  keywords: [
    "expense tracker",
    "budget manager",
    "personal finance",
    "fintech",
    "offline",
  ],
  authors: [{ name: "ExpenseTracker Team" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ExpenseTracker Pro",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#6366f1",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#6366f1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
