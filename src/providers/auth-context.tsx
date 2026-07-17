"use client";

import { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut as baSignOut } from "@/lib/auth-client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthUser {
  id:       string;
  name:     string;
  email:    string;
  image?:   string | null;
}

interface AuthContextType {
  user:    AuthUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  // better-auth React hook — drives session state reactively
  const { data: session, isPending } = useSession();

  const user: AuthUser | null = session?.user
    ? {
        id:    session.user.id,
        name:  session.user.name,
        email: session.user.email,
        image: session.user.image,
      }
    : null;

  const signOut = async () => {
    await baSignOut({
      fetchOptions: {
        onSuccess: () => router.push("/"),
      },
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading: isPending, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
