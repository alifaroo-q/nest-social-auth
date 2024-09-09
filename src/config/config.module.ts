// NestJS Common Imports
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

// Loaders
import appConfig from './loaders/app.config';
import dbConfig from './loaders/database.config';

// Validation
import { validationSchema } from './schema';
import googleOAuthConfig from './loaders/google-oauth.config';
import githubOauthConfig from './loaders/github-oauth.config';
import facebookAuthConfig from './loaders/facebook-auth.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      ignoreEnvFile: false,
      load: [
        appConfig,
        dbConfig,
        googleOAuthConfig,
        githubOauthConfig,
        facebookAuthConfig,
      ],
      validate: validationSchema.parse,
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
})
export class CustomConfigModule {}
