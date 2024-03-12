import { Module } from '@nestjs/common';
import { AlertsModule } from './alerts/alerts.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AlertsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
