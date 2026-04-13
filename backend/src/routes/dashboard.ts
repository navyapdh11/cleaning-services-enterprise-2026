import { Router, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { successResponse } from '../utils/apiResponse';
import { AuthRequest, authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalUsers, totalBookings, totalRevenue, activeBookings, monthlyBookings, monthlyRevenue, bookingsByStatus, servicesByPopularity, recentReviews] = await Promise.all([
      prisma.user.count({ where: { isActive: true } }),
      prisma.booking.count(),
      prisma.payment.aggregate({ where: { status: 'COMPLETED' }, _sum: { amount: true } }),
      prisma.booking.count({ where: { status: { in: ['CONFIRMED', 'IN_PROGRESS'] } } }),
      prisma.booking.count({ where: { createdAt: { gte: monthStart } } }),
      prisma.payment.aggregate({ where: { status: 'COMPLETED', createdAt: { gte: monthStart } }, _sum: { amount: true } }),
      prisma.booking.groupBy({ by: ['status'], _count: { status: true } }),
      prisma.booking.groupBy({ by: ['serviceId'], _count: { serviceId: true }, orderBy: { _count: { serviceId: 'desc' } }, take: 5 }),
      prisma.review.findMany({ where: { isPublished: true }, orderBy: { createdAt: 'desc' }, take: 5, include: { customer: { select: { firstName: true, lastName: true } }, booking: { include: { service: { select: { name: true } } } } }),
    ]);

    return successResponse(res, {
      overview: {
        totalUsers,
        totalBookings,
        totalRevenue: totalRevenue._sum.amount || 0,
        activeBookings,
        monthlyBookings,
        monthlyRevenue: monthlyRevenue._sum.amount || 0,
      },
      bookingsByStatus: bookingsByStatus.map(b => ({ status: b.status, count: b._count.status })),
      servicesByPopularity: await Promise.all(servicesByPopularity.map(async s => {
        const svc = await prisma.service.findUnique({ where: { id: s.serviceId } });
        return { name: svc?.name || 'Unknown', count: s._count.serviceId };
      })),
      recentReviews,
    });
  } catch (error) { next(error); }
});

router.get('/analytics', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const days = parseInt(req.query.days as string) || 30;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const dailyBookings = await prisma.booking.groupBy({ by: ['date'], _count: { date: true }, where: { date: { gte: startDate } } });
    const dailyRevenue = await prisma.payment.aggregate({ _sum: { amount: true }, where: { createdAt: { gte: startDate }, status: 'COMPLETED' } });
    return successResponse(res, { dailyBookings, dailyRevenue });
  } catch (error) { next(error); }
});

export default router;
