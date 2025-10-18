import { useWallet } from "@/contexts/WalletContext";
import TransactionTable from "@/components/TransactionTable";
import { mockTransactions } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Activity, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
  const { wallet } = useWallet();

  if (!wallet) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Wallet className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Wallet Connected</h2>
            <p className="text-muted-foreground text-center">
              Connect your wallet to view your profile and transaction history
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your wallet and view transaction history</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <div className="p-3 rounded-md bg-primary/10">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl mb-1">Connected Wallet</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {wallet.type}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {wallet.chain}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Wallet Address</div>
            <div className="font-mono text-sm bg-muted p-3 rounded-md break-all" data-testid="text-wallet-address">
              {wallet.address}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Status</div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span className="text-sm font-medium">Connected</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Network</div>
              <div className="text-sm font-medium capitalize">{wallet.chain}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <History className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Transaction History</h2>
        </div>
        <TransactionTable transactions={mockTransactions} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            <CardTitle>Activity Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Total Transactions</div>
              <div className="text-2xl font-semibold tabular-nums">{mockTransactions.length}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Liquidity Added</div>
              <div className="text-2xl font-semibold tabular-nums">
                ${mockTransactions
                  .filter(tx => tx.type === "add_liquidity")
                  .reduce((sum, tx) => sum + tx.amount, 0)
                  .toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Rewards Claimed</div>
              <div className="text-2xl font-semibold tabular-nums text-success">
                ${mockTransactions
                  .filter(tx => tx.type === "claim_rewards")
                  .reduce((sum, tx) => sum + tx.amount, 0)
                  .toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Success Rate</div>
              <div className="text-2xl font-semibold tabular-nums">
                {((mockTransactions.filter(tx => tx.status === "success").length / mockTransactions.length) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
