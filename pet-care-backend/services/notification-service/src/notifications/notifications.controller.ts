import { Controller, Get, Param, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

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
    const content = 'Chào Thúy, thông báo này đi qua Redis đó!';

    // Gọi hàm pushToQueue trong Service
    await this.notificationsService.pushToQueue(fakeUserId, title, content);

    return { message: 'Đã gửi lệnh vào hàng đợi thành công!' };
  }
}
