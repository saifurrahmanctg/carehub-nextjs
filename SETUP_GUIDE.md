# CareHub - Setup & Configuration Guide

## ✅ Application Status

The application is **fully functional** and production-ready. All core features have been implemented and tested.

## 📋 Prerequisites

Before running the application, ensure you have:

1. **Node.js** (v18 or higher)
2. **MongoDB** database (local or cloud like MongoDB Atlas)
3. **Gmail account** (for email notifications - optional but recommended)

## 🔧 Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Configuration (REQUIRED)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=carehubdb

# NextAuth Configuration (REQUIRED)
NEXTAUTH_SECRET=your-long-random-secret-key-here-minimum-32-characters
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (OPTIONAL - for Google login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Configuration (OPTIONAL - for booking email notifications)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password

# Application URL (REQUIRED for production)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### How to Get Each Value:

#### 1. MongoDB URI
- **Local MongoDB**: `mongodb://localhost:27017/carehubdb`
- **MongoDB Atlas**: 
  1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  2. Create a free cluster
  3. Click "Connect" → "Connect your application"
  4. Copy the connection string and replace `<password>` with your password

#### 2. NEXTAUTH_SECRET
Generate a random secret:
```bash
openssl rand -base64 32
```
Or use an online generator: https://generate-secret.vercel.app/32

#### 3. Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret

#### 4. Gmail App Password (for email notifications)
1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to "App passwords"
4. Generate a new app password for "Mail"
5. Use this password (not your regular Gmail password) in `EMAIL_PASSWORD`

## 🚀 Installation & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

### 3. Build for Production
```bash
npm run build
npm start
```

## 📝 Features Implemented

### ✅ Core Features
- [x] Responsive design (Mobile, Tablet, Desktop)
- [x] User authentication (Email/Password + Google OAuth)
- [x] User registration with NID, Name, Email, Contact, Password validation
- [x] Dynamic booking form with duration selection (days/hours)
- [x] Location selection (Division, District, City, Area, Address)
- [x] Dynamic cost calculation based on service rates
- [x] Booking status management (Pending/Confirmed/Completed/Cancelled)
- [x] My Bookings page with booking list and cancel functionality
- [x] Service detail pages with metadata
- [x] Email invoice on booking creation
- [x] 404 error page
- [x] Private route protection

### ✅ Pages & Routes
- [x] Homepage (`/`) - Banner, About, Services, Testimonials, Success Metrics
- [x] Services Page (`/services`) - All services overview
- [x] Service Detail (`/service/:id`) - Individual service details with booking button
- [x] Booking Page (`/booking/:id`) - Private route, booking form
- [x] My Bookings (`/my-bookings`) - Private route, user's bookings
- [x] Login (`/login`) - Email/password + Google login
- [x] Register (`/register`) - User registration
- [x] 404 Page (`/not-found`) - Custom error page

### ✅ API Routes
- [x] `/api/auth/[...nextauth]` - NextAuth authentication
- [x] `/api/register` - User registration
- [x] `/api/bookings` - Create and get bookings
- [x] `/api/bookings/[id]` - Cancel booking
- [x] `/api/services` - Get services list (from MongoDB)
- [x] `/api/services/single?id=:id` - Get single service by ID (from MongoDB)

## 🎯 Service Rates

The application includes three services with different pricing:

1. **Baby Care**: ৳1,200/day or ৳250/hour
2. **Elderly Care**: ৳1,500/day or ৳300/hour
3. **Sick People Care**: ৳1,800/day or ৳350/hour

## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based session management
- Private route protection
- Input validation on both client and server
- MongoDB injection protection
- Environment variable security

## 📧 Email Notifications

When a booking is created, an email invoice is automatically sent to the user's email address with:
- Booking ID
- Service details
- Duration and location
- Total cost
- Booking status
- Link to view bookings

## 🐛 Known Issues & Notes

1. **Registration Redirect**: Currently redirects to login page. To redirect directly to booking page after registration, you would need to implement auto-login functionality.

2. **Turbopack**: The build uses webpack instead of Turbopack to avoid Windows symlink issues with MongoDB. This is configured in `package.json`.

3. **Email Service**: Email notifications are sent asynchronously and won't block booking creation if email fails.

## 📦 Database Collections

The application uses MongoDB with the following collections:

- **users**: User accounts (email, password hash, NID, contact, etc.)
- **services**: Available services with their details and pricing
- **bookings**: Booking records (service, location, cost, status, etc.)

## 🚨 Troubleshooting

### MongoDB Connection Issues
- Verify `MONGODB_URI` is correct
- Check MongoDB cluster is running (if local)
- Ensure IP whitelist includes your IP (if MongoDB Atlas)

### Authentication Issues
- Verify `NEXTAUTH_SECRET` is set and at least 32 characters
- Check Google OAuth credentials are correct
- Ensure redirect URI matches in Google Console

### Email Not Sending
- Verify Gmail app password is correct (not regular password)
- Check `EMAIL_USER` and `EMAIL_PASSWORD` are set
- Ensure 2-Step Verification is enabled on Gmail account

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder: `rm -rf .next` (or delete manually on Windows)
- Check Node.js version: `node --version` (should be v18+)

## 📞 Support

For issues or questions:
1. Check the console/terminal for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB is accessible
4. Check browser console for client-side errors

## 🎉 Ready to Use!

Once environment variables are configured, the application is ready to use. Start with:
1. Register a new account
2. Browse services
3. Book a service
4. Check your bookings
5. Receive email confirmation

Happy coding!
