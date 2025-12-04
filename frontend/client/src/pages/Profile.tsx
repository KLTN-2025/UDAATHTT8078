import { useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import TransactionTable from "@/components/TransactionTable";
import { mockTransactions } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Activity, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAccountProfile } from "@/hooks/useAccountProfile";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

const ACCOUNT_API_BASE = (import.meta as any).env?.VITE_ACCOUNT_API_BASE ?? "http://localhost:3001";

export default function Profile() {
  const { wallet } = useWallet();
  const { data: profile } = useAccountProfile();
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [newEmail, setNewEmail] = useState("");

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Wallet className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Not signed in</h2>
            <p className="text-muted-foreground text-center">
              Use the email sign in or connect a wallet from the header to access your DeFAI account.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  const linkedWallets = profile?.accounts?.filter((a: any) => a.type === "wallet") ?? [];
  const primaryEmail =
    profile?.accounts?.find((a: any) => a.type === "email" && a.isPrimary) ?? null;

  const handleLinkEmail = async () => {
    if (!newEmail) return;
    await fetch(`${ACCOUNT_API_BASE}/account/email/link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": session.userId,
      },
      body: JSON.stringify({ email: newEmail }),
      credentials: "include",
    });
    setNewEmail("");
    await queryClient.invalidateQueries({ queryKey: ["account", "me"] });
  };

  const handleUnlinkEmail = async () => {
    if (!primaryEmail) return;
    await fetch(`${ACCOUNT_API_BASE}/account/email/unlink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": session.userId,
      },
      body: JSON.stringify({ email: primaryEmail.value }),
      credentials: "include",
    });
    await queryClient.invalidateQueries({ queryKey: ["account", "me"] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your wallet, linked accounts, and view transaction history</p>
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
            {primaryEmail && (
              <div className="mt-2 text-sm text-muted-foreground">
                Primary email: <span className="font-medium">{primaryEmail.value}</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Wallet Address</div>
            <div className="font-mono text-sm bg-muted p-3 rounded-md break-all" data-testid="text-wallet-address">
              {wallet.address}
            </div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground mb-2">Linked Wallets</div>
            {linkedWallets.length === 0 ? (
              <div className="text-xs text-muted-foreground">No linked wallets in backend profile yet.</div>
            ) : (
              <ul className="text-xs space-y-1 font-mono">
                {linkedWallets.map((acc: any) => (
                  <li key={acc.id}>{acc.provider}: {acc.value}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="pt-4 border-t border-border space-y-2">
            <div className="text-sm text-muted-foreground mb-1">Email linkage</div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Add or update email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="sm:flex-1"
              />
              <Button size="sm" onClick={handleLinkEmail} disabled={!newEmail}>
                Link Email
              </Button>
              {primaryEmail && (
                <Button variant="outline" size="sm" onClick={handleUnlinkEmail}>
                  Unlink Email
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
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
