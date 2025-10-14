import { createContext, useContext, useState, type ReactNode } from "react";
import type { Wallet, WalletType, Chain } from "@shared/schema";

interface WalletContextType {
  wallet: Wallet | null;
  connectWallet: (type: WalletType, chain: Chain) => void;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const connectWallet = (type: WalletType, chain: Chain) => {
    const mockAddresses: Record<WalletType, string> = {
      phantom: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      sui: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
      metamask: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    };

    setWallet({
      address: mockAddresses[type],
      type,
      chain,
      connected: true,
    });
  };

  const disconnectWallet = () => {
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
