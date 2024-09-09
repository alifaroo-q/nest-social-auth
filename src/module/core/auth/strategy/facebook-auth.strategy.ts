import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get('facebookOAuth.appId'),
      clientSecret: configService.get('facebookOAuth.appSecret'),
      callbackURL: configService.get('facebookOAuth.callbackUrl'),
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const user = await this.authService.validateFacebookUser({
      email: profile.emails[0].value,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      avatarUrl: '',
      password: '',
    });

    done(null, user);
  }
}
