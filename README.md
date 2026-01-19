## CareHub – Care.xyz

Baby sitting, elderly care, and sick care booking platform built with Next.js App Router, NextAuth, MongoDB, and Nodemailer.

### Features
- Email/password auth with password policy + Google SSO
- Private routes for booking and my bookings
- Dynamic booking form with duration, location, and live cost (service-based rates)
- Booking status: Pending / Confirmed / Completed / Cancelled (cancel from My Bookings)
- Email invoice on booking creation
- Responsive layout with service detail pages and 404 page
- Metadata on home and service detail pages

### Environment
Create a `.env.local` with:
```
MONGODB_URI=your-mongodb-uri
DB_NAME=carehubdb
NEXTAUTH_SECRET=long-random-secret
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
EMAIL_USER=youremail@gmail.com
EMAIL_PASSWORD=gmail-app-password
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Run locally
```
npm install
npm run dev
```
Visit http://localhost:3000

### Build & start
```
npm run build
npm start
```
