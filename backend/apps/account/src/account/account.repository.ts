import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UserAccount, UserAccountType } from './user-account.entity';

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

  async findUserByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
      relations: ['accounts'],
    });
  }

  async createUser(data: Partial<User>) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
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

  async findOrCreateUserWithAccount(options: {
    type: UserAccountType;
    provider: string;
    value: string;
    email?: string | null;
  }) {
    const existingAccount = await this.findAccountByValue(options.value);
    if (existingAccount) {
      const user = await this.findUserById(existingAccount.user.id);
      return { user, account: existingAccount };
    }

    let user = options.email
      ? await this.findUserByEmail(options.email)
      : undefined;

    if (!user) {
      user = await this.createUser({
        email: options.email ?? null,
        emailVerified: false,
      });
    }

    const account = await this.createAccount({
      user,
      type: options.type,
      provider: options.provider,
      value: options.value,
      isPrimary: options.type === 'email',
    });

    return { user, account };
  }
}
