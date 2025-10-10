import { Module } from '@nestjs/common';
import { LiquidityPoolService } from './liquidity-pool.service';

@Module({
  providers: [LiquidityPoolService],
  exports: [LiquidityPoolService],
})
export class LiquidityPoolModule {}
