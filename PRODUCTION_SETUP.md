# 🚀 ExpenseTracker Pro - Production Setup Guide

## Prerequisites

Before deploying your expense tracker, you need to set up the following services:

### 1. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://your-domain.vercel.app/api/auth/callback/google`
7. Copy the Client ID and Client Secret

### 2. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Get your connection string (replace `<password>` with your actual password)
5. Whitelist your IP addresses (0.0.0.0/0 for development)

### 3. Environment Variables Setup

#### For Local Development (.env.local)

```bash
# NextAuth Configuration
NEXTAUTH_SECRET=your_super_secret_key_here_generate_with_openssl_rand_hex_32
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Replace with your actual values)
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here

# Database (Replace with your actual MongoDB Atlas connection string)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker?retryWrites=true&w=majority
```

#### For Vercel Production

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the same variables as above, but change:
   ```
   NEXTAUTH_URL=https://your-project-name.vercel.app
   ```

## 🚀 Deployment Steps

### 1. Test Locally First

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` and test:
- Google OAuth login
- Adding transactions
- Setting budgets
- Viewing charts

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

### 3. Verify Production Setup

After deployment, verify:
- ✅ Google OAuth works
- ✅ Database connections work
- ✅ API routes respond correctly
- ✅ Real-time updates work
- ✅ Budget alerts trigger

## 🔧 Troubleshooting

### Common Issues

1. **"Invalid/Missing environment variable"**
   - Check that all environment variables are set correctly
   - Ensure no extra spaces or quotes in .env.local

2. **"Failed to fetch" errors**
   - Verify MongoDB connection string
   - Check network connectivity
   - Ensure database user has correct permissions

3. **Google OAuth not working**
   - Verify redirect URIs in Google Cloud Console
   - Check client ID and secret are correct
   - Ensure NEXTAUTH_URL matches your domain

4. **Build failures**
   - Check package.json for syntax errors
   - Ensure all dependencies are installed
   - Verify Next.js configuration

### Debug Commands

```bash
# Check environment variables
echo $MONGODB_URI
echo $GOOGLE_CLIENT_ID

# Test database connection
node -e "require('./lib/mongodb').then(() => console.log('Connected'))"

# Check build
npm run build
```

## 📊 Features Overview

Your expense tracker now includes:

- ✅ **Real Google OAuth** authentication
- ✅ **Secure MongoDB** database with user isolation
- ✅ **Real-time updates** with Zustand state management
- ✅ **Smart budget alerts** (80% and 100% thresholds)
- ✅ **Interactive charts** with Chart.js
- ✅ **Responsive design** with Tailwind CSS
- ✅ **Premium UI/UX** with Framer Motion animations
- ✅ **Input validation** and error handling
- ✅ **Production-ready** API routes

## 🎯 Next Steps

1. Set up your Google OAuth and MongoDB credentials
2. Test locally with real data
3. Deploy to Vercel
4. Monitor production logs
5. Consider adding features like:
   - CSV export functionality
   - Recurring transactions
   - Advanced analytics
   - Multi-currency support

---

**Need help?** Check the logs in Vercel dashboard or run `vercel logs` in your terminal.