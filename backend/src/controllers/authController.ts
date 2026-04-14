import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database';
import { env } from '../config/env';
import { AppError } from '../utils/appError';
import { successResponse } from '../utils/apiResponse';
import { AuthRequest, authenticate } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimiter';
import { logger } from '../utils/logger';

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

export const register = [
  authLimiter,
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    body('firstName').trim().isLength({ min: 1 }),
    body('lastName').trim().isLength({ min: 1 }),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
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

      // Create associated Customer record
      await prisma.customer.create({
        data: {
          userId: user.id,
          address: '',
          city: '',
          state: '',
          zipCode: '',
        },
      });

      const { accessToken, refreshToken } = generateTokens(user);

      res.status(201);
      return successResponse(res, { user, accessToken, refreshToken }, 'Registration successful');
    } catch (error) { next(error); }
  }
];

export const login = [
  authLimiter,
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
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
];

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new AppError(401, 'Refresh token required');

    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { id: string };

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || !user.isActive) throw new AppError(401, 'Invalid refresh token');

    const tokens = generateTokens({ id: user.id, email: user.email, role: user.role });
    return successResponse(res, tokens, 'Token refreshed');
  } catch (error) { next(error); }
};

export const logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    return successResponse(res, null, 'Logged out successfully');
  } catch (error) { next(error); }
};

export const profile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { customer: true, staff: true },
    });
    return successResponse(res, user, 'Profile retrieved');
  } catch (error) { next(error); }
};

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, phone, avatar } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: { firstName, lastName, phone, avatar },
      select: { id: true, email: true, firstName: true, lastName: true, phone: true, avatar: true, role: true },
    });
    return successResponse(res, user, 'Profile updated');
  } catch (error) { next(error); }
};

export const forgotPassword = [
  body('email').isEmail().normalizeEmail(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new AppError(400, 'Validation failed', 'VALIDATION_ERROR');

      const { email } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        // Don't reveal if user exists for security
        return successResponse(res, null, 'If the email exists, a reset link has been sent');
      }

      // Generate password reset token
      const resetToken = jwt.sign({ id: user.id, type: 'password-reset' }, env.JWT_SECRET, { expiresIn: '1h' });
      const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      // Send reset email
      const emailService = (await import('../services/emailService')).default;
      await emailService.sendEmail(email, 'password_reset', { resetUrl, email });

      logger.info(`Password reset requested for user ${user.id}`);
      return successResponse(res, null, 'If the email exists, a reset link has been sent');
    } catch (error) { next(error); }
  }
];

export const resetPassword = [
  body('token').notEmpty(),
  body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new AppError(400, 'Validation failed', 'VALIDATION_ERROR');

      const { token, password } = req.body;
      const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; type: string };

      if (decoded.type !== 'password-reset') {
        throw new AppError(400, 'Invalid reset token');
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await prisma.user.update({
        where: { id: decoded.id },
        data: { password: hashedPassword },
      });

      logger.info(`Password reset successful for user ${decoded.id}`);
      return successResponse(res, null, 'Password reset successful');
    } catch (error) { next(error); }
  }
];

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.query;
    if (!token) throw new AppError(400, 'Verification token required');

    const decoded = jwt.verify(token as string, env.JWT_SECRET) as { id: string; type: string };
    if (decoded.type !== 'email-verification') {
      throw new AppError(400, 'Invalid verification token');
    }

    await prisma.user.update({
      where: { id: decoded.id },
      data: { emailVerified: true },
    });

    return successResponse(res, null, 'Email verified successfully');
  } catch (error) { next(error); }
};
