# 🚀 Vercel Deployment Guide

Complete step-by-step guide to deploy your ride-sharing app to Vercel.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Setup](#local-setup)
3. [GitHub Setup](#github-setup)
4. [Vercel Configuration](#vercel-configuration)
5. [Environment Variables](#environment-variables)
6. [MongoDB Setup](#mongodb-setup)
7. [Testing Deployment](#testing-deployment)
8. [Post-Deployment](#post-deployment)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] GitHub account
- [ ] Vercel account (free at [vercel.com](https://vercel.com))
- [ ] MongoDB Atlas account (free at [mongodb.com/atlas](https://www.mongodb.com/atlas))
- [ ] Stripe account (optional, for payments)

---

## Local Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

```bash
cp .env.example .env.local
```

### 3. Generate Secrets

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```
Copy the output and add to `.env.local`:
```
NEXTAUTH_SECRET=your-generated-secret-here
```

### 4. Configure MongoDB

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user (note username and password)
4. Whitelist all IPs (0.0.0.0/0 for development)
5. Get connection string and replace in `.env.local`:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rideapp?retryWrites=true&w=majority
```

### 5. Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` and test:
- [ ] Home page loads
- [ ] Register page works
- [ ] Login page works
- [ ] API health check: `http://localhost:3000/api/health`

---

## GitHub Setup

### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Ride-sharing app with Next.js"
```

### 2. Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `ride-sharing-app`
3. Click "Create repository"

### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/ride-sharing-app.git
git branch -M main
git push -u origin main
```

---

## Vercel Configuration

### 1. Import Project to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..."
3. Select "Project"
4. Click "Import Git Repository"
5. Paste your GitHub repo URL
6. Click "Continue"

### 2. Configure Project

Vercel will auto-detect:
- ✅ Framework: Next.js
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`

Keep default settings and click "Deploy"

---

## Environment Variables

### 1. Add Variables in Vercel

After import, go to **Settings** → **Environment Variables**

Add these variables:

| Variable | Value | Example |
|----------|-------|---------|
| MONGODB_URI | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster...` |
| NEXTAUTH_SECRET | Your generated secret | Use value from local setup |
| NEXTAUTH_URL | Your Vercel domain | `https://your-app.vercel.app` |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Stripe publishable key | `pk_live_...` |
| STRIPE_SECRET_KEY | Stripe secret key | `sk_live_...` |
| NEXT_PUBLIC_MAPBOX_TOKEN | Mapbox token (optional) | `pk_...` |
| EMAIL_SERVICE | Email provider | `gmail` |
| EMAIL_USER | Email address | `your-email@gmail.com` |
| EMAIL_PASS | Email password/app password | `your-app-password` |

### 2. Set Environment for Production

1. Click each variable
2. Check "Production" checkbox
3. Add them to production environment

---

## MongoDB Setup for Production

### 1. Secure MongoDB Atlas

**IP Whitelist:**
1. Go to MongoDB Atlas dashboard
2. Network Access → IP Whitelist
3. Remove 0.0.0.0/0 (development only!)
4. Add Vercel IP ranges:
   - `76.75.126.0/24`
   - `54.80.0.0/8`
   - Or use "Allow access from anywhere" for quick setup

**Database User:**
1. Create strong password
2. Use this user in `MONGODB_URI`
3. Never commit credentials

### 2. Database Security

- [ ] Enable encryption at rest
- [ ] Enable IP whitelist
- [ ] Regular backups enabled
- [ ] Strong database password

---

## Testing Deployment

### 1. Test API Endpoints

After deployment, test these:

```bash
# Health check
curl https://your-app.vercel.app/api/health

# Register (test data)
curl -X POST https://your-app.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "1234567890",
    "userType": "rider"
  }'

# Login
curl -X POST https://your-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Manual Testing

1. Visit `https://your-app.vercel.app`
2. Test registration flow
3. Test login flow
4. Test dashboard access
5. Verify no console errors

### 3. Performance Check

Use Vercel Analytics:
1. Go to project → Analytics
2. Check Core Web Vitals
3. Monitor function duration

---

## Post-Deployment

### 1. Configure Custom Domain

1. Go to project settings
2. Domains → Add
3. Add your custom domain
4. Update `NEXTAUTH_URL` to custom domain

### 2. Setup Monitoring

- [ ] Vercel Analytics enabled
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Database monitoring in MongoDB Atlas

### 3. Setup CI/CD

Vercel automatically:
- Deploys on `git push` to main
- Creates preview on pull requests
- Runs build validation

### 4. Security Checklist

- [ ] All secrets in environment variables (not in code)
- [ ] HTTPS enforced
- [ ] CORS configured
- [ ] Rate limiting added
- [ ] Input validation enabled
- [ ] SQL injection prevention
- [ ] XSS protection

---

## Auto-Deploy Setup

Vercel automatically deploys on git push. For automatic deployments:

```bash
# Setup push to automatically deploy
git push origin main  # Auto-deploys to production
```

For preview URLs:
```bash
# Create feature branch
git checkout -b feature/my-feature

# Push to create preview deployment
git push origin feature/my-feature

# Vercel creates preview URL automatically
```

---

## Environment Configuration by Stage

### Development (Local)
```env
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://dev-user:pass@cluster.mongodb.net/rideapp-dev
```

### Staging (Optional Vercel Deployment)
```env
NEXTAUTH_URL=https://staging.your-domain.com
MONGODB_URI=mongodb+srv://staging-user:pass@cluster.mongodb.net/rideapp-staging
```

### Production
```env
NEXTAUTH_URL=https://your-domain.com
MONGODB_URI=mongodb+srv://prod-user:pass@cluster.mongodb.net/rideapp-prod
```

---

## Troubleshooting

### 1. Build Fails

**Error:** `MONGODB_URI is not defined`
```bash
# Solution: Add to Vercel environment variables
# Go to Settings → Environment Variables
```

**Error:** Module not found
```bash
# Solution: Reinstall dependencies
npm install
git add .
git commit -m "Update dependencies"
git push origin main
```

### 2. API Not Working

**Check logs:**
1. Go to Deployments
2. Click latest deployment
3. Click "Function logs"
4. Look for errors

**Common fixes:**
- Verify `MONGODB_URI` is correct
- Check database whitelist includes Vercel IPs
- Verify environment variables are set

### 3. Database Connection Issues

```
Error: connect ECONNREFUSED
```

**Solution:**
1. Check MongoDB Atlas IP whitelist
2. Verify connection string
3. Check database user permissions
4. Test connection locally first

### 4. Performance Issues

**Optimize:**
- [ ] Add database indexes
- [ ] Implement caching
- [ ] Minimize API calls
- [ ] Optimize images
- [ ] Use serverless functions efficiently

---

## Rollback

To rollback to previous deployment:

1. Go to Vercel dashboard
2. Click Deployments
3. Find previous good deployment
4. Click "..."
5. Select "Promote to Production"

---

## Next Steps

After successful deployment:

1. **Setup email** - Configure email service for notifications
2. **Add payments** - Integrate Stripe for ride payments
3. **Add maps** - Integrate Mapbox for real-time tracking
4. **Scale database** - Upgrade MongoDB tier as needed
5. **Monitor performance** - Setup alerts in Vercel

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **Community**: https://vercel.com/support

---

**🎉 Your app is now live on Vercel!**

Visit: `https://your-app.vercel.app`
