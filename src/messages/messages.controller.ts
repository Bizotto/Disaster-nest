import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateMessageDto } from './DTO/create-message-dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private message: MessagesService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    return this.message.getAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: CreateMessageDto) {
    return this.message.create(body);
  }
}
