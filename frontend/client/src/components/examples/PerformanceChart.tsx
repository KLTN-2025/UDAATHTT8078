import PerformanceChart from "../PerformanceChart";

export default function PerformanceChartExample() {
  return (
    <div className="grid gap-4">
      <PerformanceChart type="apr" />
      <PerformanceChart type="il" />
    </div>
  );
}
