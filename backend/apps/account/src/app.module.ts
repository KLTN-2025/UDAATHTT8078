import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AccountModule } from './account/account.module';
import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  REDIS_DATABASE_NUMBER,
  REDIS_TLS,
} from './app.environment';
import { bullModule } from './config/config.bull';
import { RedisModule } from './redis/redis.module';
import { AssetModule } from './asset/asset.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { cacheModule } from 'libs/cache/cache.config';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    RedisModule.forRootAsync({
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD,
      db: REDIS_DATABASE_NUMBER,
      tls: REDIS_TLS === true ? {} : undefined,
    }),
    bullModule,
    cacheModule,
    ScheduleModule.forRoot(),
    AccountModule,
    AssetModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
