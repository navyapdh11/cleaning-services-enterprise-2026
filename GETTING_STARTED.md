# 🚀 Getting Started Guide

## Quick Start (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

The backend `.env` file is already created with development defaults. Review it:

```bash
cat backend/.env
```

**Important defaults:**
- Database: `postgresql://postgres:postgres@localhost:5432/cleaning_services`
- JWT Secret: Change in production!
- Demo credentials provided below

### 3. Start Infrastructure (Docker)

You need PostgreSQL and Redis running. The easiest way:

```bash
# Start only PostgreSQL and Redis from docker-compose
cd docker
docker-compose up -d db redis
cd ..
```

Or run the full stack:

```bash
cd docker
docker-compose up -d
```

### 4. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with demo data
npm run db:seed
```

### 5. Start Development Servers

**Option A: Run both backend and frontend together**
```bash
npm run dev
```

**Option B: Run separately (in different terminals)**
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Health**: http://localhost:4000/health

### 📋 Demo Credentials

After running `npm run db:seed`:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@cleanpro.com | Admin123! |
| Manager | manager@cleanpro.com | Manager123! |
| Customer | customer@example.com | Customer123! |
| Staff | staff@cleanpro.com | Staff123! |

---

## Full Docker Deployment

### Production Deployment

```bash
# Set production environment variables
export JWT_SECRET=$(openssl rand -base64 32)
export JWT_REFRESH_SECRET=$(openssl rand -base64 32)
export STRIPE_SECRET_KEY=sk_live_your_key
export STRIPE_WEBHOOK_SECRET=whsec_your_secret
export FRONTEND_URL=https://yourdomain.com
export NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1

# Build and start all services
cd docker
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Services After Deployment

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | - |
| Backend API | http://localhost:4000 | - |
| PostgreSQL | localhost:5432 | postgres/postgres |
| Redis | localhost:6379 | - |
| Grafana | http://localhost:3001 | admin/admin (or $GRAFANA_ADMIN_PASSWORD) |
| Prometheus | http://localhost:9090 | - |

---

## Database Management

### View database
```bash
npm run db:studio
```
Opens Prisma Studio at http://localhost:5555

### Create migration
```bash
cd backend
npx prisma migrate dev --name description_of_changes
```

### Reset database (WARNING: deletes all data)
```bash
cd backend
npx prisma migrate reset
```

### Seed database
```bash
npm run db:seed
```

---

## Troubleshooting

### Database connection error
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Start PostgreSQL
cd docker && docker-compose up -d db

# Test connection
docker exec -it cleaning-services-enterprise-2026-db-1 psql -U postgres -d cleaning_services
```

### Redis connection error
```bash
# Check if Redis is running
docker ps | grep redis

# Test Redis
docker exec -it cleaning-services-enterprise-2026-redis-1 redis-cli ping
```

### Port already in use
```bash
# Find what's using the port
lsof -i :3000  # or :4000, :5432, etc.

# Kill the process
kill -9 <PID>
```

### Prisma Client not generated
```bash
# Regenerate
cd backend
npx prisma generate

# Or from root
npm run db:generate
```

### Frontend build errors
```bash
# Clear Next.js cache
cd frontend
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

---

## Development Workflow

1. **Make changes to Prisma schema** → `npm run db:generate` and `npm run db:push`
2. **Add new seed data** → Update `backend/prisma/seed.ts` then `npm run db:seed`
3. **Backend changes** → Auto-reload with `npm run dev:backend`
4. **Frontend changes** → Auto-refresh with `npm run dev:frontend`
5. **Run tests** → `npm test` (when tests are added)

---

## Next Steps

- [API Documentation](README.md#api-documentation)
- [Deployment Guide](docs/deployment.md)
- [Architecture Overview](README.md#architecture)
- [Monitoring Setup](README.md#monitoring)

---

**Need help?** Check the [Issues](https://github.com/navyapdh11/cleaning-services-enterprise-2026/issues) or create a new one!
