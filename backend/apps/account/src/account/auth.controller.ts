import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { EmailLoginDto } from './dto/email-login.dto';
import { WalletLoginDto } from './dto/wallet-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('email')
  async loginWithEmail(@Body() dto: EmailLoginDto) {
    return this.authService.loginWithEmail(dto);
  }

  @Post('wallet')
  async loginWithWallet(@Body() dto: WalletLoginDto) {
    return this.authService.loginWithWallet(dto);
  }
}