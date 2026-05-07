import { Controller, Get, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('my-notifications/:userId')
  async getNoti(@Param('userId') userId: string) {
    return this.notificationsService.getMyNotifications(+userId);
  }
}
