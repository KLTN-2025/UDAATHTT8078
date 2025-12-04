import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';

import { User } from './user.entity';
import { UserAccount } from './user-account.entity';

import { AccountRepository } from './account.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAccount])],
  controllers: [AccountController, AuthController],
  providers: [AccountService, AccountRepository, AuthService],
  exports: [AccountService, AuthService, AccountRepository],
})
export class AccountModule {}
