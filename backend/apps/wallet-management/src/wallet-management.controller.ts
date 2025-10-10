import { Controller, Get } from '@nestjs/common';
import { WalletManagementService } from './wallet-management.service';

@Controller()
export class WalletManagementController {
  constructor(private readonly walletManagementService: WalletManagementService) {}

  @Get()
  getHello(): string {
    return this.walletManagementService.getHello();
  }
}
