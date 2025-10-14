import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import type { Transaction } from "@shared/schema";

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const statusColors: Record<string, string> = {
    success: "bg-success/10 text-success border-success/20",
    pending: "bg-warning/10 text-warning border-warning/20",
    failed: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const typeLabels: Record<string, string> = {
    add_liquidity: "Add Liquidity",
    remove_liquidity: "Remove Liquidity",
    claim_rewards: "Claim Rewards",
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  };

  return (
    <div className="rounded-md border border-card-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Pool</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Transaction</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id} data-testid={`transaction-row-${tx.id}`}>
              <TableCell className="font-medium">{typeLabels[tx.type]}</TableCell>
              <TableCell>{tx.pool}</TableCell>
              <TableCell className="text-right tabular-nums">${tx.amount.toLocaleString()}</TableCell>
              <TableCell className="text-muted-foreground">{formatDate(tx.timestamp)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusColors[tx.status]}>
                  {tx.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <button
                  className="inline-flex items-center gap-1 font-mono text-sm text-primary hover-elevate active-elevate-2 rounded px-2 py-1"
                  onClick={() => console.log("View transaction", tx.txHash)}
                  data-testid={`button-view-tx-${tx.id}`}
                >
                  {truncateHash(tx.txHash)}
                  <ExternalLink className="h-3 w-3" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
