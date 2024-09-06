import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

declare global {
  namespace Express {
    export interface User {
      id: number;
      email: string;
    }
  }
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const accessToken = await this.authService.getAccessToken({
      email: req.user.email,
      id: req.user.id,
    });

    res.redirect(
      `${this.configService.get('app.frontendUrl')}?accessToken=${accessToken}`,
    );
  }
}
