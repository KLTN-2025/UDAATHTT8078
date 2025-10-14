import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Droplets } from "lucide-react";
import type { Pool } from "@shared/schema";

interface PoolCardProps {
  pool: Pool;
  onAddLiquidity?: (pool: Pool) => void;
}

export default function PoolCard({ pool, onAddLiquidity }: PoolCardProps) {
  const protocolColors: Record<string, string> = {
    raydium: "bg-primary/10 text-primary border-primary/20",
    cetus: "bg-info/10 text-info border-info/20",
    momentum: "bg-success/10 text-success border-success/20",
  };

  return (
    <Card className="hover-elevate" data-testid={`pool-card-${pool.id}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-lg">{pool.tokenA}</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-semibold text-lg">{pool.tokenB}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge variant="outline" className={protocolColors[pool.protocol]}>
            {pool.protocol}
          </Badge>
          <Badge variant="secondary" className="capitalize">
            {pool.chain}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">APR</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold text-success tabular-nums" data-testid={`pool-apr-${pool.id}`}>
                {pool.apr}%
              </span>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">TVL</div>
            <div className="text-lg font-semibold tabular-nums">
              ${(pool.tvl / 1000000).toFixed(2)}M
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">24h Volume</div>
            <div className="text-sm font-medium tabular-nums">
              ${(pool.volume24h / 1000000).toFixed(2)}M
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">24h Fees</div>
            <div className="text-sm font-medium tabular-nums">
              ${pool.fees24h.toLocaleString()}
            </div>
          </div>
        </div>

        {pool.myLiquidity && pool.myLiquidity > 0 && (
          <div className="pt-3 border-t border-border">
            <div className="text-xs text-muted-foreground mb-1">My Liquidity</div>
            <div className="text-lg font-semibold text-primary tabular-nums">
              ${pool.myLiquidity.toLocaleString()}
            </div>
          </div>
        )}

        <Button
          className="w-full gap-2"
          onClick={() => onAddLiquidity?.(pool)}
          data-testid={`button-add-liquidity-${pool.id}`}
        >
          <Droplets className="h-4 w-4" />
          {pool.myLiquidity && pool.myLiquidity > 0 ? "Add More Liquidity" : "Add Liquidity"}
        </Button>
      </CardContent>
    </Card>
  );
}
