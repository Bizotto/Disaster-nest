import { NestFactory } from '@nestjs/core';
import { Server } from 'socket.io';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const prisma = new PrismaService();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const http = await app.listen(3000);
  const socketIO = new Server(http);

  socketIO.on('connection', async (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('newAlert', async (data) => {
      console.log(data);
      const alerts = await prisma.alert.findMany();
      if (alerts.length) {
        socketIO.emit('newAlert', alerts);
      }
    });
    const alerts = await prisma.alert.findMany();
    if (alerts.length) {
      socketIO.emit('newAlert', alerts);
    }

    socket.on('disconnect', () => {
      socket.disconnect();
      console.log('🔥: A user disconnected');
    });
  });
}
bootstrap();
