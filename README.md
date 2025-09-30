# MERN LMS Frontend

A modern Learning Management System frontend built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX** with Tailwind CSS and Radix UI components
- **Course Management** for instructors
- **Student Dashboard** with course progress tracking
- **Video Player** with progress tracking
- **Payment Integration** with PayPal
- **Responsive Design** for all devices
- **Charts and Analytics** with ApexCharts and Chart.js

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **ApexCharts & Chart.js** - Data visualization
- **React Player** - Video player

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/mern-lms-frontend.git
cd mern-lms-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your backend API URL:
```env
VITE_API_URL=http://localhost:5000  # For development
# VITE_API_URL=https://your-backend-url.onrender.com  # For production
```

## 🚀 Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📱 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Set environment variables in Vercel dashboard:
   - `VITE_API_URL`: Your backend API URL

### Alternative: Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.yourdomain.com` |

## 📁 Project Structure

```
src/
├── api/           # API configuration and calls
├── assets/        # Static assets
├── components/    # Reusable UI components
├── config/        # Configuration files
├── context/       # React context providers
├── hooks/         # Custom React hooks
├── lib/           # Utility libraries
├── pages/         # Page components
└── services/      # Business logic services
```

## 🎨 UI Components

This project uses a component system built with:
- **Tailwind CSS** for styling
- **Radix UI** for headless components
- **Lucide React** for icons
- **Framer Motion** for animations

## 📊 Features Overview

### For Students:
- Browse available courses
- Purchase courses with PayPal
- Track learning progress
- Video streaming with progress save
- Course completion certificates

### For Instructors:
- Create and manage courses
- Upload course materials and videos
- Track student enrollment and progress
- Analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Repositories

- **Backend API**: [mern-lms-backend](https://github.com/your-username/mern-lms-backend)

## 📞 Support

For support, email support@yourapp.com or create an issue in this repository.
