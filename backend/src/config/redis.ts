import Redis from 'ioredis';
import { env } from './env';

const globalForRedis = globalThis as unknown as { redis: Redis | null };

export const redis = globalForRedis.redis || new Redis(env.REDIS_URL, {
  retryStrategy: (times: number) => {
    if (times > 3) return null;
    return Math.min(times * 50, 2000);
  },
  maxRetriesPerRequest: 3,
  lazyConnect: true,
});

redis.on('error', (err) => console.error('Redis connection error:', err));
redis.on('connect', () => console.log('Redis connected successfully'));

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

export default redis;
