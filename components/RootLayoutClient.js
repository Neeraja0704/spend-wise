"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { OfflineIndicator } from "./OfflineIndicator";

export function RootLayoutClient({ children }) {
  return (
    <SessionProvider>
      <OfflineIndicator />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
        }}
      />
      {children}
    </SessionProvider>
  );
}