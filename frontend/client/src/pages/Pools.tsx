import { useState } from "react";
import PoolCard from "@/components/PoolCard";
import { mockPools } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function Pools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [chainFilter, setChainFilter] = useState<string>("all");
  const [protocolFilter, setProtocolFilter] = useState<string>("all");

  const filteredPools = mockPools.filter((pool) => {
    const matchesSearch = pool.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChain = chainFilter === "all" || pool.chain === chainFilter;
    const matchesProtocol = protocolFilter === "all" || pool.protocol === protocolFilter;
    return matchesSearch && matchesChain && matchesProtocol;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Liquidity Pools</h1>
        <p className="text-muted-foreground">
          Discover and manage liquidity pools across Solana and Sui blockchains
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-pools"
          />
        </div>
        <Select value={chainFilter} onValueChange={setChainFilter}>
          <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-chain-filter">
            <SelectValue placeholder="All Chains" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Chains</SelectItem>
            <SelectItem value="solana">Solana</SelectItem>
            <SelectItem value="sui">Sui</SelectItem>
          </SelectContent>
        </Select>
        <Select value={protocolFilter} onValueChange={setProtocolFilter}>
          <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-protocol-filter">
            <SelectValue placeholder="All Protocols" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Protocols</SelectItem>
            <SelectItem value="raydium">Raydium</SelectItem>
            <SelectItem value="cetus">Cetus</SelectItem>
            <SelectItem value="momentum">Momentum</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPools.map((pool) => (
          <PoolCard
            key={pool.id}
            pool={pool}
            onAddLiquidity={(p) => console.log("Add liquidity to", p.name)}
          />
        ))}
      </div>

      {filteredPools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No pools found matching your filters</p>
        </div>
      )}
    </div>
  );
}
