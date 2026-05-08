import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly repo: Repository<Notification>,
    @InjectQueue('mail_queue') private readonly mailQueue: Queue,
  ) {}

  async createNotification(userId: number, title: string, content: string) {
    const noti = this.repo.create({ userId, title, content });
    return await this.repo.save(noti);
  }

  async getMyNotifications(userId: number) {
    return await this.repo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async pushToQueue(userId: number, title: string, content: string) {
    await this.mailQueue.add('send_noti_job', {
      userId,
      title,
      content,
    });
    console.log('📦 Đã đẩy thông báo vào hàng đợi Redis!');
  }
}
