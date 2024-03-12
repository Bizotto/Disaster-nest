import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDTO } from './dto/CreateAlert-DTO';

@Controller('alerts')
export class AlertsController {
  constructor(private alert: AlertsService) {}

  @Get()
  async FindAll() {
    return this.alert.getAlerts();
  }

  @Post()
  async createAlert(@Body() data: CreateAlertDTO) {
    return await this.alert.createAlert(data);
  }

  @Put(':id')
  async updateAlert(@Param('id') id: string, @Body() data: CreateAlertDTO) {
    return await this.alert.updateAlert(id, data);
  }

  @Delete(':id')
  async deleteAlert(@Param('id') id: string) {
    await this.alert.deleteAlert(id);
    return `Alert with id: ${id} has been deleted`;
  }
}
