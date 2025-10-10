import { Controller, Get } from '@nestjs/common';
import { LiquidityManagementService } from './liquidity-management.service';

@Controller()
export class LiquidityManagementController {
  constructor(private readonly liquidityManagementService: LiquidityManagementService) {}

  @Get()
  getHello(): string {
    return this.liquidityManagementService.getHello();
  }
}
