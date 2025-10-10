import { Module } from '@nestjs/common';
import { RedisPriceService } from './redis-price.service';

@Module({
  providers: [RedisPriceService],
  exports: [RedisPriceService],
})
export class RedisPriceModule {}
