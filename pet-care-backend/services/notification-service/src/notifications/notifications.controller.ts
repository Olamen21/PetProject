import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('my-notifications/:userId')
  async getNoti(@Param('userId') userId: string) {
    return this.notificationsService.getMyNotifications(+userId);
  }

  @Post('test-queue')
  async testQueue() {
    const fakeUserId = 99;
    const title = 'Test Hàng Đợi';
    const content = 'Chào bạn, thông báo này đi qua Redis đó!';

    await this.notificationsService.pushToQueue(fakeUserId, title, content);
    return { message: 'Đã gửi lệnh vào hàng đợi thành công!' };
  }

  @Post('manual-reminder')
  async createManualReminder(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    await this.notificationsService.pushToQueue(
      createNotificationDto.userId,
      createNotificationDto.title,
      createNotificationDto.content,
    );

    return {
      status: 'Success',
      message: 'Nhắc nhở của bạn đã được ghi nhận và đang xử lý!',
    };
  }
}
