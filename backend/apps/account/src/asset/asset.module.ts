import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@libs/common/database/entities/entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [AssetService],
  controllers: [AssetController],
})
export class AssetModule {}
