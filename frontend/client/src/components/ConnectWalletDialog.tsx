import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Wallet } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import type { WalletType, Chain } from "@shared/schema";

const wallets: { type: WalletType; chain: Chain; name: string; icon: string }[] = [
  { type: "phantom", chain: "solana", name: "Phantom", icon: "👻" },
  { type: "sui", chain: "sui", name: "Sui Wallet", icon: "🌊" },
  { type: "metamask", chain: "solana", name: "MetaMask", icon: "🦊" },
];

export default function ConnectWalletDialog() {
  const [open, setOpen] = useState(false);
  const { connectWallet } = useWallet();

  const handleConnect = (type: WalletType, chain: Chain) => {
    connectWallet(type, chain);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2" data-testid="button-connect-wallet">
          <Wallet className="h-5 w-5" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to connect to DeFAI Platform
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {wallets.map((wallet) => (
            <Button
              key={wallet.type}
              variant="outline"
              className="justify-start gap-3 h-auto py-4"
              onClick={() => handleConnect(wallet.type, wallet.chain)}
              data-testid={`button-wallet-${wallet.type}`}
            >
              <span className="text-2xl">{wallet.icon}</span>
              <div className="flex flex-col items-start">
                <span className="font-semibold">{wallet.name}</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {wallet.chain} Network
                </span>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
