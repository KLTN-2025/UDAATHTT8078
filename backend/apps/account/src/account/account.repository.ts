import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { UserAccount } from './entities/user-account.entity';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(UserAccount)
    private readonly accRepo: Repository<UserAccount>,
  ) {}

  // -------------------------
  // USER
  // -------------------------
  async findUserById(id: string) {
    return this.userRepo.findOne({
      where: { id },
      relations: ['accounts'],
    });
  }

  async updateUser(id: string, data: Partial<User>) {
    await this.userRepo.update({ id }, data);
    return this.findUserById(id);
  }

  // -------------------------
  // USER ACCOUNT
  // -------------------------
  async findAccountByValue(value: string) {
    return this.accRepo.findOne({ where: { value } });
  }

  async findUserAccount(userId: string, value: string) {
    return this.accRepo.findOne({
      where: { value, user: { id: userId } },
    });
  }

  async createAccount(data: Partial<UserAccount>) {
    const acc = this.accRepo.create(data);
    return this.accRepo.save(acc);
  }

  async removeAccount(acc: UserAccount) {
    return this.accRepo.remove(acc);
  }

  async listUserAccounts(userId: string) {
    return this.accRepo.find({
      where: { user: { id: userId } },
    });
  }
}
