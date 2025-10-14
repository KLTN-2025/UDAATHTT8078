import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Layers, Percent } from "lucide-react";
import type { Portfolio } from "@shared/schema";

interface PortfolioCardProps {
  portfolio: Portfolio;
}

export default function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const stats = [
    {
      label: "Total Value",
      value: `$${portfolio.totalValue.toLocaleString()}`,
      icon: DollarSign,
      change: "+12.5%",
      positive: true,
    },
    {
      label: "Total Rewards",
      value: `$${portfolio.totalRewards.toLocaleString()}`,
      icon: TrendingUp,
      change: "+8.2%",
      positive: true,
    },
    {
      label: "Active Positions",
      value: portfolio.activePositions.toString(),
      icon: Layers,
    },
    {
      label: "Average APR",
      value: `${portfolio.averageApr}%`,
      icon: Percent,
      change: "+2.1%",
      positive: true,
    },
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-card-border bg-card">
        <CardTitle className="text-xl">Portfolio Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold tabular-nums" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  {stat.value}
                </span>
                {stat.change && (
                  <span className={`text-sm ${stat.positive ? "text-success" : "text-destructive"}`}>
                    {stat.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
