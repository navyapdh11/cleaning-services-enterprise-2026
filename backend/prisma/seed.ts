import { PrismaClient, ServiceType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create Admin User
  const adminPassword = await bcrypt.hash('Admin123!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cleanpro.com' },
    update: {},
    create: {
      email: 'admin@cleanpro.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+61400000001',
      role: 'ADMIN',
      emailVerified: true,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create Manager User
  const managerPassword = await bcrypt.hash('Manager123!', 12);
  const manager = await prisma.user.upsert({
    where: { email: 'manager@cleanpro.com' },
    update: {},
    create: {
      email: 'manager@cleanpro.com',
      password: managerPassword,
      firstName: 'Manager',
      lastName: 'User',
      phone: '+61400000002',
      role: 'MANAGER',
      emailVerified: true,
    },
  });
  console.log('✅ Manager user created:', manager.email);

  // Create Demo Customer
  const customerPassword = await bcrypt.hash('Customer123!', 12);
  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+61400000003',
      role: 'CUSTOMER',
      emailVerified: true,
    },
  });

  const customer = await prisma.customer.upsert({
    where: { userId: customerUser.id },
    update: {},
    create: {
      userId: customerUser.id,
      address: '123 Example Street',
      city: 'Sydney',
      state: 'NSW',
      zipCode: '2000',
      loyaltyPoints: 100,
      totalBookings: 0,
      totalSpent: 0,
    },
  });
  console.log('✅ Demo customer created:', customerUser.email);

  // Create Services
  const services = [
    {
      name: 'Regular Cleaning',
      slug: 'regular-cleaning',
      description: 'Standard cleaning service for homes and apartments',
      type: 'RESIDENTIAL' as ServiceType,
      duration: 120,
      basePrice: 120,
      features: ['Kitchen cleaning', 'Bathroom sanitization', 'Vacuuming', 'Dusting', 'Mopping'],
    },
    {
      name: 'Deep Cleaning',
      slug: 'deep-cleaning',
      description: 'Intensive cleaning for a thorough fresh start',
      type: 'DEEP_CLEAN' as ServiceType,
      duration: 240,
      basePrice: 250,
      features: ['Everything in Regular', 'Inside appliances', 'Baseboards', 'Light fixtures', 'Window sills'],
    },
    {
      name: 'End of Lease Cleaning',
      slug: 'end-of-lease',
      description: 'Bond-back guaranteed cleaning for tenants',
      type: 'RESIDENTIAL' as ServiceType,
      duration: 300,
      basePrice: 350,
      features: ['Complete property clean', 'Bond-back guarantee', 'Carpet cleaning', 'Window cleaning'],
    },
    {
      name: 'Commercial Cleaning',
      slug: 'commercial-cleaning',
      description: 'Professional cleaning for offices and commercial spaces',
      type: 'COMMERCIAL' as ServiceType,
      duration: 180,
      basePrice: 200,
      features: ['Office cleaning', 'Restroom sanitization', 'Kitchen/break room', 'Trash removal'],
    },
    {
      name: 'Carpet Cleaning',
      slug: 'carpet-cleaning',
      description: 'Professional steam carpet cleaning',
      type: 'CARPET' as ServiceType,
      duration: 90,
      basePrice: 150,
      features: ['Steam cleaning', 'Stain removal', 'Deodorizing', 'Quick drying'],
    },
    {
      name: 'Window Cleaning',
      slug: 'window-cleaning',
      description: 'Interior and exterior window cleaning',
      type: 'WINDOW' as ServiceType,
      duration: 60,
      basePrice: 100,
      features: ['Interior windows', 'Exterior windows', 'Screens', 'Sills and tracks'],
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
    console.log(`✅ Service created: ${service.name}`);
  }

  // Create Sample Staff
  const staffPassword = await bcrypt.hash('Staff123!', 12);
  const staffUser = await prisma.user.upsert({
    where: { email: 'staff@cleanpro.com' },
    update: {},
    create: {
      email: 'staff@cleanpro.com',
      password: staffPassword,
      firstName: 'Sarah',
      lastName: 'Smith',
      phone: '+61400000004',
      role: 'STAFF',
      emailVerified: true,
    },
  });

  const staff = await prisma.staff.upsert({
    where: { userId: staffUser.id },
    update: {},
    create: {
      userId: staffUser.id,
      employeeId: 'EMP-001',
      specialization: 'RESIDENTIAL',
      rating: 4.8,
      hourlyRate: 25,
      maxBookingsPerDay: 6,
      isActive: true,
      certifications: ['Standard Cleaning', 'Deep Cleaning', 'Carpet Cleaning'],
    },
  });
  console.log('✅ Staff member created:', staffUser.email);

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📋 Demo Credentials:');
  console.log('Admin: admin@cleanpro.com / Admin123!');
  console.log('Manager: manager@cleanpro.com / Manager123!');
  console.log('Customer: customer@example.com / Customer123!');
  console.log('Staff: staff@cleanpro.com / Staff123!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
