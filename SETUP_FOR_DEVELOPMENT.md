# ExpenseTracker Pro - Setup for Development

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

### 3. Setup MongoDB (REQUIRED)

You need a real MongoDB database. Choose one:

#### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (M0 free tier)
4. Click "Connect" → "Drivers" 
5. Copy the connection string
6. Replace `MONGODB_URI` in `.env.local` with your connection string
7. Update `username` and `password` in the URL

#### Option B: Local MongoDB
1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/
2. Start MongoDB:
   ```bash
   mongod
   ```
3. Set `MONGODB_URI=mongodb://localhost:27017/expense-tracker` in `.env.local`

### 4. Setup Google OAuth (REQUIRED for Login)

1. Go to https://console.cloud.google.com
2. Create a new project (name: "ExpenseTracker")
3. Enable the Google+ API:
   - Search for "Google+ API"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web Application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `http://localhost:3000`
   - Copy Client ID and Client Secret
5. Add to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   ```

### 5. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Features Included

✅ **Google Authentication** - Sign in with your Google account  
✅ **Transaction Management** - Add, edit, delete transactions  
✅ **Budget Tracking** - Set monthly budget and track spending  
✅ **Budget Alerts** - Warnings at 80% and 100% of budget  
✅ **Real-time Updates** - Instant UI updates with toast notifications  
✅ **Charts & Analytics** - Visualize your spending patterns  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Offline Support** - Basic offline functionality  

## Troubleshooting

### "MongoDB connection error"
- Ensure MongoDB is running (local or Atlas)
- Check `MONGODB_URI` is correct in `.env.local`
- Test connection: `mongodb+srv://username:password@cluster.mongodb.net/test`

### "Google login not working"
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Check redirect URIs are exactly: `http://localhost:3000/api/auth/callback/google`
- Clear browser cookies and try again

### "Port 3000 already in use"
- Kill the existing process:
  ```bash
  # On Windows
  netstat -ano | findstr :3000
  taskkill /PID [PID] /F
  
  # On Mac/Linux
  lsof -i :3000
  kill -9 [PID]
  ```

### Build errors
- Delete `.next` folder and restart:
  ```bash
  rm -r .next
  npm run dev
  ```

## Next Steps

1. **Test the UI** - Create some transactions and verify they save
2. **Test Alerts** - Add expenses to reach 80% budget threshold
3. **Test Charts** - View spending breakdown
4. **Mobile Test** - Open on your phone to test responsive design
5. **Deploy** - When ready, follow `PRODUCTION_SETUP.md`

## Need Help?

Check the documentation:
- `ARCHITECTURE.md` - System design
- `DEPLOYMENT_GUIDE.md` - Production deployment
- `PRODUCTION_SETUP.md` - Production configuration
