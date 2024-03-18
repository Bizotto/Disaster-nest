import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDTO } from './DTO/create-user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return await this.user.create(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.user.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.user.findOne(id);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.user.deleteOne(id);
  }
}
