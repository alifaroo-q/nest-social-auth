import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomConfigModule } from 'src/config/config.module';
import { UserModule } from 'src/module/feature/users/user.module';
import { JwtModule } from '../jwt/jwt.module';
import { GoogleStrategy } from './strategy/google-auth.strategy';
import { JwtStrategy } from './strategy/jwt-auth.strategy';

@Module({
  imports: [CustomConfigModule, UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
})
export class AuthModule {}
