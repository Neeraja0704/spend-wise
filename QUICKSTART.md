# 🎯 Quick Start - ExpenseTracker

## ⚡ 5-Minute Setup

### 1️⃣ Install Dependencies
```bash
cd expense-tracker
npm install
```

### 2️⃣ Start the App
```bash
npm start
```
App opens at `http://localhost:3000` 🚀

### 3️⃣ Login or Create Account
- **Create New:** Click "Create one now"
- **Demo:** Email: `demo@test.com` | Password: `demo123`

### 4️⃣ Start Tracking! 
✨ You're all set! Start adding transactions.

---

## 🎮 Usage Overview

### Adding a Transaction
1. Fill in Amount
2. Choose Type (Income/Expense)
3. Select Category
4. Pick Date
5. Add Note (optional)
6. Click "Add Transaction"

### Setting Budget
1. Click "⚙️ Set Budget" in budget section
2. Enter amount
3. Click "Save Budget"

### Exporting Data
- Click "📥" button in header
- CSV downloads automatically

### More Features
- 📊 View Income vs Expense chart
- 💾 Clear all data anytime
- 🚪 Logout button in header

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/App.js` | Main app logic |
| `src/pages/Dashboard.js` | Main dashboard |
| `src/components/*` | UI components |
| `src/App.css` | All styling |
| `styles/theme.css` | Color variables |

---

## ⚙️ Available Scripts

```bash
npm start       # Start dev server
npm run build   # Build for production
npm test        # Run tests
npm eject       # Eject configuration (⚠️ Cannot undo)
```

---

## 🔧 Troubleshooting

**Port 3000 in use?**
```bash
# Kill process (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Dependencies issue?**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Blank screen?**
- Hard refresh: `Ctrl+Shift+R`
- Check browser console: `F12`
- Try different browser

---

## 📱 Test Responsiveness

1. Press `F12` (DevTools)
2. Click device icon (📱)
3. Select device or custom size
4. Test behavior

---

## 💡 Tips

- 💾 Data saved automatically in browser
- 📥 Export CSV for backup
- 🔄 Refresh page - data persists
- 🗑️ Clear browser storage to reset
- 🎨 Colors defined in `styles/theme.css`

---

## 🚀 Next Steps

1. **Customize:** Edit colors, categories, or features
2. **Extend:** Add new components or features
3. **Deploy:** Use Netlify, Vercel, or GitHub Pages
4. **Integrate:** Connect to backend API

---

## 📚 Full Documentation

See `README.md` for complete documentation and features.

See `SETUP_GUIDE.md` for detailed setup instructions.

---

**🎉 Ready to track your expenses? Start now!**

Questions? Check the README or SETUP_GUIDE files! 📖
