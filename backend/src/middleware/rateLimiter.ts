import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: { message: 'Too many requests, please try again later.' } },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, error: { message: 'Too many auth attempts, please try again later.' } },
  skipSuccessfulRequests: true,
});

export const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: { success: false, error: { message: 'Rate limit exceeded.' } },
});

// Booking creation limiter - prevents spam booking creation
export const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, error: { message: 'Too many booking attempts, please wait before booking again.' } },
});

// Review submission limiter - prevents review bombing
export const reviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { success: false, error: { message: 'Too many review submissions, please wait before reviewing again.' } },
});

// Password reset limiter - prevents email enumeration and abuse
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, error: { message: 'Too many password reset attempts, please try again later.' } },
});

// Admin routes limiter - prevents abuse of admin endpoints
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, error: { message: 'Too many admin requests, please try again later.' } },
  standardHeaders: true,
  legacyHeaders: false,
});
