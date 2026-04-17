import { redis } from '../config/redis';
import { logger } from '../utils/logger';

const DEFAULT_TTL = 300; // 5 minutes

/**
 * Redis-backed caching service. Falls back to no-op if Redis unavailable.
 */
export class CacheService {
  private prefix = 'cleanpro:';

  /**
   * Get cached value by key. Returns null if miss or Redis unavailable.
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await redis.get(this.prefix + key);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      logger.warn(`Cache get error for ${key}: ${(error as Error).message}`);
      return null;
    }
  }

  /**
   * Set cache value with optional TTL (seconds).
   */
  async set(key: string, value: unknown, ttl: number = DEFAULT_TTL): Promise<boolean> {
    try {
      const serialized = JSON.stringify(value);
      await redis.setex(this.prefix + key, ttl, serialized);
      return true;
    } catch (error) {
      logger.warn(`Cache set error for ${key}: ${(error as Error).message}`);
      return false;
    }
  }

  /**
   * Delete a cache key.
   */
  async del(key: string): Promise<boolean> {
    try {
      await redis.del(this.prefix + key);
      return true;
    } catch (error) {
      logger.warn(`Cache del error for ${key}: ${(error as Error).message}`);
      return false;
    }
  }

  /**
   * Invalidate all cache keys matching a pattern.
   * Uses SCAN for production-safe iteration.
   */
  async invalidate(pattern: string): Promise<boolean> {
    try {
      const fullPattern = this.prefix + pattern;
      const keys: string[] = [];
      let cursor = '0';

      do {
        const result = await redis.scan(cursor, 'MATCH', fullPattern, 'COUNT', 100);
        cursor = result[0];
        if (result[1].length > 0) {
          keys.push(...result[1]);
        }
      } while (cursor !== '0');

      if (keys.length > 0) {
        await redis.del(keys);
        logger.info(`Cache invalidated: ${keys.length} keys matching ${pattern}`);
      }
      return true;
    } catch (error) {
      logger.warn(`Cache invalidate error for ${pattern}: ${(error as Error).message}`);
      return false;
    }
  }

  /**
   * Get or set cache with a callback function. If cache miss, executes fn, caches result, returns it.
   */
  async wrap<T>(key: string, fn: () => Promise<T>, ttl: number = DEFAULT_TTL): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      logger.debug(`Cache hit: ${key}`);
      return cached;
    }

    logger.debug(`Cache miss: ${key}`);
    const result = await fn();
    await this.set(key, result, ttl);
    return result;
  }
}

export const cacheService = new CacheService();
