import { Router, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { AppError } from '../utils/appError';
import { successResponse } from '../utils/apiResponse';
import { AuthRequest, authenticate } from '../middleware/auth';
import { dfsMenuService } from '../services/dfsMenuService';

const router = Router();

router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const role = req.user!.role;
    const menuTree = await dfsMenuService.buildMenuTree(role);
    return successResponse(res, menuTree, 'Menu retrieved');
  } catch (error) { next(error); }
});

router.get('/flat', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const role = req.user!.role;
    const menuItems = await dfsMenuService.getFlatMenu(role);
    return successResponse(res, menuItems, 'Menu items retrieved');
  } catch (error) { next(error); }
});

export default router;
