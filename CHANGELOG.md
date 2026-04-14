# Changelog

All notable changes to the CleanPro Enterprise project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 🔧 Critical Backend Fixes

#### Authentication & Authorization
- **Fixed auth controller/route architecture mismatch** - Refactored authController from Router pattern to export individual handler functions, fixing runtime errors on all auth routes
- **Added forgot password / reset password flow** - Implemented secure token-based password reset with email verification
- **Fixed duplicate lastLoginAt update** - Removed redundant database call in login handler
- **Created Customer record on registration** - Auto-generate associated Customer profile when new users register

#### Security & Validation
- **Fixed Stripe webhook raw body handling** - Added bodyParser.raw() middleware specifically for webhook endpoint to enable proper signature verification
- **Added authorization to admin booking routes** - Protected `/admin/all` and `/admin/:id/assign` with `authorize('ADMIN', 'MANAGER')` middleware
- **Added validation middleware to admin user creation** - Added express-validator rules for email, password, firstName, lastName, and role
- **Added validation to admin user update** - Added role and isActive validation with proper error handling
- **Added staff validation in booking creation** - Validates staff existence and availability when staffId is provided

#### Data & Database
- **Fixed Prisma schema relations** - Corrected Booking and Review models to reference Customer instead of User, fixing relation errors
- **Fixed revenueByMonth analytics query** - Replaced incorrect groupBy with proper SQL DATE_TRUNC for monthly aggregation
- **Fixed notificationService email sending** - Now fetches user's actual email address instead of using userId UUID
- **Fixed successResponse signature** - Changed 4th parameter from `meta` to `statusCode` and properly set HTTP status codes

#### Code Quality
- **Created logs directory** - Created `/backend/logs` for Winston logger file transports
- **Replaced console.log/error with Winston logger** - Updated Redis config and other files for consistent logging
- **Replaced `any` types with proper TypeScript** - Changed to `Record<string, any>` with comments for Prisma where clauses
- **Created logger utility** - Extracted Winston logger to `/utils/logger.ts` for better import structure

### 🎨 Frontend Fixes

#### Bug Fixes
- **Fixed book/page.tsx watch('bathroom') bug** - Changed to watch('bathrooms') to match form schema
- **Fixed duplicate useForm instance** - Removed second useForm call and extracted `trigger` from main form instance
- **Added @stripe/stripe-js dependency** - Added missing package to package.json

#### Missing Pages & Routes
- **Created /about page** - Company story, stats, and values page with Framer Motion animations
- **Created /pricing page** - Transparent pricing plans with 3 tiers and add-ons section
- **Created /contact page** - Contact form with validation and business information
- **Fixed footer links** - Updated to point to actual service page URLs instead of non-existent routes

#### Security & UX
- **Added route protection middleware** - Created Next.js middleware to protect /dashboard and /admin routes, redirect unauthenticated users
- **Created grid.svg** - Added missing static asset referenced by multiple pages

#### Infrastructure
- **Created comprehensive seed script** - Seeds admin, manager, customer, staff users and 6 services
- **Added Prisma seed config** - Added to package.json for automatic seeding
- **Created Dockerfiles** - Multi-stage builds for both backend and frontend
- **Updated .gitignore** - Added OS-specific files, debug files, and backup patterns
- **Created GETTING_STARTED.md** - Comprehensive setup and troubleshooting guide

### 📦 New Features
- Password reset functionality with secure token generation
- Email verification endpoint
- Monthly revenue analytics with proper date truncation
- Route protection for admin and dashboard pages
- About, Pricing, and Contact pages
- Comprehensive demo data seeding

### 🐛 Bug Fixes Summary
- **4 Critical** bugs fixed (auth routing, Stripe webhook, logging, duplicate updates)
- **9 High** priority issues fixed (password reset, customer creation, notifications, admin auth, form bugs)
- **6 Medium** priority improvements (validation, types, logging, styling)
- **3 Low** priority enhancements (documentation, gitignore, seed data)

### 📝 Documentation
- Added GETTING_STARTED.md with step-by-step setup
- Added this CHANGELOG.md
- Updated README.md references

### 🔒 Security Improvements
- Admin routes now properly protected with role-based access control
- Password reset uses time-limited JWT tokens (1 hour expiry)
- Email verification prevents unverified account usage
- Stripe webhook signature verification now works correctly
- Form validation prevents invalid data submission

---

## [1.0.0] - 2024-12-XX

### Initial Release
- Full-stack enterprise cleaning services platform
- Next.js 15 frontend with React 19
- Node.js/Express backend with TypeScript
- PostgreSQL database with Prisma ORM
- Redis caching layer
- Stripe payment integration
- JWT authentication
- Role-based access control (Admin, Manager, Staff, Customer)
- Istio service mesh configuration
- Grafana monitoring dashboards
- Docker Compose deployment configuration
