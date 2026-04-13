import { prisma } from '../config/database';
import { emailService } from './emailService';
import logger from '../middleware/logger';
import { NotificationType } from '@prisma/client';

class NotificationService {
  async createNotification(userId: string, title: string, message: string, type: NotificationType = 'IN_APP', data?: Record<string, unknown>) {
    try {
      const notification = await prisma.notification.create({
        data: { userId, title, message, type, data: data as any },
      });
      return notification;
    } catch (error) {
      logger.error(`Failed to create notification for user ${userId}: ${error}`);
      return null;
    }
  }

  async sendNotification(userId: string, title: string, message: string, type: NotificationType = 'IN_APP', data?: Record<string, unknown>) {
    const notification = await this.createNotification(userId, title, message, type, data);
    if (!notification) return false;

    switch (type) {
      case 'EMAIL':
        return emailService.sendEmail(userId, 'notification', { title, message });
      case 'SMS':
        logger.info(`SMS notification to ${userId}: ${message}`);
        return true;
      case 'PUSH':
        logger.info(`Push notification to ${userId}: ${message}`);
        return true;
      case 'IN_APP':
        return true;
      default:
        return true;
    }
  }

  async markAsRead(notificationId: string, userId: string) {
    return prisma.notification.updateMany({
      where: { id: notificationId, userId },
      data: { readAt: new Date() },
    });
  }

  async getUserNotifications(userId: string, limit: number = 10) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { sentAt: 'desc' },
      take: limit,
    });
  }
}

export const notificationService = new NotificationService();
