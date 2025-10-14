import { z } from "zod";

export type Chain = "solana" | "sui";
export type Protocol = "raydium" | "cetus" | "momentum";
export type WalletType = "phantom" | "sui" | "metamask";

export const poolSchema = z.object({
  id: z.string(),
  protocol: z.enum(["raydium", "cetus", "momentum"]),
  chain: z.enum(["solana", "sui"]),
  name: z.string(),
  tokenA: z.string(),
  tokenB: z.string(),
  apr: z.number(),
  tvl: z.number(),
  volume24h: z.number(),
  fees24h: z.number(),
  myLiquidity: z.number().optional(),
});

export type Pool = z.infer<typeof poolSchema>;

export const strategyRecommendationSchema = z.object({
  id: z.string(),
  poolId: z.string(),
  title: z.string(),
  description: z.string(),
  confidence: z.number(),
  expectedApr: z.number(),
  estimatedIL: z.number(),
  reason: z.string(),
  suggestedAmount: z.number(),
  timestamp: z.string(),
});

export type StrategyRecommendation = z.infer<typeof strategyRecommendationSchema>;

export const transactionSchema = z.object({
  id: z.string(),
  type: z.enum(["add_liquidity", "remove_liquidity", "claim_rewards"]),
  pool: z.string(),
  amount: z.number(),
  timestamp: z.string(),
  status: z.enum(["pending", "success", "failed"]),
  txHash: z.string(),
});

export type Transaction = z.infer<typeof transactionSchema>;

export const portfolioSchema = z.object({
  totalValue: z.number(),
  totalRewards: z.number(),
  activePositions: z.number(),
  averageApr: z.number(),
});

export type Portfolio = z.infer<typeof portfolioSchema>;

export const walletSchema = z.object({
  address: z.string(),
  type: z.enum(["phantom", "sui", "metamask"]),
  chain: z.enum(["solana", "sui"]),
  connected: z.boolean(),
});

export type Wallet = z.infer<typeof walletSchema>;
