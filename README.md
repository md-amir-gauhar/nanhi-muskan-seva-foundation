# Nanhi Muskan Seva Foundation

A modern, full-stack web application for a non-profit organization, built with Next.js, TypeScript, Prisma, and Razorpay payment integration.

## 🌟 Features

- **Donation System**: Secure online donations with Razorpay payment gateway
- **Campaign Management**: Create and track fundraising campaigns
- **Admin Dashboard**: Manage campaigns, donations, and view analytics
- **Email Receipts**: Automated donation receipts via Resend
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Authentication**: Secure admin authentication with JWT
- **Database**: PostgreSQL with Prisma ORM

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Razorpay account
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd nanhi-muskan-foundation
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
DATABASE_URL="postgresql://..."
RAZORPAY_KEY_ID="rzp_test_xxxxx"
RAZORPAY_KEY_SECRET="your_secret"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_xxxxx"
RESEND_API_KEY="re_xxxxx"
RESEND_FROM_EMAIL="donations@yourdomain.org"
JWT_SECRET="your_jwt_secret"
```

4. **Set up database**

```bash
npx prisma generate
npx prisma migrate dev
```

5. **Run development server**

6. **Run development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💳 Razorpay Integration

### Quick Setup (5 minutes)

1. **Get Razorpay keys**: [https://dashboard.razorpay.com](https://dashboard.razorpay.com)
2. **Add to `.env`**: Copy test keys to environment file
3. **Test donation**: Visit `/donate` and use test card `4111 1111 1111 1111`

📖 **Full guide**: See [QUICK_START.md](./QUICK_START.md) for detailed setup  
📚 **Documentation**: See [RAZORPAY_SETUP.md](./RAZORPAY_SETUP.md) for complete documentation

### Test Cards

| Card Number         | Result     |
| ------------------- | ---------- |
| 4111 1111 1111 1111 | ✅ Success |
| 4000 0000 0000 0002 | ❌ Failed  |

## 📁 Project Structure

```
app/
├── donate/           # Donation page
├── admin/            # Admin dashboard
├── api/              # API routes
│   ├── donation/     # Payment processing
│   └── admin/        # Admin endpoints
components/           # React components
prisma/              # Database schema
lib/                 # Utilities
```

## 🔑 Key Features

### Donation System

- Multiple payment methods via Razorpay
- Campaign-specific donations
- Anonymous donation option
- PAN number for 80G tax benefits
- Automated email receipts
- Real-time payment verification

### Admin Dashboard

- Campaign management
- Donation tracking
- Analytics and statistics
- Secure authentication

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Razorpay
- **Email**: Resend
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Validation**: Zod
- **UI Components**: Custom + Shadcn/ui

## 📚 Documentation

- [Quick Start Guide](./QUICK_START.md) - Get started in 5 minutes
- [Razorpay Setup](./RAZORPAY_SETUP.md) - Complete payment integration guide

## 🚦 Available Scripts

## 🚦 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
npx prisma studio # Open Prisma Studio (database GUI)
npx prisma migrate dev # Run database migrations
```

## 🔐 Security

- Never commit `.env` file
- Keep `RAZORPAY_KEY_SECRET` confidential
- Use test keys in development
- Enable HTTPS in production
- Implement rate limiting for production

## 🐛 Troubleshooting

### Razorpay Issues

- Checkout not opening? Check `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- Verification failed? Check `RAZORPAY_KEY_SECRET`
- See [RAZORPAY_SETUP.md](./RAZORPAY_SETUP.md#troubleshooting)

### Database Issues

```bash
npx prisma generate  # Regenerate Prisma Client
npx prisma migrate reset # Reset database (dev only)
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

- Switch to Razorpay **live** keys
- Use production database URL
- Set `NODE_ENV=production`

## 📝 License

This project is for Nanhi Muskan Seva Foundation.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues related to:

- **Payment integration**: Check [RAZORPAY_SETUP.md](./RAZORPAY_SETUP.md)
- **Quick setup**: Check [QUICK_START.md](./QUICK_START.md)
- **Razorpay**: Contact Razorpay support

---

Built with ❤️ for Nanhi Muskan Seva Foundation
