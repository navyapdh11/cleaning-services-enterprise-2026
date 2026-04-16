import { Router, Response, NextFunction } from 'express';
import { body, query, validationResult } from 'express-validator';
import { prisma } from '../config/database';
import { AppError } from '../utils/appError';
import { successResponse, paginatedResponse } from '../utils/apiResponse';
import { AuthRequest, authenticate, authorize } from '../middleware/auth';
import { paginate } from '../utils/helpers';
import { reviewLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', authenticate, reviewLimiter,
  [
    body('bookingId').isUUID(),
    body('rating').isInt({ min: 1, max: 5 }),
    body('comment').optional().trim().isLength({ max: 2000 }),
  ],
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new AppError(400, 'Validation failed');

      const booking = await prisma.booking.findFirst({ where: { id: req.body.bookingId, customerId: req.user!.id } });
      if (!booking) throw new AppError(404, 'Booking not found');
      if (booking.status !== 'COMPLETED') throw new AppError(400, 'Can only review completed bookings');

      const existing = await prisma.review.findFirst({ where: { bookingId: req.body.bookingId } });
      if (existing) throw new AppError(409, 'Booking already reviewed');

      // Reviews are submitted as pending moderation - admin must approve before publishing
      const review = await prisma.review.create({
        data: {
          bookingId: req.body.bookingId,
          customerId: req.user!.id,
          staffId: booking.staffId,
          rating: req.body.rating,
          comment: req.body.comment,
          isPublished: false, // Requires admin approval before public display
        },
        include: { customer: { select: { firstName: true, lastName: true, avatar: true } } },
      });

      return successResponse(res, review, 'Review submitted and pending moderation', 201);
    } catch (error) { next(error); }
  }
);

router.get('/service/:serviceId', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { skip, take } = paginate(page, limit);
    // Only show published reviews to the public
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({ where: { booking: { serviceId: req.params.serviceId }, isPublished: true }, skip, take, include: { customer: { select: { firstName: true, lastName: true, avatar: true } } }, orderBy: { createdAt: 'desc' } }),
      prisma.review.count({ where: { booking: { serviceId: req.params.serviceId }, isPublished: true } }),
    ]);
    return paginatedResponse(res, reviews, page, limit, total);
  } catch (error) { next(error); }
});

// Admin: moderate (approve/reject) reviews
router.put('/admin/:id/moderate', authenticate, authorize('ADMIN', 'MANAGER'),
  [body('isPublished').isBoolean()],
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new AppError(400, 'Validation failed');

      const { isPublished } = req.body;
      const review = await prisma.review.update({
        where: { id: req.params.id },
        data: { isPublished },
        include: { customer: { select: { firstName: true, lastName: true } } },
      });

      // If approved, update staff average rating
      if (isPublished && review.staffId) {
        const allReviews = await prisma.review.findMany({ where: { staffId: review.staffId, isPublished: true } });
        if (allReviews.length > 0) {
          const avgRating = allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / allReviews.length;
          await prisma.staff.update({ where: { id: review.staffId }, data: { rating: avgRating } });
        }
      }

      return successResponse(res, review, isPublished ? 'Review approved' : 'Review rejected');
    } catch (error) { next(error); }
  }
);

// Admin: list pending reviews
router.get('/admin/pending', authenticate, authorize('ADMIN', 'MANAGER'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const { skip, take } = paginate(page, limit);
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({ where: { isPublished: false }, skip, take, include: { customer: { select: { firstName: true, lastName: true } }, booking: { include: { service: true } } }, orderBy: { createdAt: 'desc' } }),
      prisma.review.count({ where: { isPublished: false } }),
    ]);
    return paginatedResponse(res, reviews, page, limit, total);
  } catch (error) { next(error); }
});

export default router;
