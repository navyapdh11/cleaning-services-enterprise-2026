# 🧹 CleanPro Enterprise

> **Premium Cleaning Services Platform** — Full-stack, production-ready, enterprise-grade.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![Istio](https://img.shields.io/badge/Istio-Service%20Mesh-blue.svg)](https://istio.io/)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Monitoring](#monitoring)
- [Documentation](#documentation)
- [License](#license)

---

## ✨ Features

### Customer Portal
- ✅ Instant online booking with real-time availability
- ✅ Transparent pricing — no hidden fees
- ✅ Real-time cleaning progress tracking
- ✅ Secure payment processing (Stripe)
- ✅ Reviews and ratings
- ✅ Loyalty rewards program
- ✅ Referral system

### Staff Platform
- ✅ Schedule management and route optimization
- ✅ Digital checklists and quality scoring
- ✅ Performance metrics and analytics
- ✅ Certification level progression
- ✅ Real-time communication with dispatch

### Admin Console
- ✅ Real-time dashboard with KPIs
- ✅ User and staff management
- ✅ Service catalog management
- ✅ Financial analytics and reporting
- ✅ DFS-driven dynamic menu with RBAC
- ✅ Review moderation

### Enterprise Features
- ✅ Istio service mesh for reliability
- ✅ Grafana dashboards for monitoring
- ✅ Rate limiting and security headers
- ✅ JWT authentication with refresh tokens
- ✅ Role-based access control (Admin, Manager, Staff, Customer)
- ✅ PostgreSQL with Prisma ORM (type-safe)
- ✅ Redis caching layer

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 19, Tailwind CSS, Framer Motion, Recharts |
| **Backend** | Node.js, Express, TypeScript, Prisma ORM |
| **Database** | PostgreSQL 16, Redis 7 |
| **Infrastructure** | Docker, Docker Compose, Istio Service Mesh |
| **Monitoring** | Grafana, Prometheus, Winston |
| **Payments** | Stripe |
| **Auth** | JWT, bcrypt, Helmet, Rate Limiting |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Istio Ingress Gateway                     │
│                   (TLS, Rate Limiting, AuthZ)                   │
└──────────────────────┬──────────────────────────────────────────┘
                       │
              ┌────────┴────────┐
              │                 │
    ┌─────────▼────────┐ ┌─────▼──────────────┐
    │  Frontend (Next.js) │ │  Backend (Express) │
    │  Port 3000          │ │  Port 4000         │
    │  SSR + API Routes   │ │  REST API          │
    └─────────────────────┘ └──────┬─────────────┘
                                   │
                          ┌────────┴────────┐
                          │                 │
                ┌─────────▼────────┐ ┌──────▼──────┐
                │  PostgreSQL       │ │   Redis     │
                │  Port 5432        │ │   Port 6379 │
                └──────────────────┘ └─────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     Monitoring Stack                            │
│              Prometheus (Port 9090) + Grafana (Port 3001)       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 16 (or use Docker)
- Redis 7 (or use Docker)

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/navyapdh11/cleaning-services-enterprise-2026.git
cd cleaning-services-enterprise-2026

# Copy environment file
cp backend/.env.example backend/.env

# Start all services
cd docker
docker-compose up -d

# Access services
# Frontend: http://localhost:3000
# Backend API: http://localhost:4000
# Grafana: http://localhost:3001 (admin/admin)
# Prometheus: http://localhost:9090
```

### Manual Setup

```bash
# Install dependencies
npm install

# Set up database
cd backend
cp .env.example .env
npm run db:generate
npm run db:push
npm run db:seed

# Start backend
npm run dev:backend

# Start frontend (new terminal)
npm run dev:frontend
```

---

## 📁 Project Structure

```
cleaning-services-enterprise-2026/
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── config/            # Database, Redis, Env config
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Auth, error handling, logging
│   │   ├── routes/            # API route definitions
│   │   ├── services/          # Business logic (DFS menu, email, notifications)
│   │   └── utils/             # Helpers, error classes, response wrappers
│   └── prisma/
│       └── schema.prisma      # Database schema
├── frontend/                   # Next.js React application
│   ├── src/
│   │   ├── app/               # Next.js app router (pages)
│   │   ├── components/        # Reusable UI components
│   │   ├── lib/               # API client, auth store, utilities
│   │   └── styles/            # Global CSS, Tailwind
│   └── public/                # Static assets
├── docker/                     # Docker Compose, Prometheus config
├── istio/                      # Istio gateway, virtual services, policies
├── grafana/                    # Grafana dashboard JSON
├── docs/                       # Documentation
│   ├── pitch-deck/            # Investor pitch deck
│   ├── operations-manual/     # Staff training manual
│   ├── email-sequences/       # Customer nurture sequences
│   ├── ad-campaigns/          # Google + Facebook ad plans
│   └── pr/                    # Press releases
└── scripts/                    # Utility scripts
```

---

## 📡 API Documentation

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Create new account |
| POST | `/api/v1/auth/login` | Login with credentials |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| POST | `/api/v1/auth/logout` | Logout (auth required) |
| GET | `/api/v1/auth/profile` | Get user profile |
| PUT | `/api/v1/auth/profile` | Update profile |

### Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/services` | List all services |
| GET | `/api/v1/services/:slug` | Get service by slug |
| POST | `/api/v1/services` | Create service (Admin) |
| PUT | `/api/v1/services/:id` | Update service (Admin) |
| DELETE | `/api/v1/services/:id` | Delete service (Admin) |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/bookings` | List user's bookings |
| POST | `/api/v1/bookings` | Create new booking |
| GET | `/api/v1/bookings/:id` | Get booking details |
| PUT | `/api/v1/bookings/:id/cancel` | Cancel booking |
| GET | `/api/v1/bookings/admin/all` | All bookings (Admin) |
| PUT | `/api/v1/bookings/admin/:id/assign` | Assign staff (Admin) |

### Menu (DFS-Powered)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/menu` | Get role-based menu tree |
| GET | `/api/v1/menu/flat` | Get flat menu list |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/dashboard` | Get overview metrics |
| GET | `/api/v1/dashboard/analytics` | Get analytics data |

---

## 🌐 Deployment

### Production Docker

```bash
# Set production environment variables
export JWT_SECRET=your-production-secret
export DATABASE_URL=postgresql://...
export STRIPE_SECRET_KEY=sk_live_...

# Build and deploy
docker-compose -f docker/docker-compose.yml up -d --build
```

### Kubernetes + Istio

```bash
# Install Istio
istioctl install --set profile=default

# Deploy application
kubectl apply -f istio/gateway-config.yaml
kubectl apply -f k8s/

# Verify
istioctl analyze
kubectl get gateway,virtualservice,destinationrule
```

---

## 📊 Monitoring

### Grafana Dashboards

Access at `http://localhost:3001` (default: admin/admin)

**Pre-configured dashboards:**
- API Request Rate & Latency
- Active Bookings & Revenue
- Error Rate Tracking
- Database Connection Pool
- Redis Memory Usage
- Service Response Heatmap
- Booking Status Distribution
- User Activity Tracking

### Prometheus Metrics

Access at `http://localhost:9090`

Configured scrape targets:
- Backend API (custom metrics)
- Node Exporter (system metrics)
- Prometheus self-monitoring

---

## 📚 Documentation

- [📊 Investor Pitch Deck](docs/pitch-deck/investor-pitch.md)
- [📖 Operations Manual](docs/operations-manual/operations-manual.md)
- [📧 Email Nurture Sequences](docs/email-sequences/nurture-sequences.md)
- [📢 Ad Campaign Plans](docs/ad-campaigns/google-facebook-ads.md)
- [📰 Press Release](docs/pr/press-release-launch.md)

---

## 📄 License

MIT License — see LICENSE file for details.

---

**Built with ❤️ by CleanPro Enterprise** | [www.cleanpro.com](https://cleanpro.com)
