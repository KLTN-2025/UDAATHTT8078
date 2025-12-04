import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserAccount } from './user-account.entity';
import { LinkWalletDto } from './dto/link-wallet.dto';
import { UnlinkWalletDto } from './dto/unlink-wallet.dto';
import { LinkEmailDto } from './dto/link-email.dto';
import { UnlinkEmailDto } from './dto/unlink-email.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserAccount) private accountRepo: Repository<UserAccount>,
  ) {}

  async getProfile(userId?: string) {
    if (!userId) {
      throw new BadRequestException('Missing user id');
    }

    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['accounts'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async linkWallet(userId: string, dto: LinkWalletDto) {
    const exists = await this.accountRepo.findOne({
      where: { value: dto.address },
    });

    if (exists) throw new BadRequestException('Wallet already linked');

    const account = this.accountRepo.create({
      user: { id: userId } as any,
      type: 'wallet',
      provider: dto.chain,
      value: dto.address,
    });

    return this.accountRepo.save(account);
  }

  async unlinkWallet(userId: string, dto: UnlinkWalletDto) {
    const account = await this.accountRepo.findOne({
      where: {
        value: dto.address,
        user: { id: userId },
      },
    });

    if (!account) throw new NotFoundException('Wallet not found');

    return this.accountRepo.remove(account);
  }

  async linkEmail(userId: string, dto: LinkEmailDto) {
    const exists = await this.accountRepo.findOne({
      where: { value: dto.email },
    });

    if (exists) throw new BadRequestException('Email already linked');

    const acc = this.accountRepo.create({
      user: { id: userId } as any,
      type: 'email',
      provider: 'passwordless',
      value: dto.email,
      isPrimary: true,
    });

    return this.accountRepo.save(acc);
  }

  async unlinkEmail(userId: string, dto: UnlinkEmailDto) {
    const account = await this.accountRepo.findOne({
      where: {
        value: dto.email,
        user: { id: userId },
        type: 'email',
      },
    });

    if (!account) {
      throw new NotFoundException('Email not linked');
    }

    return this.accountRepo.remove(account);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    await this.userRepo.update({ id: userId }, dto as any);
    return this.userRepo.findOne({ where: { id: userId } });
  }
}
