import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationsService } from './notifications.service';

@Processor('mail_queue')
export class NotificationsProcessor extends WorkerHost {
  constructor(private readonly notificationsService: NotificationsService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { userId, title, content } = job.data;

    console.log(` Đang xử lý thông báo cho User ${userId}...`);

    await this.notificationsService.createNotification(userId, title, content);

    console.log(` Đã xử lý xong Job ID: ${job.id}`);
  }
}
