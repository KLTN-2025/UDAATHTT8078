import { Wallet, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWallet } from "@/contexts/WalletContext";
import { Badge } from "@/components/ui/badge";

export default function WalletButton() {
  const { wallet, disconnectWallet } = useWallet();

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (wallet) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2" data-testid="button-wallet-connected">
            <Wallet className="h-4 w-4" />
            <span className="font-mono text-sm">{truncateAddress(wallet.address)}</span>
            <Badge variant="secondary" className="ml-1 capitalize">
              {wallet.chain}
            </Badge>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>Wallet Info</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="px-2 py-2">
            <div className="text-xs text-muted-foreground mb-1">Address</div>
            <div className="font-mono text-sm">{wallet.address}</div>
          </div>
          <div className="px-2 py-2">
            <div className="text-xs text-muted-foreground mb-1">Type</div>
            <div className="text-sm capitalize">{wallet.type}</div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={disconnectWallet} data-testid="button-disconnect-wallet">
            Disconnect Wallet
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return null;
}
