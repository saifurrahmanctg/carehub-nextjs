# CareHub - Professional Healthcare Service Booking Platform

![CareHub Banner](./public/github-readme.jpg)

CareHub is a comprehensive, full-stack web application designed to bridge the gap between professional healthcare providers and patients. It offers a seamless experience for booking care services (Baby Care, Elderly Care, Sick People Care), managing appointments, and processing secure payments. Built with the latest web technologies, CareHub ensures a robust, secure, and user-friendly environment.

## 🚀 Live Demo

[View Live Demo](https://carehub-wine.vercel.app/)

---

## ✨ Key Features

### 👤 For Users
*   **Easy Booking System**: Browse usage-based healthcare services and book appointments instantly.
*   **Flexible Durations**: Choose service duration by days or hours with dynamic cost calculation.
*   **Secure Payments**: Integrated **Stripe** payment gateway for safe and hassle-free transactions.
*   **User Dashboard**: Personalized dashboard to track booking status (Pending, Confirmed, Cancelled).
*   **Account Management**: Manage personal information and view service history.
*   **Authentication**: Secure login/signup via **Email/Password** or **Google OAuth**.
*   **Email Notifications**: Automatic email invoices sent upon successful booking.

### 🛡️ For Administrators
*   **Admin Dashboard**: Comprehensive overview of platform statistics (Total Revenue, Users, Bookings).
*   **Service Management**: Create, update, and delete service offerings dynamically.
*   **User Management**: Monitor user base, manage roles, and handle account actions.
*   **Booking Oversight**: Approve, reject, or cancel customer bookings in real-time.

---

## 🛠️ Technology Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: JavaScript / Node.js
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [DaisyUI 5](https://daisyui.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
*   **Payments**: [Stripe](https://stripe.com/)
*   **Email**: [Nodemailer](https://nodemailer.com/) (Gmail integration)
*   **Notifications**: [React Hot Toast](https://react-hot-toast.com/) & [SweetAlert2](https://sweetalert2.github.io/)
*   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
*   **Deployment**: [Vercel](https://vercel.com/) / Netlify

---

## 📋 Prerequisites

Before running the application, ensure you have:

1.  **Node.js** (v18 or higher)
2.  **MongoDB** database (Local or Atlas)
3.  **Google Cloud Console Project** (for OAuth)
4.  **Stripe Account** (for payments)
5.  **Gmail Account** (optional, for email notifications)

---

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the root directory.

```env
# ------------------------------
# Database Configuration
# ------------------------------
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=carehubdb

# ------------------------------
# Authentication (NextAuth)
# ------------------------------
# Generate a secret: `openssl rand -base64 32`
NEXTAUTH_SECRET=your_nextauth_secret_key_at_least_32_chars
NEXTAUTH_URL=http://localhost:3000

# ------------------------------
# Google OAuth (Optional)
# ------------------------------
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ------------------------------
# Stripe Payments
# ------------------------------
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# ------------------------------
# Email Service (Nodemailer - Optional)
# ------------------------------
EMAIL_USER=your_email@gmail.com
# Use an App Password, NOT your regular password
EMAIL_PASSWORD=your_gmail_app_password

# ------------------------------
# Application Base URL
# ------------------------------
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/saifurrahmanctg/carehub-nextjs.git
cd carehub-nextjs
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory and configure the variables as shown in the section above.

### 4. Run the development server
```bash
npm run dev
```
> **Note**: The `dev` script uses `next dev --webpack` to ensure compatibility with Windows file systems.

### 5. Open the application
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages and API routes
│   ├── (main)/          # Public routes (Home, Login, Services, etc.)
│   ├── api/             # Backend API endpoints (Auth, Bookings, Services, Payments)
│   └── dashboard/       # Protected user & admin dashboard routes
├── components/          # Reusable UI components
│   ├── Booking/         # Booking forms and logic
│   ├── Home/            # Landing page sections
│   ├── Payment/         # Stripe checkout components
│   └── layouts/         # Navbar, Footer, Sidebar
├── lib/                 # Utility functions (DB connect, Email, Auth)
└── middleware.js        # Route protection middleware
```

---

## 🔌 API Routes

The application exposes several API endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET/POST` | `/api/auth/[...nextauth]` | NextAuth authentication handling |
| `POST` | `/api/register` | Register a new user |
| `GET` | `/api/services` | Fetch all available services |
| `GET` | `/api/services/single?id=:id` | Fetch details for a specific service |
| `POST` | `/api/bookings` | Create a new booking |
| `GET` | `/api/bookings` | Fetch user bookings |
| `PUT/DELETE` | `/api/bookings/[id]` | Update status or cancel/delete a booking |
| `POST` | `/api/create-payment-intent` | Initialize Stripe payment |

---

## 🔐 Role-Based Access

The application implements secure role-based access control:
*   **Public**: Access to Home, About, Services, Contact.
*   **User**: Can book services, view own dashboard, and make payments.
*   **Admin**: Full access to manage users, services, and all bookings.

---

## 🚨 Troubleshooting

| Issue | Solution |
| :--- | :--- |
| **MongoDB Connection Error** | Verify `MONGODB_URI` and `DB_NAME`. Check if your IP is whitelisted in Atlas. |
| **Email Not Sending** | Ensure `EMAIL_USER` is correct and `EMAIL_PASSWORD` is a generated **App Password**, not your login password. |
| **Authentication Failed** | Check `NEXTAUTH_SECRET` and ensure `NEXTAUTH_URL` matches your current domain. |
| **Stripe Errors** | Verify your Stripe Secret and Publishable keys in `.env`. |

---

## 🤝 Contributing

Contributions are welcome!
1.  Fork the repository.
2.  Create a new branch: `git checkout -b feature-name`.
3.  Make your changes and commit: `git commit -m 'Add some feature'`.
4.  Push to the branch: `git push origin feature-name`.
5.  Submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.
