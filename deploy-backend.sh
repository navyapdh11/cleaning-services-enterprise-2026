#!/bin/bash
set -e

echo "========================================="
echo "  CleanPro Backend — Build & Deploy Prep"
echo "========================================="
echo ""

cd backend

echo "📦 Installing dependencies..."
npm install --production

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🔨 Building TypeScript..."
npx tsc

echo ""
echo "✅ Build complete!"
echo ""
echo "To deploy to Render:"
echo "  1. Push to GitHub (triggers auto-deploy if connected)"
echo "  2. Or use: render-cli deploy"
echo ""
echo "Required environment variables:"
echo "  DATABASE_URL     — PostgreSQL connection string"
echo "  JWT_SECRET       — Random 64+ char string"
echo "  JWT_REFRESH_SECRET — Random 64+ char string"
echo "  FRONTEND_URL     — Your Vercel frontend URL"
echo "  STRIPE_SECRET_KEY — Stripe live secret key"
echo "  STRIPE_WEBHOOK_SECRET — Stripe webhook signing secret"
echo ""
