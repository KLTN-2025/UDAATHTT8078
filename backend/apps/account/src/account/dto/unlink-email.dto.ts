import { IsEmail } from 'class-validator';

export class UnlinkEmailDto {
  @IsEmail()
  email: string;
}
