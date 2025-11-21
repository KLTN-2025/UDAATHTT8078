export class LinkWalletDto {
  @IsString()
  chain: string; // "solana" | "sui"

  @IsString()
  address: string;
}
