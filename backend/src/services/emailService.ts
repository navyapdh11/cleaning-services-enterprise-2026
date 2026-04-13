import nodemailer from 'nodemailer';
import { env } from '../config/env';
import logger from '../middleware/logger';

interface EmailTemplate {
  subject: string;
  html: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    if (env.SMTP_HOST) {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: parseInt(env.SMTP_PORT),
        secure: env.SMTP_PORT === '465',
        auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
      });
    }
  }

  private getTemplate(template: string, data: Record<string, string>): EmailTemplate {
    const templates: Record<string, EmailTemplate> = {
      welcome: {
        subject: 'Welcome to CleanPro Enterprise!',
        html: `<h1>Welcome ${data.firstName}!</h1><p>Thank you for joining CleanPro Enterprise. We're excited to serve you.</p>`,
      },
      booking_confirmation: {
        subject: 'Booking Confirmed - CleanPro Enterprise',
        html: `<h1>Booking Confirmed!</h1><p>Your booking for ${data.service} on ${data.date} has been confirmed.</p>`,
      },
      booking_reminder: {
        subject: 'Reminder: Upcoming Cleaning Service',
        html: `<h1>Reminder</h1><p>Your cleaning service is scheduled for ${data.date} at ${data.time}.</p>`,
      },
      payment_receipt: {
        subject: 'Payment Receipt - CleanPro Enterprise',
        html: `<h1>Payment Received</h1><p>Thank you for your payment of $${data.amount}.</p>`,
      },
      review_request: {
        subject: 'How was your cleaning experience?',
        html: `<h1>Rate Your Experience</h1><p>We'd love your feedback on your recent cleaning service.</p>`,
      },
      password_reset: {
        subject: 'Password Reset Request',
        html: `<h1>Reset Password</h1><p>Click the link to reset your password: ${data.link}</p>`,
      },
    };
    return templates[template] || { subject: 'CleanPro Enterprise', html: data.message || '' };
  }

  async sendEmail(to: string, template: string, data: Record<string, string>): Promise<boolean> {
    if (!this.transporter) {
      logger.info(`Email would be sent to ${to}: ${template}`);
      return true;
    }

    try {
      const { subject, html } = this.getTemplate(template, data);
      await this.transporter.sendMail({
        from: env.SMTP_FROM || 'noreply@cleanpro.com',
        to,
        subject,
        html,
      });
      logger.info(`Email sent to ${to}: ${template}`);
      return true;
    } catch (error) {
      logger.error(`Email failed to ${to}: ${error}`);
      return false;
    }
  }

  async sendWelcomeEmail(email: string, firstName: string) {
    return this.sendEmail(email, 'welcome', { firstName });
  }

  async sendBookingConfirmation(email: string, service: string, date: string) {
    return this.sendEmail(email, 'booking_confirmation', { service, date });
  }

  async sendPaymentReceipt(email: string, amount: string) {
    return this.sendEmail(email, 'payment_receipt', { amount });
  }
}

export const emailService = new EmailService();
