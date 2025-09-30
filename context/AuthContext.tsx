"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  profileCompleted?: boolean;
  profile?: {
    name?: string;
    school?: string;
    grade?: string;
    subjects?: string[];
  };
}

interface AuthContextValue {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  completeProfile: (profile: User["profile"]) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("graspIQ_user")
        : null;
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (typeof window !== "undefined") {
      if (u) localStorage.setItem("graspIQ_user", JSON.stringify(u));
      else localStorage.removeItem("graspIQ_user");
    }
  };

  const signIn = async (email: string, password: string) => {
    // Fake auth delay
    await new Promise((res) => setTimeout(res, 400));
    // In real app verify password
    const existing =
      typeof window !== "undefined" && localStorage.getItem("graspIQ_user");
    if (existing) {
      const parsed: User = JSON.parse(existing);
      if (parsed.email === email) {
        persist(parsed);
        return;
      }
    }
    // Auto create user if not exists (demo)
    persist({ id: Date.now().toString(), email });
  };

  const signUp = async (email: string, password: string) => {
    await new Promise((res) => setTimeout(res, 500));
    persist({ id: Date.now().toString(), email });
  };

  const signOut = () => persist(null);

  const completeProfile = (profile: User["profile"]) => {
    if (!user) return;
    const updated = { ...user, profile, profileCompleted: true };
    persist(updated);
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, completeProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
