import { Asset } from '@libs/common/database/entities/asset.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
  ) {}

  async findAll(): Promise<Asset[]> {
    return this.assetRepository
      .createQueryBuilder('asset')
      .innerJoinAndSelect('asset.priceFeedProvider', 'priceFeedProvider')
      .getMany();
  }
}
