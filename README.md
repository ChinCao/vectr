# VECTR - STEM-Robotics Club Website

## Overview

VECTR is a web application for the STEM-Robotics Club at Vinschool Central Park. The platform serves as a recruitment portal and information hub for the club, featuring department descriptions, team information, and an automated application system.

## 🚀 Features

### Core Functionality

- Interactive recruitment portal
- Department-specific job descriptions
- Automated application processing
- Dynamic theme switching (light/dark mode)
- Sound effects for interactions
- Responsive design for all devices

### Technical Features

- Google Docs/Sheets integration for application management
- Email notification system
- MongoDB database integration
- Authentication system via Clerk
- Protected routes and public access management
- Form validation and processing
- Carousel and interactive UI components

## 🛠 Tech Stack

### Frontend

- Next.js 15.0.4
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Radix UI primitives

### Backend

- Node.js
- MongoDB
- Google APIs (Sheets, Docs, Drive)
- Nodemailer

### Authentication

- Clerk Authentication

### Development Tools

- ESLint
- Turbopack
- PostCSS

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/ChinCao/vectr.git
cd vectr
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file with the following variables:

```env
MONGODB_URI=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACOUNT_PRIVATE_KEY=
GOOGLE_SHEET_ID_JD=
GOOGLE_SHEET_ID_QS=
GOOGLE_DRIVE_ID_CS=
GOOGLE_DRIVE_ID_ROBOTICS=
GOOGLE_DRIVE_ID_HC=
GOOGLE_DRIVE_ID_DESGIN=
GOOGLE_DRIVE_ID_PR_CW=
GOOGLE_DRIVE_ID_PR_EXT=
GMAIL_USER=
GMAIL_PASS=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

4. Run the development server:

```bash
npm run dev
```

## 🏗 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── recruit/           # Recruitment related pages
│   └── workshop/          # Workshop related pages
├── components/            # Reusable components
├── lib/                   # Utility functions
├── constants/             # Global constants
└── db/                    # Database configuration
```

## 🔒 Authentication

The application uses Clerk for authentication with middleware configuration for public and protected routes. Public routes include:

- Homepage
- Sign-in/Sign-up pages
- Recruitment portal
- Workshop pages
- Sound resources

## 🎨 Styling

The project uses Tailwind CSS with:

- Custom theme configuration
- Dark mode support
- Responsive design utilities
- Custom component styles
- Global CSS variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 👥 Team

- Computer Science Department
- Robotics Department
- Design Department
- Human Resources Department
- PR Content Writing Department
- PR External Relations Department

## 🔗 Links

- Production: [https://vectr-vcp.com/](https://vectr-vcp.com/)

## 📧 Contact

For any inquiries, please reach out to [vectr.vcp@gmail.com](mailto:vectr.vcp@gmail.com)

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a custom font family.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Clerk Documentation](https://docs.clerk.dev/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
