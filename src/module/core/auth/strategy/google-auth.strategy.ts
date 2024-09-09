import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('googleOAuth.clientId'),
      clientSecret: configService.get('googleOAuth.clientSecret'),
      callbackURL: configService.get('googleOAuth.callbackUrl'),
      prompt: 'select_account',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      avatarUrl: profile.photos[0].value,
      password: '',
    });

    return user;
  }
}
