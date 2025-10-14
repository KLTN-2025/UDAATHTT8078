import { WalletProvider } from "@/contexts/WalletContext";
import WalletButton from "../WalletButton";
import { useEffect } from "react";
import { useWallet } from "@/contexts/WalletContext";

function WalletButtonContent() {
  const { connectWallet } = useWallet();

  useEffect(() => {
    connectWallet("phantom", "solana");
  }, []);

  return <WalletButton />;
}

export default function WalletButtonExample() {
  return (
    <WalletProvider>
      <WalletButtonContent />
    </WalletProvider>
  );
}
