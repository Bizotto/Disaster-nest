import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './DTO/create-message-dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    try {
      return await this.prisma.message.findMany();
    } catch (error) {
      console.error(error);
      throw new Error('Unable to get messages');
    }
  }

  async create(@Body() data: CreateMessageDto) {
    try {
      const { alertId, message, userId } = data;
      const response = await this.prisma.message.create({
        include: {
          alert: true,
          user: true,
        },
        data: {
          alert: {
            connect: {
              id: alertId,
            },
          },
          message,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Unable to create message');
    }
  }
}
