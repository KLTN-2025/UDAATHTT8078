import PoolCard from "../PoolCard";
import { mockPools } from "@/lib/mockData";

export default function PoolCardExample() {
  return (
    <div className="grid gap-4 max-w-md">
      <PoolCard pool={mockPools[0]} onAddLiquidity={(pool) => console.log("Add liquidity to", pool.name)} />
      <PoolCard pool={mockPools[1]} onAddLiquidity={(pool) => console.log("Add liquidity to", pool.name)} />
    </div>
  );
}
