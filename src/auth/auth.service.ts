import {
  Dependencies,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
@Dependencies(UserService, JwtService)
export class AuthService {
  constructor(
    private user: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const res = await this.user.findByEmail(email);

    if (res?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = {
      username: res.email,
      id: res.id,
    };
    return {
      user: payload,
      token: this.jwtService.sign(payload),
    };
  }
}
