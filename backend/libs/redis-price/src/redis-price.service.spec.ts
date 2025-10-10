import { Test, TestingModule } from '@nestjs/testing';
import { RedisPriceService } from './redis-price.service';

describe('RedisPriceService', () => {
  let service: RedisPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisPriceService],
    }).compile();

    service = module.get<RedisPriceService>(RedisPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
