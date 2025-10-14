import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const aprData = [
  { date: "Jan", manual: 18, ai: 24 },
  { date: "Feb", manual: 19, ai: 26 },
  { date: "Mar", manual: 17, ai: 28 },
  { date: "Apr", manual: 20, ai: 30 },
  { date: "May", manual: 19, ai: 32 },
  { date: "Jun", manual: 21, ai: 31 },
];

const ilData = [
  { date: "Jan", manual: 3.2, ai: 1.8 },
  { date: "Feb", manual: 4.1, ai: 2.1 },
  { date: "Mar", manual: 5.3, ai: 2.4 },
  { date: "Apr", manual: 4.8, ai: 2.0 },
  { date: "May", manual: 5.6, ai: 2.3 },
  { date: "Jun", manual: 4.9, ai: 1.9 },
];

interface PerformanceChartProps {
  type: "apr" | "il";
}

export default function PerformanceChart({ type }: PerformanceChartProps) {
  const data = type === "apr" ? aprData : ilData;
  const title = type === "apr" ? "APR Comparison (6 Months)" : "Impermanent Loss Comparison (6 Months)";
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {type === "apr" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
                label={{ value: "APR (%)", angle: -90, position: "insideLeft", style: { fill: "hsl(var(--muted-foreground))" } }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="manual"
                name="Manual Strategy"
                stroke="hsl(var(--chart-4))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-4))" }}
              />
              <Line
                type="monotone"
                dataKey="ai"
                name="AI Strategy"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-1))" }}
              />
            </LineChart>
          ) : (
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
                label={{ value: "IL (%)", angle: -90, position: "insideLeft", style: { fill: "hsl(var(--muted-foreground))" } }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="manual"
                name="Manual Strategy"
                stroke="hsl(var(--chart-4))"
                fill="hsl(var(--chart-4) / 0.2)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="ai"
                name="AI Strategy"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1) / 0.2)"
                strokeWidth={2}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
