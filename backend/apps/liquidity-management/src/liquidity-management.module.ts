import { Module } from '@nestjs/common';
import { LiquidityManagementController } from './liquidity-management.controller';
import { LiquidityManagementService } from './liquidity-management.service';

@Module({
  imports: [],
  controllers: [LiquidityManagementController],
  providers: [LiquidityManagementService],
})
export class LiquidityManagementModule {}
