# 🚀 Quick Start Guide

Get the ride-sharing app running in 5 minutes!

## 1️⃣ Clone & Install (1 min)

```bash
cd c:\projects\Ride_Sharing_app_design
npm install
```

## 2️⃣ Setup Environment (1 min)

```bash
cp .env.example .env.local
```

**Edit `.env.local`:**
- Get MongoDB URI from [mongodb.com/atlas](https://www.mongodb.com/atlas)
- Generate secret: `openssl rand -base64 32`
- Add secret as `NEXTAUTH_SECRET`

## 3️⃣ Start Development (1 min)

```bash
npm run dev
```

🌐 Open browser: **http://localhost:3000**

## 4️⃣ Test Features (2 min)

✅ **Homepage** - http://localhost:3000
- View app info
- See features
- Navigate to login/register

✅ **Register** - http://localhost:3000/register
- Create test account
- Try with email: test@example.com
- Password: Test123!

✅ **Login** - http://localhost:3000/login
- Login with credentials
- Should redirect to dashboard

✅ **Dashboard** - http://localhost:3000/dashboard
- View user stats
- See recent activity

✅ **API Health** - http://localhost:3000/api/health
```json
{
  "success": true,
  "message": "API is running",
  "version": "1.0.0"
}
```

---

## 🛠️ Available Commands

```bash
# Development
npm run dev              # Start dev server on :3000

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript check

# Database
# (Use MongoDB Atlas dashboard for database management)
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page |
| `app/register/page.tsx` | Registration page |
| `app/login/page.tsx` | Login page |
| `app/dashboard/page.tsx` | User dashboard |
| `app/api/auth/register/route.ts` | Registration API |
| `app/api/auth/login/route.ts` | Login API |
| `app/api/rides/route.ts` | Rides API |
| `app/lib/db.ts` | Database connection |
| `app/lib/auth.ts` | Auth utilities |
| `.env.local` | Environment variables |

---

## 🧪 Testing API with Curl

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890",
    "userType": "rider"
  }'
```

### Login User
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Ride
```bash
curl -X POST http://localhost:3000/api/rides \
  -H "Content-Type: application/json" \
  -d '{
    "riderId": "user-id-from-register",
    "pickupLocation": {
      "address": "123 Main St",
      "coordinates": {"latitude": 40.7128, "longitude": -74.0060}
    },
    "dropoffLocation": {
      "address": "456 Park Ave",
      "coordinates": {"latitude": 40.7614, "longitude": -73.9776}
    },
    "distance": 5.2,
    "duration": 15,
    "vehicleType": "economy"
  }'
```

### Health Check
```bash
curl http://localhost:3000/api/health
```

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9    # Mac/Linux
netstat -ano | findstr :3000     # Windows
```

### MongoDB Connection Failed
- Check `MONGODB_URI` in `.env.local`
- Verify IP whitelist in MongoDB Atlas
- Test connection string

### Build Errors
```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript Errors
```bash
# Type check
npm run type-check

# Or fix with:
npm run lint -- --fix
```

---

## 📦 Project Dependencies

**Key Packages:**
- `next@14` - React framework
- `react@18` - UI library
- `typescript` - Type safety
- `mongoose@8` - Database ORM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `tailwindcss` - CSS framework

**Install all:**
```bash
npm install
```

---

## 🌐 Deployment Preview

When ready to deploy:

```bash
# 1. Build locally first
npm run build

# 2. Test production build
npm start

# 3. Push to GitHub
git push origin main

# 4. Vercel auto-deploys!
```

Your live URL: `https://your-app.vercel.app`

---

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Guide](https://docs.mongodb.com)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

## ✅ You're All Set!

```bash
npm run dev
# → Open http://localhost:3000
# → Start building! 🚀
```

Need help? Check [README.md](README.md) or [DEPLOYMENT.md](DEPLOYMENT.md)
