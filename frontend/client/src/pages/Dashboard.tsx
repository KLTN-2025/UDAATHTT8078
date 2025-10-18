import PortfolioCard from "@/components/PortfolioCard";
import PoolCard from "@/components/PoolCard";
import AIRecommendationCard from "@/components/AIRecommendationCard";
import { mockPortfolio, mockPools, mockRecommendations } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const myPools = mockPools.filter(p => p.myLiquidity && p.myLiquidity > 0);
  const topRecommendations = mockRecommendations.slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your liquidity positions and AI recommendations</p>
      </div>

      <PortfolioCard portfolio={mockPortfolio} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">My Positions</h2>
            <div className="text-sm text-muted-foreground">{myPools.length} active</div>
          </div>
          {myPools.length > 0 ? (
            <div className="grid gap-4">
              {myPools.map((pool) => (
                <PoolCard
                  key={pool.id}
                  pool={pool}
                  onAddLiquidity={(p) => console.log("Add liquidity to", p.name)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No active positions</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-info" />
            <h2 className="text-xl font-semibold">AI Recommendations</h2>
          </div>
          <div className="grid gap-4">
            {topRecommendations.map((rec) => (
              <AIRecommendationCard
                key={rec.id}
                recommendation={rec}
                onApply={(r) => console.log("Apply recommendation", r.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
