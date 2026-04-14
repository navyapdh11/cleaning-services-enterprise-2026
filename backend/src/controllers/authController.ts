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

const generateTokens = (user: { id: string; email: string; role: string }, refreshTokenVersion: number = 0) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
  const refreshToken = jwt.sign(
    { id: user.id, version: refreshTokenVersion },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRES_IN }
  );
  return { accessToken, refreshToken };
};

const getPasswordResetSecret = (): string => {
  return (env as any).PASSWORD_RESET_SECRET || env.JWT_SECRET;
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

      const { accessToken, refreshToken } = generateTokens(user, 0);

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

      if (!user.isActive) throw new AppError(403, 'Account deactivated');

      // Check if account is currently locked out
      if (user.lockoutUntil && user.lockoutUntil > new Date()) {
        const remainingMs = user.lockoutUntil.getTime() - Date.now();
        const remainingMin = Math.ceil(remainingMs / 60000);
        throw new AppError(429, `Account locked. Try again in ${remainingMin} minute(s)`, 'ACCOUNT_LOCKED');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        // Increment failed login attempts
        const newFailedAttempts = user.failedLoginAttempts + 1;
        const updateData: { failedLoginAttempts: number; lockoutUntil?: Date } = {
          failedLoginAttempts: newFailedAttempts,
        };

        // Lock account after 5 failed attempts for 15 minutes
        if (newFailedAttempts >= 5) {
          updateData.lockoutUntil = new Date(Date.now() + 15 * 60 * 1000);
          throw new AppError(429, 'Account locked due to too many failed attempts. Try again in 15 minutes', 'ACCOUNT_LOCKED');
        }

        await prisma.user.update({
          where: { id: user.id },
          data: updateData,
        });

        const remaining = 5 - newFailedAttempts;
        throw new AppError(401, `Invalid credentials. ${remaining} attempt(s) remaining`);
      }

      // Successful login: reset failed attempts and lockout
      await prisma.user.update({
        where: { id: user.id },
        data: {
          lastLoginAt: new Date(),
          failedLoginAttempts: 0,
          lockoutUntil: null,
        },
      });

      const { accessToken, refreshToken } = generateTokens(
        { id: user.id, email: user.email, role: user.role },
        user.refreshTokenVersion
      );

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

    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { id: string; version: number };

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || !user.isActive) throw new AppError(401, 'Invalid refresh token');

    // Token rotation: verify the old token's version matches
    if (user.refreshTokenVersion !== decoded.version) {
      // Possible token replay attack: invalidate all tokens
      logger.warn(`Potential token replay detected for user ${user.id}`);
      throw new AppError(401, 'Invalid refresh token');
    }

    // Rotate: increment version to invalidate old token, generate new token
    const newVersion = user.refreshTokenVersion + 1;
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshTokenVersion: newVersion },
    });

    const tokens = generateTokens(
      { id: user.id, email: user.email, role: user.role },
      newVersion
    );
    return successResponse(res, tokens, 'Token refreshed');
  } catch (error) { next(error); }
};

export const logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.id) {
      // Invalidate all existing refresh tokens by incrementing the version
      await prisma.user.update({
        where: { id: req.user.id },
        data: {
          lastLogoutAt: new Date(),
          refreshTokenVersion: { increment: 1 },
        },
      });
    }
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

      // Generate password reset token with a separate secret
      const resetToken = jwt.sign(
        { id: user.id, type: 'password-reset' },
        getPasswordResetSecret(),
        { expiresIn: '1h' }
      );
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
      const decoded = jwt.verify(token, getPasswordResetSecret()) as { id: string; type: string };

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

    const decoded = jwt.verify(token as string, getPasswordResetSecret()) as { id: string; type: string };
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
