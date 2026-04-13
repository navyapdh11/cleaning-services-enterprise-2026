import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database';
import { env } from '../config/env';
import { AppError } from '../utils/appError';
import { successResponse } from '../utils/apiResponse';
import { AuthRequest, authenticate } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimiter';

const router = Router();

const generateTokens = (user: { id: string; email: string; role: string }) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
  const refreshToken = jwt.sign(
    { id: user.id },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRES_IN }
  );
  return { accessToken, refreshToken };
};

router.post('/register',
  authLimiter,
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    body('firstName').trim().isLength({ min: 1 }),
    body('lastName').trim().isLength({ min: 1 }),
  ],
  async (req: AuthRequest, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new AppError(400, 'Validation failed', 'VALIDATION_ERROR');

      const { email, password, firstName, lastName, phone } = req.body;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new AppError(409, 'Email already registered');

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phone,
          role: 'CUSTOMER',
        },
        select: { id: true, email: true, firstName: true, lastName: true, role: true, createdAt: true },
      });

      const { accessToken, refreshToken } = generateTokens(user);

      return successResponse(res, { user, accessToken, refreshToken }, 'Registration successful', 201);
    } catch (error) { next(error); }
  }
);

router.post('/login',
  authLimiter,
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  async (req: AuthRequest, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new AppError(400, 'Validation failed', 'VALIDATION_ERROR');

      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new AppError(401, 'Invalid credentials');

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throw new AppError(401, 'Invalid credentials');

      if (!user.isActive) throw new AppError(403, 'Account deactivated');

      await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

      const { accessToken, refreshToken } = generateTokens({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

      return successResponse(res, {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          avatar: user.avatar,
        },
        accessToken,
        refreshToken,
      }, 'Login successful');
    } catch (error) { next(error); }
  }
);

router.post('/refresh', async (req: AuthRequest, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new AppError(401, 'Refresh token required');

    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { id: string };

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || !user.isActive) throw new AppError(401, 'Invalid refresh token');

    const tokens = generateTokens({ id: user.id, email: user.email, role: user.role });
    return successResponse(res, tokens, 'Token refreshed');
  } catch (error) { next(error); }
});

router.post('/logout', authenticate, async (req: AuthRequest, res, next) => {
  try {
    return successResponse(res, null, 'Logged out successfully');
  } catch (error) { next(error); }
});

router.get('/profile', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { customer: true, staff: true },
    });
    return successResponse(res, user, 'Profile retrieved');
  } catch (error) { next(error); }
});

router.put('/profile', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { firstName, lastName, phone, avatar } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: { firstName, lastName, phone, avatar },
      select: { id: true, email: true, firstName: true, lastName: true, phone: true, avatar: true, role: true },
    });
    return successResponse(res, user, 'Profile updated');
  } catch (error) { next(error); }
});

export default router;
