import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletManagementService {
  getHello(): string {
    return 'Hello World!';
  }
}
