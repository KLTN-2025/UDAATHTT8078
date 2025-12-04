import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AccountService } from './account.service';
import { LinkWalletDto } from './dto/link-wallet.dto';
import { UnlinkWalletDto } from './dto/unlink-wallet.dto';
import { LinkEmailDto } from './dto/link-email.dto';
import { UnlinkEmailDto } from './dto/unlink-email.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Get('me')
  getMe(@Req() req) {
    return this.service.getProfile(req.user?.id);
  }

  @Post('wallet/link')
  linkWallet(@Req() req, @Body() dto: LinkWalletDto) {
    return this.service.linkWallet(req.user.id, dto);
  }

  @Post('wallet/unlink')
  unlinkWallet(@Req() req, @Body() dto: UnlinkWalletDto) {
    return this.service.unlinkWallet(req.user.id, dto);
  }

  @Post('email/link')
  linkEmail(@Req() req, @Body() dto: LinkEmailDto) {
    return this.service.linkEmail(req.user.id, dto);
  }

  @Post('email/unlink')
  unlinkEmail(@Req() req, @Body() dto: UnlinkEmailDto) {
    return this.service.unlinkEmail(req.user.id, dto);
  }

  @Patch('profile')
  updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
    return this.service.updateProfile(req.user.id, dto);
  }
}
