import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/DTO/create-user-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() user: CreateUserDTO) {
    return this.authService.signIn(user.email, user.password);
  }
}
