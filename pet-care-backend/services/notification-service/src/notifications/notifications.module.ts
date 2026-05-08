import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { BullModule } from '@nestjs/bullmq';
import { NotificationsProcessor } from './notifications.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    BullModule.registerQueue({
      name: 'mail_queue',
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, TypeOrmModule, NotificationsProcessor],
  exports: [NotificationsService],
})
export class NotificationsModule {}
