import { Test, TestingModule } from '@nestjs/testing';
import { SvmService } from './svm.service';

describe('SvmService', () => {
  let service: SvmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SvmService],
    }).compile();

    service = module.get<SvmService>(SvmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
