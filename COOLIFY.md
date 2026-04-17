# 🚀 Coolify Deployment Guide

## Prerequisites

- [Coolify](https://coolify.io/) installed and running
- GitHub repo connected to Coolify
- Domain pointed to your Coolify server (optional but recommended)

## Option A: Docker Compose Deployment (Recommended)

### 1. Create New Resource
1. In Coolify dashboard → Select your server → **Add Resource** → **Docker Compose Empty**
2. Paste the contents of `docker/docker-compose.coolify.yml`
3. Coolify will parse the services and volumes automatically

### 2. Set Environment Variables
In the Coolify UI, set these required variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | JWT signing key (min 32 chars) | `openssl rand -hex 32` |
| `JWT_REFRESH_SECRET` | Refresh token key (min 32 chars) | `openssl rand -hex 32` |
| `POSTGRES_PASSWORD` | Database password | `openssl rand -hex 16` |
| `STRIPE_SECRET_KEY` | Stripe live secret key | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` |
| `FRONTEND_URL` | Public frontend URL | `https://yourdomain.com` |
| `NEXT_PUBLIC_API_URL` | Public backend API URL | `https://api.yourdomain.com/api/v1` |
| `SMTP_HOST` | Email server host | `smtp.gmail.com` |
| `SMTP_PORT` | Email server port | `587` |
| `SMTP_USER` | Email username | `you@gmail.com` |
| `SMTP_PASS` | Email password | `your-app-password` |
| `SMTP_FROM` | From email address | `noreply@yourdomain.com` |

### 3. Configure Ports & Domains
- **Frontend**: Map port `3000` → set your domain (e.g., `yourdomain.com`)
- **Backend**: Map port `4000` → set your API domain (e.g., `api.yourdomain.com`)
- **Database** (5432) and **Redis** (6379): Keep internal, don't expose publicly

### 4. Deploy
Click **Deploy** — Coolify will build and start all services.

### 5. Run Database Migrations
After the backend is running, open a shell on the backend container:
```bash
npx prisma migrate deploy
npx prisma db seed   # Optional: seed demo data
```

---

## Option B: Git-Based Deployment (Auto-Deploy on Push)

### 1. Connect Repository
1. In Coolify → **Add Resource** → **Git-Based Application**
2. Select your GitHub repo → branch: `main`

### 2. Create Two Applications
#### Frontend App
- **Build Pack**: Nixpacks
- **Build Command**: `cd frontend && npm ci && npm run build`
- **Start Command**: `cd frontend && npm start`
- **Port**: `3000`
- **Env Vars**:
  - `NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1`
  - `NODE_ENV=production`

#### Backend App
- **Build Pack**: Nixpacks
- **Build Command**: `cd backend && npm ci && npx prisma generate && npx tsc`
- **Start Command**: `cd backend && node dist/server.js`
- **Port**: `4000`
- **Env Vars**: (see table above)
- **Services**: Attach PostgreSQL and Redis from Coolify's built-in services

---

## Verify Deployment

1. **Backend Health**: `https://api.yourdomain.com/health`
   ```json
   { "status": "ok", "timestamp": "...", "version": "1.0.0" }
   ```

2. **Frontend**: `https://yourdomain.com`

3. **Seed Demo Data** (optional):
   ```bash
   cd backend && npx prisma db seed
   ```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check `DATABASE_URL` env var points to correct DB |
| Frontend 500 errors | Ensure `NEXT_PUBLIC_API_URL` is set and backend is reachable |
| Redis errors | Verify `REDIS_URL=redis://redis:6379` in Docker Compose mode |
| Database migration errors | Run `npx prisma migrate deploy` on backend container |
| Stripe errors | Ensure `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are set |
