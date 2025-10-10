import { Module } from '@nestjs/common';
import { WalletManagementController } from './wallet-management.controller';
import { WalletManagementService } from './wallet-management.service';

@Module({
  imports: [],
  controllers: [WalletManagementController],
  providers: [WalletManagementService],
})
export class WalletManagementModule {}
