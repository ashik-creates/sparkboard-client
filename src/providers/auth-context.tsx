"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  plan: "free" | "pro";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (name: string, email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("sparkboard_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (name: string, email: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser: User = {
      name: name || "Jane Doe",
      email: email || "jane@example.com",
      plan: "free",
    };
    localStorage.setItem("sparkboard_user", JSON.stringify(newUser));
    // Set a dummy cookie to make Next.js middleware happy
    document.cookie = "better-auth.session-token=mock-token; path=/";
    setUser(newUser);
    setLoading(false);
    router.push("/ideas");
  };

  const signOut = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    localStorage.removeItem("sparkboard_user");
    // Clear dummy cookie
    document.cookie = "better-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setUser(null);
    setLoading(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
