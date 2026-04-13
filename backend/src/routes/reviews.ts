import { Router, Response, NextFunction } from 'express';
import { body, query, validationResult } from 'express-validator';
import { prisma } from '../config/database';
import { AppError } from '../utils/appError';
import { successResponse, paginatedResponse } from '../utils/apiResponse';
import { AuthRequest, authenticate } from '../middleware/auth';
import { paginate } from '../utils/helpers';

const router = Router();

router.post('/', authenticate,
  [body('bookingId').isUUID(), body('rating').isInt({ min: 1, max: 5 })],
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new AppError(400, 'Validation failed');

      const booking = await prisma.booking.findFirst({ where: { id: req.body.bookingId, customerId: req.user!.id } });
      if (!booking) throw new AppError(404, 'Booking not found');
      if (booking.status !== 'COMPLETED') throw new AppError(400, 'Can only review completed bookings');

      const existing = await prisma.review.findFirst({ where: { bookingId: req.body.bookingId } });
      if (existing) throw new AppError(409, 'Booking already reviewed');

      const review = await prisma.review.create({
        data: { bookingId: req.body.bookingId, customerId: req.user!.id, staffId: booking.staffId, rating: req.body.rating, comment: req.body.comment, isPublished: true },
        include: { customer: { select: { firstName: true, lastName: true, avatar: true } } },
      });

      // Update staff rating
      if (booking.staffId) {
        const allReviews = await prisma.review.findMany({ where: { staffId: booking.staffId } });
        const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
        await prisma.staff.update({ where: { id: booking.staffId }, data: { rating: avgRating } });
      }

      return successResponse(res, review, 'Review submitted', 201);
    } catch (error) { next(error); }
  }
);

router.get('/service/:serviceId', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { skip, take } = paginate(page, limit);
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({ where: { booking: { serviceId: req.params.serviceId }, isPublished: true }, skip, take, include: { customer: { select: { firstName: true, lastName: true, avatar: true } } }, orderBy: { createdAt: 'desc' } }),
      prisma.review.count({ where: { booking: { serviceId: req.params.serviceId }, isPublished: true } }),
    ]);
    return paginatedResponse(res, reviews, page, limit, total);
  } catch (error) { next(error); }
});

export default router;
