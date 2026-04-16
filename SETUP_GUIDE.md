# 🚀 ExpenseTracker Setup Guide

## Complete Setup Instructions

### Step 1: Prerequisites Check

Make sure you have:
- ✅ Node.js installed (v14+)
- ✅ npm or yarn installed
- ✅ A modern web browser
- ✅ Text editor/IDE (VS Code recommended)

**Check installed versions:**
```bash
node --version    # Should be v14+
npm --version     # Should be v6+
```

---

### Step 2: Project Setup

#### Option A: Using npm

```bash
# Navigate to project directory
cd expense-tracker

# Install dependencies
npm install

# Wait for installation to complete (this may take 2-3 minutes)

# Start development server
npm start

# Application opens at http://localhost:3000
```

#### Option B: Using yarn

```bash
# Navigate to project directory
cd expense-tracker

# Install dependencies
yarn install

# Wait for installation to complete

# Start development server
yarn start

# Application opens at http://localhost:3000
```

---

### Step 3: First-Time Login

#### Create New Account
1. Click on **"Create one now"** link on login page
2. Fill in:
   - Full Name
   - Email
   - Password (min 6 characters)
   - Confirm Password
3. Click **"Create Account"**
4. You'll be redirected to dashboard

#### Or Use Demo Account
- **Email:** `demo@test.com`
- **Password:** `demo123`

---

### Step 4: Verify Installation

✅ **Successful Setup Checklist:**
- [ ] App loads at `http://localhost:3000`
- [ ] Can see login page with logo
- [ ] Can create account or login
- [ ] Dashboard displays after login
- [ ] Can add transactions
- [ ] Transactions appear in list
- [ ] CSV export works
- [ ] Logout button works

---

### Step 5: Troubleshooting

#### Issue: Port 3000 Already in Use
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

#### Issue: Dependencies Installation Failed
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Issue: Blank Screen or Error
1. Open browser DevTools (F12 or Cmd+Option+I)
2. Check Console for errors
3. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. Clear browser cache

#### Issue: localStorage Not Working
- Ensure cookies/storage enabled in browser
- Disable privacy mode if enabled
- Try different browser

---

### Step 6: Building for Production

```bash
# Create optimized production build
npm run build

# Build folder will contain:
# - Minified JavaScript
# - Optimized CSS
# - index.html
# Ready to deploy!
```

---

### Step 7: Deployment Options

#### Netlify (Recommended - Free)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=build
```

#### Vercel (Free)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### GitHub Pages
```bash
# Add to package.json:
"homepage": "https://yourusername.github.io/expense-tracker"

# Build and deploy
npm run build
npm install gh-pages --save-dev
# Add deploy scripts and run
```

---

## 📝 File Structure After Setup

```
expense-tracker/
├── node_modules/          # Dependencies (auto-created)
├── public/
│   └── index.html        # HTML template
├── src/
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── styles/          # CSS files
│   ├── App.js           # Main component
│   ├── App.css          # Main styles
│   └── index.js         # Entry point
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies & scripts
├── package-lock.json    # Locked versions
└── README.md           # Documentation
```

---

## 🔑 Key Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (⚠️ Irreversible!)
npm eject
```

---

## 📱 Testing on Mobile

### Local Network Access
```bash
# Find your machine IP
ipconfig getifaddr en0  # Mac
ipconfig              # Windows

# Access from mobile on same network
http://<YOUR_IP>:3000
```

### Chrome DevTools
- Press F12
- Click device icon (top-left)
- Select device or custom dimensions
- Test responsiveness

---

## 💾 Data Management

### Accessing localStorage
Open browser DevTools → Application → Local Storage → Select origin

### Clear All Data
```javascript
// In browser console:
localStorage.clear()
```

### Backup Data
1. Click 📥 CSV export button in app
2. This downloads all transactions
3. Can be re-imported manually

---

## 🎯 Next Steps

1. **Explore the App**
   - Try adding income/expense
   - Test budget features
   - Export data as CSV

2. **Customize**
   - Change colors in `styles/theme.css`
   - Modify categories in `TransactionForm.js`
   - Update copy/text in components

3. **Extend Features**
   - Add recurring transactions
   - Implement categories analytics
   - Add dark mode
   - Create backend API

4. **Deploy**
   - Choose hosting platform
   - Build production version
   - Deploy to hosting

---

## 📞 Support & Resources

### Documentation
- [React Docs](https://react.dev)
- [localStorage Guide](https://javascript.info/localstorage)
- [CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)

### Common Issues
- See Troubleshooting section above
- Check browser console for errors
- Verify all dependencies installed

### Getting Help
- Review README.md
- Check component comments
- Google the error message
- Check React/JavaScript docs

---

## ✅ Verification Checklist

Before considering setup complete:

- [ ] Dependencies installed without errors
- [ ] Dev server starts successfully
- [ ] App renders in browser
- [ ] Can create account
- [ ] Can login with credentials
- [ ] Demo account works
- [ ] Dashboard loads
- [ ] Can add transactions
- [ ] Transactions display correctly
- [ ] Can set budget
- [ ] CSV export works
- [ ] Can logout
- [ ] App is responsive on mobile
- [ ] No console errors
- [ ] localStorage data persists after refresh

---

**🎉 Congratulations! Your ExpenseTracker is ready to use!**

Start tracking your expenses, manage your budget, and take control of your finances! 💰
