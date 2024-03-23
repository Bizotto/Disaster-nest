import { Module } from '@nestjs/common';
import { AlertsModule } from './alerts/alerts.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { MessagesController } from './messages/messages.controller';
import { MessagesModule } from './messages/messages.module';
import { MessagesService } from './messages/messages.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [AlertsModule, AuthModule, UserModule, MessagesModule],
  controllers: [AuthController, MessagesController],
  providers: [PrismaService, AuthService, UserService, MessagesService],
})
export class AppModule {}
