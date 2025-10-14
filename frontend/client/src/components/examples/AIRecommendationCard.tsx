import AIRecommendationCard from "../AIRecommendationCard";
import { mockRecommendations } from "@/lib/mockData";

export default function AIRecommendationCardExample() {
  return (
    <div className="grid gap-4 max-w-2xl">
      {mockRecommendations.slice(0, 2).map((rec) => (
        <AIRecommendationCard
          key={rec.id}
          recommendation={rec}
          onApply={(r) => console.log("Apply recommendation", r.title)}
        />
      ))}
    </div>
  );
}
