import { NestFactory } from '@nestjs/core';
import { LiquidityManagementModule } from './liquidity-management.module';

async function bootstrap() {
  const app = await NestFactory.create(LiquidityManagementModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
