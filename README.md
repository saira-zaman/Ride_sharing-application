# 🚗 RideShare - Modern Ride-Sharing Application

A full-stack ride-sharing application built with **Next.js 14**, **TypeScript**, **MongoDB**, and optimized for **Vercel** deployment.

## Features

✅ **User Authentication**
- Secure registration and login
- Password hashing with bcryptjs
- JWT token generation and verification

✅ **Ride Management**
- Book rides with pickup and dropoff locations
- Real-time fare calculation
- Ride status tracking (pending, accepted, in progress, completed, cancelled)

✅ **Driver & Rider Profiles**
- User type differentiation (rider/driver/admin)
- Rating system
- Total rides counter

✅ **Payment Integration**
- Stripe payment processing ready
- Transparent fare calculation
- Payment status tracking

✅ **Admin Dashboard**
- User statistics
- Ride history
- Activity monitoring

✅ **Vercel Optimized**
- Serverless API routes
- MongoDB Atlas integration
- Environment configuration ready

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT, bcryptjs
- **Hosting**: Vercel
- **Styling**: Tailwind CSS
- **Payment**: Stripe (ready for integration)

## Project Structure

```
ride-sharing-app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── register/route.ts
│   │   ├── rides/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── users/route.ts
│   │   └── health/route.ts
│   ├── components/
│   ├── dashboard/
│   ├── lib/
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   └── Ride.ts
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── errors.ts
│   │   └── helpers.ts
│   ├── login/
│   ├── register/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── .env.local
├── .env.example
├── .gitignore
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── package.json
```

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

**Required variables:**
- `MONGODB_URI` - MongoDB Atlas connection string
- `NEXTAUTH_SECRET` - JWT secret (generate with: `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Rides
- `POST /api/rides` - Create new ride
- `GET /api/rides?riderId=...` - Get user rides
- `GET /api/rides/[id]` - Get ride details
- `PATCH /api/rides/[id]` - Update ride status

### Users
- `GET /api/users` - Get all users
- `POST /api/users/[id]` - Update user profile

### Health Check
- `GET /api/health` - API status

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ride-sharing-app.git
git branch -M main
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Vercel will auto-detect Next.js settings

### 3. Add Environment Variables

In Vercel dashboard:
1. Go to project settings
2. Click "Environment Variables"
3. Add all variables from `.env.local`:
   - MONGODB_URI
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL (use your Vercel domain)
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   - STRIPE_SECRET_KEY
   - NEXT_PUBLIC_MAPBOX_TOKEN
   - EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS

### 4. Deploy

```bash
git push origin main
```

Vercel will automatically deploy on push!

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Database Setup

### MongoDB Atlas
1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Create a database user
4. Whitelist IP (0.0.0.0/0 for development)
5. Copy connection string to `MONGODB_URI`

## Performance & Security

✅ **Optimizations:**
- Serverless functions (zero cold starts with Vercel)
- Database connection pooling
- Type-safe with TypeScript
- Input validation on all endpoints
- Password hashing with bcryptjs

⚠️ **Before Production:**
- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Configure MongoDB IP whitelist to specific IPs
- [ ] Set `NEXTAUTH_URL` to production domain
- [ ] Enable HTTPS only
- [ ] Add rate limiting to API routes
- [ ] Set up monitoring (Vercel Analytics)
- [ ] Configure CORS properly
- [ ] Add email verification
- [ ] Set up SMS OTP for riders/drivers

## Troubleshooting

### MongoDB Connection Error
```
Error: MONGODB_URI is not defined
```
**Solution:** Add `MONGODB_URI` to `.env.local`

### JWT Verification Failed
```
Error: NEXTAUTH_SECRET is not defined
```
**Solution:** Generate secret with `openssl rand -base64 32` and add to env

### API Routes Not Found
- Ensure file structure matches app router conventions
- Restart dev server after file changes

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - feel free to use for commercial projects

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/yourusername/ride-sharing-app/issues)
- Email: support@rideshare.com

---

**Ready to deploy?** Follow the [Deployment to Vercel](#deployment-to-vercel) section above!
