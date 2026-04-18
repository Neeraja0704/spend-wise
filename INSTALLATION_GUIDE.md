# 🚀 Installation Guide: Production-Ready Fintech App

This guide will transform your expense tracker into a **production-grade fintech application** with real Google OAuth authentication.

---

## ⏱️ Time Required: ~15-20 minutes

---

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn
- Git account
- Google account

---

## 🔑 Step 1: Get Google OAuth Credentials (5 min)

### 1.1 Create Google Cloud Project

1. Open [Google Cloud Console](https://console.cloud.google.com)
2. Click **"Create Project"**
3. Name: `ExpenseTracker` → Click **"Create"**
4. Wait for project creation

### 1.2 Enable Google+ API

1. Search for **"Google+ API"** in search bar
2. Click **"Google+ API"** → Click **"Enable"**

### 1.3 Create OAuth 2.0 Credentials

1. Go to **"Credentials"** (left menu)
2. Click **"Create Credentials"** → **"OAuth Client ID"**
3. If prompted, click **"Configure OAuth Consent Screen"**:
   - Choose **"External"**
   - Fill required fields:
     - App name: `ExpenseTracker`
     - Support email: your-email@gmail.com
     - Click **"Save & Continue"**
   - Skip scopes, click **"Save & Continue"**
   - Add your email as test user
   - Click **"Save & Continue"**

### 1.4 Create Client ID

1. Go back to **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth Client ID"**
3. Select **"Web application"**
4. Name: `ExpenseTracker Web`
5. Add **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
6. Click **"Create"**
7. Copy **Client ID** and **Client Secret** → Save them!

---

## 🗄️ Step 2: Set Up MongoDB (3 min)

### 2.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Start Free"** → Sign up
3. Create a cluster:
   - Click **"Create"** → Deploy a cluster
   - Choose **"Free"** tier
   - Cloud provider: AWS
   - Region: Choose closest to you
   - Click **"Create"**

### 2.2 Create Database User

1. Click **"Security"** → **"Database Access"**
2. Click **"Add New User"**
3. Set:
   - Username: `expense_user`
   - Password: Generate strong password (save it!)
   - Click **"Add User"**

### 2.3 Get Connection String

1. Go to **"Databases"** → Click your cluster
2. Click **"Connect"** → **"Connect Your Application"**
3. Copy connection string:
   ```
   mongodb+srv://expense_user:password@cluster.mongodb.net/expense-tracker?retryWrites=true&w=majority
   ```
4. Replace `password` with your password

---

## 💻 Step 3: Update Environment Variables (2 min)

### 3.1 Create `.env.local`

Create file `.env.local` in project root:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here

# MongoDB
MONGODB_URI=your_mongodb_uri_here

# API
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3.2 Generate NextAuth Secret

Run in terminal:
```bash
openssl rand -hex 32
```

Copy output and paste as `NEXTAUTH_SECRET`

### 3.3 Fill in All Values

- Google Client ID & Secret (from Step 1)
- MongoDB URI (from Step 2)
- NextAuth Secret (generated above)

---

## 📦 Step 4: Install Dependencies (5 min)

```bash
# Remove node_modules if it exists
rm -r node_modules

# Install dependencies
npm install

# For Windows:
# # Delete node_modules folder manually or use:
# rmdir /s /q node_modules
# npm install
```

---

## ▶️ Step 5: Run Development Server (1 min)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

You should see the **login page** with **"Sign in with Google"** button

---

## ✅ Step 6: Test Google Login

1. Click **"Sign in with Google"**
2. Select your Google account
3. You'll be directed to dashboard
4. ✅ You're authenticated!

---

## 🧪 Step 7: Test Features

### Add Transaction
1. Click **"Transactions"** in sidebar
2. Click **"+ Add"** button
3. Fill in transaction details
4. Click **"Add Transaction"**
5. ✅ See success toast notification
6. ✅ Transaction appears in list instantly (real-time!)

### Set Budget
1. Click **"Budget"** in sidebar
2. Set monthly budget amount
3. Click **"Update Budget"**
4. ✅ Progress bar shows budget usage

### View Analytics
1. Go to Dashboard
2. See charts with your transaction data
3. ✅ Data updates in real-time

---

## 🚀 Step 8: Prepare for Deployment

### 8.1 Create `.env.production`

Create file `.env.production` with your production URLs:

```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXTAUTH_URL=https://yourapp.com
NEXTAUTH_SECRET=your_secret
MONGODB_URI=your_mongodb_uri
NEXT_PUBLIC_API_URL=https://yourapp.com
```

### 8.2 Update Google OAuth

1. Go back to Google Cloud Console
2. Add production redirect URI:
   ```
   https://yourapp.com/api/auth/callback/google
   ```

---

## 📤 Step 9: Deploy to Vercel

### 9.1 Push to GitHub

```bash
git init
git add .
git commit -m "Production-ready fintech app with real Google OAuth"
git push
```

### 9.2 Deploy on Vercel

1. Go to [Vercel](https://vercel.com)
2. Login with GitHub
3. Click **"New Project"**
4. Select your repository
5. In environment variables, add all from `.env.production`
6. Click **"Deploy"**
7. ✅ Your app is live!

---

## 🔍 Troubleshooting

### Issue: "Google login not working"
- Check Client ID & Secret in `.env.local`
- Verify redirect URI matches exactly
- Clear browser cookies

### Issue: "Database connection failed"
- Check MongoDB URI is correct
- Verify IP whitelist (set to 0.0.0.0/0 in Atlas)
- Check username/password

### Issue: "npm install fails"
- Delete `package-lock.json`
- Run `npm cache clean --force`
- Try `npm install` again

---

## ✨ What You've Built

✅ **Real Google OAuth** - Users login with actual Google accounts  
✅ **Secure Backend** - All data encrypted and protected  
✅ **Real-Time Updates** - See changes instantly (no refresh!)  
✅ **Smart Alerts** - Budget warnings when nearing limit  
✅ **Professional UI** - Stripe/Razorpay level design  
✅ **Production-Ready** - Deployed and scaling  

---

## 📊 Architecture

```
Frontend (Next.js React)
    ↓
Next-Auth (Real OAuth)
    ↓
API Routes (Secure)
    ↓
MongoDB (Data Storage)
```

---

## 🆘 Need Help?

- **Google OAuth Issues**: [NextAuth.js Docs](https://next-auth.js.org/providers/google)
- **MongoDB Issues**: [MongoDB Docs](https://docs.mongodb.com)
- **Next.js Issues**: [Next.js Docs](https://nextjs.org/docs)

---

**Congratulations! You've built a production-grade fintech app! 🎉**
