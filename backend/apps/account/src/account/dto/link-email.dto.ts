import { IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class LinkEmailDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  primary?: boolean;
}
