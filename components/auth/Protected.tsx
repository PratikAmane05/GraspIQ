"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Simple client-side route guard. In a production app you'd use middleware & server checks.
export const Protected: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const authRoutes = ["/sign-in", "/sign-up"]; // routes that should redirect if already authed
    const protectedPrefixes = ["/dashboard", "/tools", "/onboarding"]; // must be authed

    if (!user) {
      // Not logged in trying to access protected
      if (protectedPrefixes.some((p) => pathname.startsWith(p))) {
        router.replace("/sign-in");
      }
    } else {
      // Logged in trying to access auth pages
      if (authRoutes.includes(pathname)) {
        router.replace("/dashboard");
      }
    }
  }, [user, pathname, router]);

  return <>{children}</>;
};
