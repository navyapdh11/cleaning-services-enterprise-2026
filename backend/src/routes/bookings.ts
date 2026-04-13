import { Router, Response, NextFunction } from 'express';
import { body, query, validationResult } from 'express-validator';
import { prisma } from '../config/database';
import { AppError } from '../utils/appError';
import { successResponse, paginatedResponse } from '../utils/apiResponse';
import { AuthRequest, authenticate } from '../middleware/auth';
import { paginate, calculateEndTime } from '../utils/helpers';
import { BookingStatus, ServiceType } from '@prisma/client';

const router = Router();

router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as BookingStatus | undefined;
    const { skip, take } = paginate(page, limit);

    const where: any = { customerId: req.user!.id };
    if (status) where.status = status;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({ where, skip, take, include: { service: true, staff: { include: { user: true } } }, orderBy: { date: 'desc' } }),
      prisma.booking.count({ where }),
    ]);
    return paginatedResponse(res, bookings, page, limit, total);
  } catch (error) { next(error); }
});

router.post('/', authenticate,
  [body('serviceId').isUUID(), body('date').isISO8601(), body('address').trim().isLength({ min: 5 })],
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new AppError(400, 'Validation failed');

      const { serviceId, date, address, notes, staffId } = req.body;
      const service = await prisma.service.findUnique({ where: { id: serviceId } });
      if (!service || !service.isActive) throw new AppError(404, 'Service unavailable');

      const startTime = new Date(date);
      const endTime = calculateEndTime(startTime, service.duration);

      const booking = await prisma.booking.create({
        data: {
          customerId: req.user!.id,
          serviceId,
          staffId,
          date: startTime,
          startTime,
          endTime,
          address,
          notes,
          totalPrice: service.basePrice,
          status: 'PENDING',
        },
        include: { service: true },
      });

      await prisma.customer.upsert({
        where: { userId: req.user!.id },
        create: { userId: req.user!.id, address, city: '', state: '', zipCode: '', totalBookings: 1 },
        update: { totalBookings: { increment: 1 } },
      });

      return successResponse(res, booking, 'Booking created', 201);
    } catch (error) { next(error); }
  }
);

router.put('/:id/cancel', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const booking = await prisma.booking.findFirst({ where: { id: req.params.id, customerId: req.user!.id } });
    if (!booking) throw new AppError(404, 'Booking not found');
    if (booking.status === BookingStatus.COMPLETED || booking.status === BookingStatus.CANCELLED) {
      throw new AppError(400, 'Cannot cancel this booking');
    }
    const updated = await prisma.booking.update({ where: { id: req.params.id }, data: { status: 'CANCELLED' } });
    return successResponse(res, updated, 'Booking cancelled');
  } catch (error) { next(error); }
});

router.get('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const booking = await prisma.booking.findFirst({
      where: { id: req.params.id, customerId: req.user!.id },
      include: { service: true, staff: { include: { user: true } }, payment: true, reviews: true },
    });
    if (!booking) throw new AppError(404, 'Booking not found');
    return successResponse(res, booking);
  } catch (error) { next(error); }
});

// Admin routes
router.get('/admin/all', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as BookingStatus | undefined;
    const { skip, take } = paginate(page, limit);
    const where: any = {};
    if (status) where.status = status;
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({ where, skip, take, include: { customer: true, service: true, staff: { include: { user: true } } }, orderBy: { date: 'desc' } }),
      prisma.booking.count({ where }),
    ]);
    return paginatedResponse(res, bookings, page, limit, total);
  } catch (error) { next(error); }
});

router.put('/admin/:id/assign', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { staffId } = req.body;
    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: { staffId, status: 'CONFIRMED' },
      include: { staff: { include: { user: true } } },
    });
    return successResponse(res, booking, 'Staff assigned');
  } catch (error) { next(error); }
});

export default router;
