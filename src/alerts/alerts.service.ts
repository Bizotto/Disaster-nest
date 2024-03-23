import { Body, Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlertDTO } from './dto/CreateAlert-DTO';

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService) {}

  async getAlerts() {
    try {
      const response = await this.prisma.alert.findMany();
      return response;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async createAlert(@Body() data: CreateAlertDTO) {
    const { category, description, lat, long } = data;

    if (!category) throw new Error('Category is required');
    if (!description) throw new Error('Description is required');
    if (!lat || !long) throw new Error('Latitude and longitude is required');

    try {
      const newAlert = await this.prisma.alert.create({
        data: {
          category,
          description,
          lat,
          long,
        },
      });
      return newAlert;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateAlert(@Param('id') id: string, @Body() data: CreateAlertDTO) {
    const { category, description, lat, long, status } = data;

    if (!id) throw new Error('Id is required');
    if (!category) throw new Error('Category is required');
    if (!description) throw new Error('Description is required');
    if (!lat || !long) throw new Error('Latitude and longitude is required');

    try {
      const updatedAlert = await this.prisma.alert.update({
        where: { id },
        data: {
          category,
          description,
          lat,
          long,
          status,
        },
      });
      return updatedAlert;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAlert(id: string) {
    if (!id) throw new Error('Id is required');

    try {
      return await this.prisma.alert.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
