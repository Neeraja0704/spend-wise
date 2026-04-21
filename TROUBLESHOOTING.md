# Quick Reference - Troubleshooting & FAQ

## Common Issues & Solutions

### 🔴 "Cannot find module" Error

**Problem:** Error like `Cannot find module '@/lib/mongodb'`

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

### 🔴 "ENOTFOUND _mongodb._tcp.cluster.mongodb.net"

**Problem:** MongoDB connection fails

**Solution:**
1. Check `.env.local` has valid `MONGODB_URI`
2. Ensure MongoDB Atlas cluster is running
3. Verify IP address is whitelisted in MongoDB Atlas
4. Test connection:
```bash
# Try from terminal
mongosh "mongodb+srv://username:password@cluster.mongodb.net/test"
```

---

### 🔴 Google OAuth: "invalid_client"

**Problem:** OAuth login fails with error

**Solution:**
1. Verify credentials in Google Cloud Console
2. Check authorized redirect URIs:
   - Should be: `http://localhost:3000/api/auth/callback/google`
3. Clear browser cookies: Ctrl+Shift+Delete → Cookies
4. Test on different browser

---

### 🔴 "Port 3000 already in use"

**Problem:** Cannot start dev server

**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux
lsof -i :3000
kill -9 [PID]
```

---

### 🔴 "NextAuth configuration issue"

**Problem:** Error accessing NextAuth routes

**Solution:**
1. Ensure `NEXTAUTH_SECRET` is set
2. Ensure `NEXTAUTH_URL` matches deployment URL
3. Check route structure: `app/api/auth/[...nextauth]/route.js`
4. Verify named exports: `export { handler as GET, handler as POST }`

---

### 🟡 Transactions Not Saving

**Problem:** Add transaction toast shows success but data doesn't persist

**Solution:**
1. Check Network tab in DevTools
   - POST to `/api/transactions` should return 201
   - Check response has `_id` field
2. Verify user is authenticated (check session in DevTools)
3. Check MongoDB has data:
   ```bash
   mongosh
   use expense-tracker
   db.transactions.find()
   ```

---

### 🟡 Budget Alerts Not Triggering

**Problem:** Reaching 80%/100% budget doesn't show toast

**Solution:**
1. Verify budget is set to a value (check Dashboard)
2. Add transactions that should trigger alert
3. Check if `getTotalExpenses()` calculates correctly
4. Verify month/year filtering is correct
5. Check browser console for errors

---

### 🟡 Charts Not Displaying

**Problem:** Pie chart or line chart shows no data

**Solution:**
1. Ensure transactions exist for current month
2. Check date filtering logic
3. Try adding a transaction with today's date
4. Check DevTools Console for React errors
5. Verify recharts is installed: `npm ls recharts`

---

### 🟡 Slow Performance

**Problem:** App feels sluggish

**Solution:**
1. Check DevTools Performance tab
2. Clear browser cache (Ctrl+Shift+Delete)
3. Build production version: `npm run build && npm start`
4. Check if MongoDB query is slow
5. Add database indexes:
```javascript
// MongoDB Atlas - go to Indexes tab
// Ensure compound index exists: userId, month, year
```

---

## FAQ

### Q: How do I reset all data?
**A:** Delete all transactions and budget from MongoDB:
```bash
mongosh
use expense-tracker
db.transactions.deleteMany({})
db.budgets.deleteMany({})
```

### Q: How do I test without MongoDB?
**A:** You can't - MongoDB is required. Use free tier at MongoDB Atlas.

### Q: Can I use a different authentication method?
**A:** Yes, NextAuth supports GitHub, Discord, etc. Modify `app/api/auth/[...nextauth]/route.js`

### Q: How do I backup my data?
**A:** MongoDB Atlas → Backup & Restore → Create snapshot

### Q: Can I change the currency?
**A:** Not yet. Currently hardcoded to INR. To change:
1. Update `formatCurrency()` in components
2. Update Budget model default currency
3. Add user preference in settings

### Q: How do I deploy to production?
**A:** See `PRODUCTION_READINESS.md` for full guide. Quick version:
```bash
# 1. Update env variables for production
# 2. Commit to git
# 3. Push to GitHub
# 4. Connect to Vercel
# 5. Deploy!
```

### Q: Why is localhost:3000 instead of localhost:3003?
**A:** Next.js defaults to port 3000. To change:
```bash
npm run dev -- -p 3003
```

### Q: Can I use the app offline?
**A:** Limited support. The app stores recent data in browser's localStorage as fallback.

### Q: How do I enable dark mode?
**A:** Not implemented yet. To add:
1. Install `next-themes`
2. Create dark mode components
3. Update tailwind.config.js

---

## Command Reference

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# View build size
npm run analyze

# Install new package
npm install package-name

# Remove .next cache
rm -rf .next

# Clear node_modules
rm -rf node_modules
npm install

# Check Node version
node --version

# Check npm version
npm --version
```

---

## Performance Tips

1. **Cache API responses** - Add middleware to cache budget/transactions
2. **Lazy load charts** - Load chart library only when needed
3. **Implement virtual scrolling** - For lists with 100+ transactions
4. **Add pagination** - Show 20 transactions per page
5. **Use Redis caching** - Cache frequently accessed data

---

## Security Tips

1. **Never commit `.env.local`** - Use `.env.example` for reference
2. **Use HTTPS in production** - Vercel does this automatically
3. **Rotate secrets** - Change `NEXTAUTH_SECRET` periodically
4. **Validate all inputs** - Already implemented in API routes
5. **Use strong passwords** - MongoDB user password should be 20+ chars

---

## Useful Links

- **Next.js Docs:** https://nextjs.org/docs
- **NextAuth Docs:** https://next-auth.js.org
- **MongoDB Docs:** https://docs.mongodb.com
- **Google OAuth:** https://developers.google.com/identity
- **Tailwind CSS:** https://tailwindcss.com
- **Vercel Deploy:** https://vercel.com/docs

---

## Getting Help

1. **Check logs:**
   - Browser Console: F12 → Console tab
   - Server logs: Terminal where `npm run dev` is running

2. **Search GitHub Issues:**
   - Next.js: https://github.com/vercel/next.js/issues
   - NextAuth: https://github.com/nextauthjs/next-auth/issues

3. **Ask on Forums:**
   - Stack Overflow: Tag with `next.js`, `next-auth`, `mongodb`
   - Next.js Discord: https://discord.gg/bUG7V3r
