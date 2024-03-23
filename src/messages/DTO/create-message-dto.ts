import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsString()
  user: string;

  @IsString()
  userId: string;

  @IsString()
  alert: string;

  @IsString()
  alertId: string;
}
