import AIRecommendationCard from "@/components/AIRecommendationCard";
import { mockRecommendations } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

export default function AIAgent() {
  const features = [
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Real-time analysis of pool performance and market trends",
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "AI-powered impermanent loss prediction and risk scoring",
    },
    {
      icon: Zap,
      title: "Auto-Optimization",
      description: "Automatic position rebalancing for maximum returns",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2 flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-info" />
          AI Agent
        </h1>
        <p className="text-muted-foreground">
          AI-powered insights and recommendations to optimize your liquidity strategy
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <div className="p-2 rounded-md bg-info/10 w-fit mb-2">
                <feature.icon className="h-5 w-5 text-info" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Active Recommendations</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {mockRecommendations.map((rec) => (
            <AIRecommendationCard
              key={rec.id}
              recommendation={rec}
              onApply={(r) => console.log("Apply recommendation", r.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
