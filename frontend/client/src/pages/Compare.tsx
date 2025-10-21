import PerformanceChart from "@/components/PerformanceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function Compare() {
  const comparison = [
    {
      metric: "Average APR",
      manual: "19.5%",
      ai: "28.7%",
      improvement: "+47%",
      icon: TrendingUp,
      positive: true,
    },
    {
      metric: "Impermanent Loss",
      manual: "4.8%",
      ai: "2.1%",
      improvement: "-56%",
      icon: TrendingDown,
      positive: true,
    },
    {
      metric: "Total Returns (6mo)",
      manual: "$2,340",
      ai: "$3,890",
      improvement: "+66%",
      icon: DollarSign,
      positive: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Strategy Comparison</h1>
        <p className="text-muted-foreground">
          Compare manual liquidity providing vs AI-assisted strategies
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {comparison.map((item) => (
          <Card key={item.metric}>
            <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.metric}</CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Manual</div>
                  <div className="text-lg font-semibold tabular-nums">{item.manual}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">AI-Assisted</div>
                  <div className="text-lg font-semibold tabular-nums text-primary">{item.ai}</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <div className="text-sm font-medium text-success">{item.improvement}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PerformanceChart type="apr" />
        <PerformanceChart type="il" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
            <p className="text-sm">
              AI-assisted strategies consistently outperform manual strategies by identifying optimal
              entry and exit points based on market conditions and historical data.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
            <p className="text-sm">
              Impermanent loss is significantly reduced through AI-powered correlation analysis and
              automated rebalancing strategies.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
            <p className="text-sm">
              Total returns show a 66% improvement with AI assistance, demonstrating the value of
              data-driven decision making in DeFi liquidity provision.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
