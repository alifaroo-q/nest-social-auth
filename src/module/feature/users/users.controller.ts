import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/module/core/auth/guard/jwt-auth.guard';
import { UserService } from './user.service';
import { AuthUser } from './decorator/user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getUserProfile(@AuthUser() currentUser: { id: number; email: string }) {
    return await this.userService.getUserById(currentUser.id);
  }
}
