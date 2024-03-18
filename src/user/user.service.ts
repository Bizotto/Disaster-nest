import {
  Body,
  Injectable,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './DTO/create-user-dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(@Body() data: CreateUserDTO) {
    const { email, name, password } = data;

    const emailAlreadyExists = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (emailAlreadyExists)
      return new InternalServerErrorException('User already exists');
    if (!name) return new InternalServerErrorException('Name is required');
    if (!email) return new InternalServerErrorException('Email is required');
    if (!password)
      return new InternalServerErrorException('Password is required');

    return await this.prismaService.user.create({
      data,
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(@Param() id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteOne(@Param() id: string) {
    return await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }
}
