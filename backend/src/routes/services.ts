import { Router, Request, Response, NextFunction } from 'express';
import { body, query, validationResult } from 'express-validator';
import { prisma } from '../config/database';
import { AppError } from '../utils/appError';
import { successResponse, paginatedResponse } from '../utils/apiResponse';
import { AuthRequest, authenticate, authorize } from '../middleware/auth';
import { generateSlug, paginate } from '../utils/helpers';
import { ServiceType } from '@prisma/client';

const router = Router();

router.get('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const type = req.query.type as ServiceType | undefined;
    const search = req.query.search as string | undefined;
    const { skip, take } = paginate(page, limit);

    const where: Record<string, any> = { isActive: true };
    if (type) where.type = type;
    if (search) where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { description: { contains: search, mode: 'insensitive' } }];

    const [services, total] = await Promise.all([
      prisma.service.findMany({ where, skip, take, orderBy: { name: 'asc' } }),
      prisma.service.count({ where }),
    ]);

    return paginatedResponse(res, services, page, limit, total);
  } catch (error) { next(error); }
});

router.get('/:slug', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const service = await prisma.service.findUnique({ where: { slug: req.params.slug } });
    if (!service) throw new AppError(404, 'Service not found');
    return successResponse(res, service);
  } catch (error) { next(error); }
});

router.post('/', authenticate, authorize('ADMIN', 'MANAGER'),
  [body('name').trim().isLength({ min: 2 }), body('basePrice').isFloat({ min: 0 }), body('duration').isInt({ min: 15 })],
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new AppError(400, 'Validation failed');
      const { name, description, type, duration, basePrice, features, imageUrl } = req.body;
      const service = await prisma.service.create({
        data: { name, slug: generateSlug(name), description, type, duration, basePrice, features, imageUrl },
      });
      return successResponse(res, service, 'Service created', 201);
    } catch (error) { next(error); }
  }
);

router.put('/:id', authenticate, authorize('ADMIN', 'MANAGER'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description, type, duration, basePrice, features, imageUrl, isActive } = req.body;
    const data: Record<string, any> = { description, type, duration, basePrice, features, imageUrl, isActive };
    if (name) { data.name = name; data.slug = generateSlug(name); }
    const service = await prisma.service.update({ where: { id: req.params.id }, data });
    return successResponse(res, service, 'Service updated');
  } catch (error) { next(error); }
});

router.delete('/:id', authenticate, authorize('ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.service.delete({ where: { id: req.params.id } });
    return successResponse(res, null, 'Service deleted');
  } catch (error) { next(error); }
});

export default router;
