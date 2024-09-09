import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('githubOAuth.clientId'),
      clientSecret: configService.get<string>('githubOAuth.clientSecret'),
      callbackURL: configService.get<string>('githubOAuth.callbackUrl'),
      scope: ['public_profile'],
    });

    configService.get('githubOAuth');
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    const user = await this.authService.validateFacebookUser({
      email: profile.emails[0].value,
      first_name: profile.displayName.split(' ')[0] || '',
      last_name: profile.displayName.split(' ')[1] || '',
      avatarUrl: profile.photos[0].value,
      password: '',
    });

    return user;
  }
}
