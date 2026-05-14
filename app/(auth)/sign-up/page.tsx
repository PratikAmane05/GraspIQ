"use client";
import React, { useState } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignUpPage() {
  const { signUp, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (user) {
    router.replace("/dashboard");
  }

  const handleSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    await signUp(data.email, data.password);
    router.push("/onboarding");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <AuthCard mode="sign-up" onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
