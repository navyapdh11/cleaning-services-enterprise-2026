import { Router, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import Stripe from 'stripe';
import { prisma } from '../config/database';
import { env } from '../config/env';
import { AppError } from '../utils/appError';
import { successResponse, paginatedResponse } from '../utils/apiResponse';
import { AuthRequest, authenticate } from '../middleware/auth';
import { paginate } from '../utils/helpers';
import { PaymentStatus } from '@prisma/client';

const router = Router();
const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' }) : null;

router.post('/create-intent', authenticate,
  [body('bookingId').isUUID()],
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!stripe) throw new AppError(500, 'Payment provider not configured');
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new AppError(400, 'Validation failed');

      const booking = await prisma.booking.findFirst({ where: { id: req.body.bookingId, customerId: req.user!.id } });
      if (!booking) throw new AppError(404, 'Booking not found');

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(booking.totalPrice * 100),
        currency: 'usd',
        metadata: { bookingId: booking.id, customerId: req.user!.id },
      });

      await prisma.payment.upsert({
        where: { bookingId: booking.id },
        create: { bookingId: booking.id, payerId: req.user!.id, amount: booking.totalPrice, method: 'stripe', stripePaymentId: paymentIntent.id, status: 'PENDING' },
        update: { stripePaymentId: paymentIntent.id, status: 'PENDING' },
      });

      return successResponse(res, { clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id }, 'Payment intent created');
    } catch (error) { next(error); }
  }
);

router.post('/webhook', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!stripe || !env.STRIPE_WEBHOOK_SECRET) return res.status(400).send('Webhook not configured');
    const sig = req.headers['stripe-signature'] as string;
    let event: Stripe.Event;
    try { event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET); }
    catch (err) { return res.status(400).send(`Webhook Error: ${err.message}`); }

    if (event.type === 'payment_intent.succeeded') {
      const pi = event.data.object as Stripe.PaymentIntent;
      await prisma.payment.updateMany({ where: { stripePaymentId: pi.id }, data: { status: 'COMPLETED', paidAt: new Date() } });
      await prisma.booking.updateMany({ where: { id: pi.metadata?.bookingId }, data: { status: 'CONFIRMED' } });
    }
    if (event.type === 'payment_intent.payment_failed') {
      const pi = event.data.object as Stripe.PaymentIntent;
      await prisma.payment.updateMany({ where: { stripePaymentId: pi.id }, data: { status: 'FAILED' } });
    }
    res.json({ received: true });
  } catch (error) { next(error); }
});

router.get('/history', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { skip, take } = paginate(page, limit);
    const [payments, total] = await Promise.all([
      prisma.payment.findMany({ where: { payerId: req.user!.id }, skip, take, include: { booking: { include: { service: true } } }, orderBy: { createdAt: 'desc' } }),
      prisma.payment.count({ where: { payerId: req.user!.id } }),
    ]);
    return paginatedResponse(res, payments, page, limit, total);
  } catch (error) { next(error); }
});

export default router;
