import { Router, Response, NextFunction } from 'express';
import { body, query, validationResult } from 'express-validator';
import { prisma } from '../config/database';
import { AppError } from '../utils/appError';
import { successResponse, paginatedResponse } from '../utils/apiResponse';
import { AuthRequest, authenticate, authorize } from '../middleware/auth';
import { paginate } from '../utils/helpers';
import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';

const router = Router();

router.use(authenticate, authorize('ADMIN', 'MANAGER'));

// User management
router.get('/users', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const role = req.query.role as UserRole | undefined;
    const { skip, take } = paginate(page, limit);
    const where: any = {};
    if (role) where.role = role;
    const [users, total] = await Promise.all([
      prisma.user.findMany({ where, skip, take, select: { id: true, email: true, firstName: true, lastName: true, role: true, isActive: true, createdAt: true }, orderBy: { createdAt: 'desc' } }),
      prisma.user.count({ where }),
    ]);
    return paginatedResponse(res, users, page, limit, total);
  } catch (error) { next(error); }
});

router.put('/users/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { role, isActive } = req.body;
    const user = await prisma.user.update({ where: { id: req.params.id }, data: { role, isActive }, select: { id: true, email: true, role: true, isActive: true } });
    return successResponse(res, user, 'User updated');
  } catch (error) { next(error); }
});

router.post('/users', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new AppError(400, 'Validation failed');
    const { email, password, firstName, lastName, role, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({ data: { email, password: hashedPassword, firstName, lastName, role, phone }, select: { id: true, email: true, firstName: true, lastName: true, role: true } });
    return successResponse(res, user, 'User created', 201);
  } catch (error) { next(error); }
});

// Staff management
router.get('/staff', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const staff = await prisma.staff.findMany({ include: { user: { select: { firstName: true, lastName: true, email: true } } } });
    return successResponse(res, staff);
  } catch (error) { next(error); }
});

router.post('/staff', [body('userId').isUUID(), body('specialization').isString(), body('hourlyRate').isFloat({ min: 0 })], async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new AppError(400, 'Validation failed');
    const { userId, specialization, hourlyRate, certifications } = req.body;
    const existing = await prisma.staff.findUnique({ where: { userId } });
    if (existing) throw new AppError(409, 'Staff profile exists');
    const employeeId = `EMP-${Date.now().toString(36).toUpperCase()}`;
    const staff = await prisma.staff.create({ data: { userId, employeeId, specialization, hourlyRate, certifications }, include: { user: true } });
    await prisma.user.update({ where: { id: userId }, data: { role: 'STAFF' } });
    return successResponse(res, staff, 'Staff created', 201);
  } catch (error) { next(error); }
});

// Analytics
router.get('/analytics', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const [totalRevenue, totalBookings, avgRating, topServices, revenueByMonth] = await Promise.all([
      prisma.payment.aggregate({ where: { status: 'COMPLETED' }, _sum: { amount: true } }),
      prisma.booking.count(),
      prisma.review.aggregate({ where: { isPublished: true }, _avg: { rating: true } }),
      prisma.booking.groupBy({ by: ['serviceId'], _count: { serviceId: true }, orderBy: { _count: { serviceId: 'desc' } }, take: 10 }),
      prisma.payment.groupBy({ by: ['createdAt'], _sum: { amount: true }, where: { status: 'COMPLETED' } }),
    ]);
    return successResponse(res, { totalRevenue: totalRevenue._sum.amount || 0, totalBookings, avgRating: avgRating._avg.rating || 0, topServices });
  } catch (error) { next(error); }
});

export default router;
