import { NestFactory } from '@nestjs/core';
import { WalletManagementModule } from './wallet-management.module';

async function bootstrap() {
  const app = await NestFactory.create(WalletManagementModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
