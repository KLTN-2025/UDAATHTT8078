import { Asset } from '@libs/common/database/entities/asset.entity';
import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetService } from './asset.service';

@ApiTags('asset')
@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all assets',
    type: Asset,
    isArray: true,
  })
  async findAll(): Promise<Asset[]> {
    return this.assetService.findAll();
  }
}
