import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';

import { User } from './entities/user.entity';
import { UserAccount } from './entities/user-account.entity';

import { AccountRepository } from './account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAccount])],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
  exports: [AccountService],
})
export class AccountModule {}
