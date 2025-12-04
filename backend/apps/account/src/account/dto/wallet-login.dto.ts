import { IsIn, IsString } from 'class-validator';

export class WalletLoginDto {
  @IsString()
  address: string;

  @IsString()
  @IsIn(['solana', 'sui'])
  chain: 'solana' | 'sui';
}