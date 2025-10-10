import { Test, TestingModule } from '@nestjs/testing';
import { LiquidityManagementController } from './liquidity-management.controller';
import { LiquidityManagementService } from './liquidity-management.service';

describe('LiquidityManagementController', () => {
  let liquidityManagementController: LiquidityManagementController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LiquidityManagementController],
      providers: [LiquidityManagementService],
    }).compile();

    liquidityManagementController = app.get<LiquidityManagementController>(LiquidityManagementController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(liquidityManagementController.getHello()).toBe('Hello World!');
    });
  });
});
