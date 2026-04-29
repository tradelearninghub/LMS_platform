# Trade Learning Hub - LMS Platform

A premium Learning Management System (LMS) for trading education, built with React, Vite, Tailwind CSS, and Supabase.

## Features
- **Landing Page**: Premium design with hero section, latest courses, and "Why Choose Us" sections.
- **Course Catalog**: Dynamic course listing with detail pages and curriculum previews.
- **Student Dashboard**: Track and access purchased courses.
- **Admin Dashboard**: Full course management, payment verification, and student access control.
- **Manual Payment System**: QR code-based payments with manual admin verification.
- **Email Notifications**: Automated approval emails upon payment verification.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, Nodemailer
- **Database/Auth**: Supabase

## Setup Instructions

### Prerequisites
- Node.js installed
- Supabase account

### 1. Backend Setup
1. Navigate to the `Backend` folder.
2. Create a `.env` file based on `.env.example`.
3. Run `npm install`.
4. Start with `npm start` (or `npm run dev`).

### 2. Frontend Setup
1. Navigate to the `Frontend` folder.
2. Create a `.env` file based on `.env.example`.
3. Run `npm install`.
4. Start with `npm run dev`.

### 3. Database Setup
Run the SQL scripts provided in the `supabase-setup.sql` (or see documentation) to create the following tables:
- `courses`
- `purchases`
- `payment_verifications`
- `platform_settings`

Enable RLS and set policies as described in the security guide.

## License
MIT
