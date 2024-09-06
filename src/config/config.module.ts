// NestJS Common Imports
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

// Loaders
import appConfig from './loaders/app.config';
import dbConfig from './loaders/database.config';

// Validation
import { validationSchema } from './schema';
import googleOAuthConfig from './loaders/google-oauth.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      ignoreEnvFile: false,
      load: [appConfig, dbConfig, googleOAuthConfig],
      validate: validationSchema.parse,
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
})
export class CustomConfigModule {}
