import { Controller, Get } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly service: AccountService) {}

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

  @Patch('profile')
  updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
    return this.service.updateProfile(req.user.id, dto);
  }
}

