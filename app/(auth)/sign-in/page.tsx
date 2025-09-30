"use client";
import React, { useState } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
  const { signIn, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (user) {
    // Already signed in, redirect
    router.replace("/dashboard");
  }

  const handleSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    await signIn(data.email, data.password);
    router.push("/onboarding");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <AuthCard mode="sign-in" onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
