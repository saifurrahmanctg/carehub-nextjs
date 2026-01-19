# CareHub - Professional Healthcare Service Booking Platform

![CareHub Banner](./public/care-giving.png)

CareHub is a comprehensive web application designed to bridge the gap between healthcare providers and patients. It offers a seamless experience for booking professional care services, managing appointments, and processing secure payments. Built with the latest web technologies, CareHub ensures a robust, secure, and user-friendly environment for all users.

## 🚀 Live Demo

[View Live Demo](#) *(Replace with your Vercel deployment URL)*

## ✨ Key Features

### For Users
*   **Easy Booking System**: Browse usage-based healthcare services and book appointments instantly.
*   **Secure Payments**: Integrated Stripe payment gateway for safe and hassle-free transactions.
*   **User Dashboard**: personalized dashboard to track booking status (Pending, Confirmed, Cancelled).
*   **Dynamic Profile**: Manage personal information and view service history.
*   **Authentication**: Secure login/signup via Email/Password or Google OAuth.

### For Administrators
*   **Admin Dashboard**: comprehensive overview of platform statistics (Total Revenue, Users, Bookings).
*   **Service Management**: Create, update, and delete service offerings dynamically.
*   **User Management**: Monitor user base, manage roles, and handle account actions.
*   **Booking Oversight**: Approve, reject, or manage customer bookings in real-time.

## 🛠️ Technology Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
*   **Payments**: [Stripe](https://stripe.com/)
*   **Notifications**: [React Hot Toast](https://react-hot-toast.com/) & [SweetAlert2](https://sweetalert2.github.io/)
*   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
*   **Deployment**: [Vercel](https://vercel.com/)

## ⚙️ Environment Variables

To run this project locally, you will need to add the following environment variables to your `.env` file:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe Payments
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Email Service (Optional for notifications)
EMAIL_USER=your_email_address
EMAIL_PASSWORD=your_email_app_password
```

## 🚀 Getting Started

Follow these steps to set up the project locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/saifurrahmanctg/carehub-nextjs.git
    cd carehub-nextjs
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root directory and configure the variables as shown above.

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open the application**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages and API routes
│   ├── (main)/          # Public routes (Home, Login, Services, etc.)
│   ├── api/             # Backend API endpoints
│   └── dashboard/       # Protected user & admin dashboard routes
├── components/          # Reusable UI components
│   ├── Booking/         # Booking forms and logic
│   ├── Home/            # Landing page sections
│   ├── Payment/         # Stripe checkout components
│   └── layouts/         # Navbar, Footer, Sidebar
├── lib/                 # Utility functions (DB connect, Email, Auth)
└── middleware.js        # Route protection middleware
```

## 🔐 Role-Based Access

The application implements secure role-based access control:
*   **Public**: Access to Home, About, Services, Contact.
*   **User**: Can book services, view own dashboard, and make payments.
*   **Admin**: Full access to manage users, services, and all bookings.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
