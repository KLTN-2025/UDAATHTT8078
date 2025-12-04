import { IsIn, IsString } from 'class-validator';

export class LinkWalletDto {
  @IsString()
  @IsIn(['solana', 'sui'])
  chain: 'solana' | 'sui';

  @IsString()
  address: string;
}
