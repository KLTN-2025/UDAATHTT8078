import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserAccount) private accountRepo: Repository<UserAccount>,
  ) {}

  async linkWallet(userId: string, dto: LinkWalletDto) {
    const exists = await this.accountRepo.findOne({
      where: { value: dto.address },
    });

    if (exists) throw new BadRequestException('Wallet already linked');

    const account = this.accountRepo.create({
      user: { id: userId },
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
      user: { id: userId },
      type: 'email',
      provider: 'passwordless',
      value: dto.email,
      isPrimary: true,
    });

    return this.accountRepo.save(acc);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    await this.userRepo.update({ id: userId }, dto);
    return this.userRepo.findOne({ where: { id: userId } });
  }
}
