import { Injectable } from '@nestjs/common';

import { AccountRepository } from './account.repository';
import { EmailLoginDto } from './dto/email-login.dto';
import { WalletLoginDto } from './dto/wallet-login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly accounts: AccountRepository) {}

  async loginWithEmail(dto: EmailLoginDto) {
    const { email } = dto;

    const { user, account } = await this.accounts.findOrCreateUserWithAccount({
      type: 'email',
      provider: 'passwordless',
      value: email.toLowerCase(),
      email: email.toLowerCase(),
    });

    return {
      userId: user.id,
      user: {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
      },
      account: {
        id: account.id,
        type: account.type,
        provider: account.provider,
        value: account.value,
        isPrimary: account.isPrimary,
      },
    };
  }

  async loginWithWallet(dto: WalletLoginDto) {
    const { address, chain } = dto;

    const { user, account } = await this.accounts.findOrCreateUserWithAccount({
      type: 'wallet',
      provider: chain,
      value: address,
    });

    return {
      userId: user.id,
      user: {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
      },
      account: {
        id: account.id,
        type: account.type,
        provider: account.provider,
        value: account.value,
        isPrimary: account.isPrimary,
      },
    };
  }
}