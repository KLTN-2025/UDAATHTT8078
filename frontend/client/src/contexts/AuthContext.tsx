import React, { createContext, useContext, useState } from "react";

interface AuthUser {
  id: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  avatarUrl: string | null;
}

interface AuthSession {
  userId: string;
  user: AuthUser;
}

interface AuthContextValue {
  session: AuthSession | null;
  loginWithEmail: (email: string) => Promise<void>;
  loginWithWallet: (params: { address: string; chain: "solana" | "sui" }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ACCOUNT_API_BASE = (import.meta as any).env?.VITE_ACCOUNT_API_BASE ?? "http://localhost:3001";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);

  async function loginWithEmail(email: string) {
    const res = await fetch(`${ACCOUNT_API_BASE}/auth/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      throw new Error(`Email login failed: ${res.status}`);
    }

    const data = await res.json();
    setSession({
      userId: data.userId,
      user: {
        id: data.user.id,
        email: data.user.email ?? null,
        emailVerified: Boolean(data.user.emailVerified),
        displayName: data.user.displayName ?? null,
        avatarUrl: data.user.avatarUrl ?? null,
      },
    });
  }

  async function loginWithWallet(params: { address: string; chain: "solana" | "sui" }) {
    const res = await fetch(`${ACCOUNT_API_BASE}/auth/wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: params.address, chain: params.chain }),
    });

    if (!res.ok) {
      throw new Error(`Wallet login failed: ${res.status}`);
    }

    const data = await res.json();
    setSession({
      userId: data.userId,
      user: {
        id: data.user.id,
        email: data.user.email ?? null,
        emailVerified: Boolean(data.user.emailVerified),
        displayName: data.user.displayName ?? null,
        avatarUrl: data.user.avatarUrl ?? null,
      },
    });
  }

  function logout() {
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ session, loginWithEmail, loginWithWallet, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}