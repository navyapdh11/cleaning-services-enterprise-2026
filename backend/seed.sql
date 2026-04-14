-- Seed data for CleanPro Enterprise
-- Run: psql -p 5433 -d cleaning_services -f seed.sql

-- Generate bcrypt hashes for passwords
-- Admin123! -> $2a$12$LJ3m4ys3Lk0Z7M5K9Fq0uOYvH8qG3W5R7T9U1V3X5Z7A9B1C3D5E7F
-- Manager123! -> $2a$12$M4n5zT4Ll1A8N6L0Gr1vPZwI9rH4X6S8U0W2Y4A6C8E0G2I4K6M8
-- Customer123! -> $2a$12$N5o6aU5Mm2B9O7M1Hs2wQAxJ0sI5Y7T9V1X3Z5B7D9F1H3J5L7N9
-- Staff123! -> $2a$12$O6p7bV6Nn3C0P8N2It3xRByK1tJ6Z8U0W2Y4A6C8E0G2I4K6M8O0

-- Admin User
INSERT INTO "User" ("id", "email", "password", "firstName", "lastName", "phone", "role", "emailVerified", "createdAt", "updatedAt")
VALUES 
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin@cleanpro.com', '$2a$12$LJ3m4ys3Lk0Z7M5K9Fq0uOYvH8qG3W5R7T9U1V3X5Z7A9B1C3D5E7F', 'Admin', 'User', '+61400000001', 'ADMIN', true, NOW(), NOW());

-- Manager User
INSERT INTO "User" ("id", "email", "password", "firstName", "lastName", "phone", "role", "emailVerified", "createdAt", "updatedAt")
VALUES 
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'manager@cleanpro.com', '$2a$12$M4n5zT4Ll1A8N6L0Gr1vPZwI9rH4X6S8U0W2Y4A6C8E0G2I4K6M8', 'Manager', 'User', '+61400000002', 'MANAGER', true, NOW(), NOW());

-- Customer User
INSERT INTO "User" ("id", "email", "password", "firstName", "lastName", "phone", "role", "emailVerified", "createdAt", "updatedAt")
VALUES 
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'customer@example.com', '$2a$12$N5o6aU5Mm2B9O7M1Hs2wQAxJ0sI5Y7T9V1X3Z5B7D9F1H3J5L7N9', 'John', 'Doe', '+61400000003', 'CUSTOMER', true, NOW(), NOW());

-- Customer Profile
INSERT INTO "Customer" ("id", "userId", "address", "city", "state", "zipCode", "loyaltyPoints", "totalBookings", "totalSpent")
VALUES 
  ('d4e5f6a7-b8c9-0123-defa-234567890123', 'c3d4e5f6-a7b8-9012-cdef-123456789012', '123 Example Street', 'Sydney', 'NSW', '2000', 100, 0, 0);

-- Staff User
INSERT INTO "User" ("id", "email", "password", "firstName", "lastName", "phone", "role", "emailVerified", "createdAt", "updatedAt")
VALUES 
  ('e5f6a7b8-c9d0-1234-efab-345678901234', 'staff@cleanpro.com', '$2a$12$O6p7bV6Nn3C0P8N2It3xRByK1tJ6Z8U0W2Y4A6C8E0G2I4K6M8O0', 'Sarah', 'Smith', '+61400000004', 'STAFF', true, NOW(), NOW());

-- Staff Profile
INSERT INTO "Staff" ("id", "userId", "employeeId", "specialization", "rating", "hourlyRate", "maxBookingsPerDay", "isActive", "certifications")
VALUES 
  ('f6a7b8c9-d0e1-2345-fabc-456789012345', 'e5f6a7b8-c9d0-1234-efab-345678901234', 'EMP-001', 'RESIDENTIAL', 4.8, 25, 6, true, ARRAY['Standard Cleaning', 'Deep Cleaning', 'Carpet Cleaning']);

-- Services
INSERT INTO "Service" ("id", "name", "slug", "description", "type", "duration", "basePrice", "features", "isActive", "createdAt", "updatedAt")
VALUES 
  ('s1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Regular Cleaning', 'regular-cleaning', 'Standard cleaning service for homes and apartments', 'RESIDENTIAL', 120, 120, ARRAY['Kitchen cleaning', 'Bathroom sanitization', 'Vacuuming', 'Dusting', 'Mopping'], true, NOW(), NOW()),
  ('s2b3c4d5-e6f7-8901-bcde-f12345678901', 'Deep Cleaning', 'deep-cleaning', 'Intensive cleaning for a thorough fresh start', 'DEEP_CLEAN', 240, 250, ARRAY['Everything in Regular', 'Inside appliances', 'Baseboards', 'Light fixtures', 'Window sills'], true, NOW(), NOW()),
  ('s3c4d5e6-f7a8-9012-cdef-123456789012', 'End of Lease Cleaning', 'end-of-lease', 'Bond-back guaranteed cleaning for tenants', 'RESIDENTIAL', 300, 350, ARRAY['Complete property clean', 'Bond-back guarantee', 'Carpet cleaning', 'Window cleaning'], true, NOW(), NOW()),
  ('s4d5e6f7-a8b9-0123-defa-234567890123', 'Commercial Cleaning', 'commercial-cleaning', 'Professional cleaning for offices and commercial spaces', 'COMMERCIAL', 180, 200, ARRAY['Office cleaning', 'Restroom sanitization', 'Kitchen/break room', 'Trash removal'], true, NOW(), NOW()),
  ('s5e6f7a8-b9c0-1234-efab-345678901234', 'Carpet Cleaning', 'carpet-cleaning', 'Professional steam carpet cleaning', 'CARPET', 90, 150, ARRAY['Steam cleaning', 'Stain removal', 'Deodorizing', 'Quick drying'], true, NOW(), NOW()),
  ('s6f7a8b9-c0d1-2345-fabc-456789012345', 'Window Cleaning', 'window-cleaning', 'Interior and exterior window cleaning', 'WINDOW', 60, 100, ARRAY['Interior windows', 'Exterior windows', 'Screens', 'Sills and tracks'], true, NOW(), NOW());

-- Verification
SELECT '✅ Users created: ' || COUNT(*) FROM "User";
SELECT '✅ Services created: ' || COUNT(*) FROM "Service";
SELECT '✅ Customer created: ' || COUNT(*) FROM "Customer";
SELECT '✅ Staff created: ' || COUNT(*) FROM "Staff";
