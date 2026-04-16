import request from 'supertest';
import app from '../app';
import { prisma } from '../config/database';
import bcrypt from 'bcryptjs';

describe('Admin API', () => {
  const adminUser = {
    email: 'admin@test.com',
    password: 'AdminPass123!',
    firstName: 'Admin',
    lastName: 'User',
    role: 'ADMIN',
  };

  const managerUser = {
    email: 'manager@test.com',
    password: 'ManagerPass123!',
    firstName: 'Manager',
    lastName: 'User',
    role: 'MANAGER',
  };

  let adminToken: string;
  let managerToken: string;
  let adminId: string;

  beforeAll(async () => {
    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: adminUser.email,
        password: await bcrypt.hash(adminUser.password, 12),
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        role: 'ADMIN',
        isActive: true,
      },
    });
    adminId = admin.id;

    // Create manager user
    await prisma.user.create({
      data: {
        email: managerUser.email,
        password: await bcrypt.hash(managerUser.password, 12),
        firstName: managerUser.firstName,
        lastName: managerUser.lastName,
        role: 'MANAGER',
        isActive: true,
      },
    });

    // Login as admin
    const adminLoginRes = await request(app).post('/api/v1/auth/login').send({
      email: adminUser.email,
      password: adminUser.password,
    });
    const adminCookies = adminLoginRes.headers['set-cookie'] as unknown as string[] | undefined;
    adminToken = adminCookies!.find((c: string) => c.includes('accessToken'))?.split(';')[0].split('=')[1] || '';

    // Login as manager
    const managerLoginRes = await request(app).post('/api/v1/auth/login').send({
      email: managerUser.email,
      password: managerUser.password,
    });
    const managerCookies = managerLoginRes.headers['set-cookie'] as unknown as string[] | undefined;
    managerToken = managerCookies!.find((c: string) => c.includes('accessToken'))?.split(';')[0].split('=')[1] || '';
  });

  afterAll(async () => {
    await prisma.booking.deleteMany().catch(() => {});
    await prisma.staff.deleteMany().catch(() => {});
    await prisma.customer.deleteMany().catch(() => {});
    await prisma.user.deleteMany().catch(() => {});
    await prisma.service.deleteMany().catch(() => {});
    await prisma.$disconnect();
  });

  describe('GET /api/v1/admin/users', () => {
    it('should get users list as admin', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Cookie', `accessToken=${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should get users list as manager', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Cookie', `accessToken=${managerToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should reject without authentication', async () => {
      const res = await request(app).get('/api/v1/admin/users');
      expect(res.status).toBe(401);
    });

    it('should reject customer user access', async () => {
      const customerLoginRes = await request(app).post('/api/v1/auth/register').send({
        email: 'customer@test.com',
        password: 'CustomerPass123!',
        firstName: 'Customer',
        lastName: 'User',
      });

      const customerCookies = customerLoginRes.headers['set-cookie'] as unknown as string[] | undefined;
      const customerToken = customerCookies!.find((c: string) => c.includes('accessToken'))?.split(';')[0].split('=')[1] || '';

      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Cookie', `accessToken=${customerToken}`);

      expect(res.status).toBe(403);
    });
  });

  describe('PUT /api/v1/admin/users/:id', () => {
    it('should update user role', async () => {
      const testUser = await prisma.user.create({
        data: {
          email: 'update-test@test.com',
          password: await bcrypt.hash('TestPass123', 12),
          firstName: 'Test',
          lastName: 'User',
          role: 'CUSTOMER' as const,
        },
      });

      const res = await request(app)
        .put(`/api/v1/admin/users/${testUser.id}`)
        .set('Cookie', `accessToken=${adminToken}`)
        .send({ role: 'STAFF' });

      expect(res.status).toBe(200);
      expect(res.body.data.role).toBe('STAFF');
    });

    it('should deactivate user', async () => {
      const testUser = await prisma.user.create({
        data: {
          email: 'deactivate-test@test.com',
          password: await bcrypt.hash('TestPass123', 12),
          firstName: 'Test',
          lastName: 'User',
          role: 'CUSTOMER' as const,
          isActive: true,
        },
      });

      const res = await request(app)
        .put(`/api/v1/admin/users/${testUser.id}`)
        .set('Cookie', `accessToken=${adminToken}`)
        .send({ isActive: false });

      expect(res.status).toBe(200);
      expect(res.body.data.isActive).toBe(false);
    });

    it('should validate role values', async () => {
      const testUser = await prisma.user.create({
        data: {
          email: 'invalid-role@test.com',
          password: await bcrypt.hash('TestPass123', 12),
          firstName: 'Test',
          lastName: 'User',
        },
      });

      const res = await request(app)
        .put(`/api/v1/admin/users/${testUser.id}`)
        .set('Cookie', `accessToken=${adminToken}`)
        .send({ role: 'INVALID_ROLE' });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/v1/admin/users', () => {
    it('should create new user', async () => {
      const res = await request(app)
        .post('/api/v1/admin/users')
        .set('Cookie', `accessToken=${adminToken}`)
        .send({
          email: 'new-admin-user@test.com',
          password: 'NewUserPass123!',
          firstName: 'New',
          lastName: 'User',
          role: 'CUSTOMER' as const,
        });

      expect(res.status).toBe(201);
      expect(res.body.data.email).toBe('new-admin-user@test.com');
    });

    it('should require valid password length', async () => {
      const res = await request(app)
        .post('/api/v1/admin/users')
        .set('Cookie', `accessToken=${adminToken}`)
        .send({
          email: 'short-pass@test.com',
          password: 'short',
          firstName: 'Test',
          lastName: 'User',
        });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/v1/admin/staff', () => {
    it('should get staff list', async () => {
      const res = await request(app)
        .get('/api/v1/admin/staff')
        .set('Cookie', `accessToken=${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/v1/admin/analytics', () => {
    it('should get analytics data', async () => {
      const res = await request(app)
        .get('/api/v1/admin/analytics')
        .set('Cookie', `accessToken=${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('totalRevenue');
      expect(res.body.data).toHaveProperty('totalBookings');
      expect(res.body.data).toHaveProperty('avgRating');
    });
  });

  describe('GET /api/v1/dashboard', () => {
    it('should get dashboard overview', async () => {
      const res = await request(app)
        .get('/api/v1/dashboard')
        .set('Cookie', `accessToken=${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('overview');
    });
  });
});
