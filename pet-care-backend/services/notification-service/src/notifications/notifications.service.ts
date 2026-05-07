import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly repo: Repository<Notification>,
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
}