import { Test, TestingModule } from '@nestjs/testing';
import { WalletManagementController } from './wallet-management.controller';
import { WalletManagementService } from './wallet-management.service';

describe('WalletManagementController', () => {
  let walletManagementController: WalletManagementController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WalletManagementController],
      providers: [WalletManagementService],
    }).compile();

    walletManagementController = app.get<WalletManagementController>(WalletManagementController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(walletManagementController.getHello()).toBe('Hello World!');
    });
  });
});
