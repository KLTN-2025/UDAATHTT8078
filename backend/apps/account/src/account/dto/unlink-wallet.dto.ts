import { IsString } from 'class-validator';

export class UnlinkWalletDto {
  @IsString()
  address: string;
}
