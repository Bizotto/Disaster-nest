import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  providers: [MessagesService, PrismaService],
  controllers: [MessagesController],
})
export class MessagesModule {}
