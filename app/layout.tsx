import "./globals.css";
import React from "react";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Protected } from "@/components/auth/Protected";

export const metadata = {
  title: "GRASP IQ - AI Powered Learning",
  description:
    "Your personalized AI tutor for smarter, more effective learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <NavBar />
          <Protected>
            <main className="flex-1">{children}</main>
          </Protected>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
