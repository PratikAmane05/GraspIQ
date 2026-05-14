"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthCardProps {
  mode: "sign-in" | "sign-up";
  onSubmit: (data: { email: string; password: string }) => Promise<void> | void;
  loading?: boolean;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  mode,
  onSubmit,
  loading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isSignIn = mode === "sign-in";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      await onSubmit({ email, password });
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isSignIn ? "Welcome Back" : "Create Account"}</CardTitle>
        <CardDescription>
          {isSignIn
            ? "Sign in to continue your learning"
            : "Start your personalized learning journey"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
        <p className="text-xs text-center text-muted-foreground mt-4">
          {isSignIn ? (
            <>
              New here?{" "}
              <Link className="text-primary hover:underline" href="/sign-up">
                Create an account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link className="text-primary hover:underline" href="/sign-in">
                Sign in
              </Link>
            </>
          )}
        </p>
      </CardContent>
    </Card>
  );
};
