import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateNewUserDto } from 'src/module/feature/users/dto/create-new-user.dto';
import { UserService } from 'src/module/feature/users/user.service';
import { JwtPayload } from 'src/types/common.type';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getAccessToken(payload: JwtPayload) {
    return this.jwtService.generateAuthToken(payload);
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new UnauthorizedException('User not found!');
    return {
      id: user.id,
      email: user.email,
    };
  }

  async validateGoogleUser(googleUser: CreateNewUserDto) {
    const user = await this.userService.getUserByEmail(googleUser.email);
    if (user) return user;
    return await this.userService.createNewUser(googleUser);
  }

  async validateGithubUser(githubUser: CreateNewUserDto) {
    const user = await this.userService.getUserByEmail(githubUser.email);
    if (user) return user;
    return await this.userService.createNewUser(githubUser);
  }

  async validateFacebookUser(facebookUser: CreateNewUserDto) {
    const user = await this.userService.getUserByEmail(facebookUser.email);
    if (user) return user;
    return await this.userService.createNewUser(facebookUser);
  }
}
