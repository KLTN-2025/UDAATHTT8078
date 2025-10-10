import { Module } from '@nestjs/common';
import { SvmService } from './svm.service';

@Module({
  providers: [SvmService],
  exports: [SvmService],
})
export class SvmModule {}
