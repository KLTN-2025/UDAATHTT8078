import { createContext, useContext, useState, type ReactNode } from "react";
import type { Wallet, WalletType, Chain } from "@shared/schema";
import { useAuth } from "./AuthContext";

interface WalletContextType {
  wallet: Wallet | null;
  connectWallet: (type: WalletType, chain: Chain) => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const ACCOUNT_API_BASE = (import.meta as any).env?.VITE_ACCOUNT_API_BASE ?? "http://localhost:3001";

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const { loginWithWallet, session } = useAuth();

  const connectWallet = async (type: WalletType, chain: Chain) => {
    const mockAddresses: Record<WalletType, string> = {
      phantom: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      sui: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
      metamask: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    };

    const address = mockAddresses[type];

    // Backend login to create/find user + wallet account
    await loginWithWallet({ address, chain });

    setWallet({
      address,
      type,
      chain,
      connected: true,
    });
  };

  const disconnectWallet = async () => {
    if (wallet && session) {
      try {
        await fetch(`${ACCOUNT_API_BASE}/account/wallet/unlink`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": session.userId,
          },
          body: JSON.stringify({ address: wallet.address }),
          credentials: "include",
        });
      } catch (e) {
        console.error("Failed to unlink wallet", e);
      }
    }

    setWallet(null);
  };

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
