import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import type { StrategyRecommendation } from "@shared/schema";

interface AIRecommendationCardProps {
  recommendation: StrategyRecommendation;
  onApply?: (recommendation: StrategyRecommendation) => void;
}

export default function AIRecommendationCard({ recommendation, onApply }: AIRecommendationCardProps) {
  const confidenceColor = recommendation.confidence >= 0.8 ? "text-success" : recommendation.confidence >= 0.6 ? "text-warning" : "text-muted-foreground";
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diff < 1) return "Just now";
    if (diff === 1) return "1 hour ago";
    if (diff < 24) return `${diff} hours ago`;
    return `${Math.floor(diff / 24)} days ago`;
  };

  return (
    <Card className="border-info/20" data-testid={`recommendation-card-${recommendation.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="p-2 rounded-md bg-info/10">
              <Sparkles className="h-5 w-5 text-info" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg mb-1">{recommendation.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{recommendation.description}</p>
            </div>
          </div>
          <Badge variant="outline" className="flex-shrink-0">
            AI
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Confidence</div>
            <div className={`text-lg font-semibold tabular-nums ${confidenceColor}`}>
              {(recommendation.confidence * 100).toFixed(0)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Expected APR</div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-success tabular-nums">
                {recommendation.expectedApr}%
              </span>
              <TrendingUp className="h-3 w-3 text-success" />
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Est. IL</div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-warning tabular-nums">
                {recommendation.estimatedIL}%
              </span>
              <AlertTriangle className="h-3 w-3 text-warning" />
            </div>
          </div>
        </div>

        <div className="p-3 rounded-md bg-muted/50">
          <div className="text-xs text-muted-foreground mb-1">AI Analysis</div>
          <p className="text-sm">{recommendation.reason}</p>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <div>
            <div className="text-xs text-muted-foreground">Suggested Amount</div>
            <div className="text-lg font-semibold tabular-nums">
              ${recommendation.suggestedAmount.toLocaleString()}
            </div>
          </div>
          <Button onClick={() => onApply?.(recommendation)} data-testid={`button-apply-${recommendation.id}`}>
            Apply Strategy
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-right">
          {formatTime(recommendation.timestamp)}
        </div>
      </CardContent>
    </Card>
  );
}
