# ExpenseTracker Pro - Testing Guide

## Prerequisites

Before testing, ensure:
- Development server is running: `npm run dev`
- MongoDB connection is configured and working
- Google OAuth credentials are set (if testing authentication)
- App is accessible at `http://localhost:3000`

## Test Scenarios

### 1. Authentication Flow

**Test: Sign in with Google**
1. Navigate to `http://localhost:3000`
2. Click "Sign In with Google"
3. Complete Google authentication
4. Verify you're redirected to `/dashboard`
5. Check URL bar shows your user avatar/name

**Expected Results:**
- ✅ Login page displays correctly
- ✅ Google button is clickable
- ✅ Redirect happens after authentication
- ✅ User info is displayed in navbar
- ✅ Session persists on page reload

**Issue:** If Google login doesn't work:
- Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`
- Verify redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`
- Clear browser cookies and try again

---

### 2. Transaction Management

**Test: Add Income Transaction**
1. Click "+ Add Transaction" button
2. Select Type: "Income"
3. Select Category: "Salary"
4. Amount: 50000
5. Date: Today
6. Description: "Monthly salary"
7. Click "Add"

**Expected Results:**
- ✅ Form validates amount is required
- ✅ Toast appears: "✅ Transaction added successfully"
- ✅ Transaction appears in list
- ✅ Form closes automatically
- ✅ Total Income card updates to 50000

**Test: Add Expense Transaction**
1. Click "+ Add Transaction" button
2. Select Type: "Expense"
3. Select Category: "Food & Dining"
4. Amount: 500
5. Date: Today
6. Description: "Lunch at restaurant"
7. Click "Add"

**Expected Results:**
- ✅ Toast appears: "✅ Transaction added successfully"
- ✅ Transaction appears in list with icon 🍔
- ✅ Total Expenses card updates to 500
- ✅ Balance card shows 49500 (50000 - 500)
- ✅ Spending by Category chart updates

---

### 3. Budget Alerts

**Test: 80% Budget Warning**
1. Assume budget is 5000
2. Add expenses totaling 4000 (e.g., four 1000 transactions)
3. When 4th transaction is added (total = 4000, which is 80% of 5000)

**Expected Results:**
- ✅ Toast appears: "⚠️ Budget Warning: You've reached 80% of your budget"
- ✅ Budget progress bar turns yellow/orange
- ✅ Status shows: "Nearing Limit"
- ✅ Alert persists for 5 seconds

**Test: 100% Budget Exceeded**
1. Continue adding expenses
2. Add transactions totaling 5000+ (100%+)

**Expected Results:**
- ✅ Toast appears: "🚨 Budget Exceeded! You have exceeded your monthly budget"
- ✅ Budget progress bar shows 100%+ (capped at 100% visually)
- ✅ Status shows: "Budget Exceeded"
- ✅ Status text turns red
- ✅ Alert persists for 5 seconds

---

### 4. Budget Management

**Test: Update Budget**
1. Go to Dashboard or Budget page
2. In "Monthly Budget" section, click "Edit"
3. Change amount from 5000 to 8000
4. Click "Update"

**Expected Results:**
- ✅ Modal appears with input field
- ✅ Current budget is pre-filled
- ✅ Toast: "✅ Budget updated successfully!"
- ✅ Budget card shows new amount: 8000
- ✅ Progress bar recalculates percentage

---

### 5. Transaction Deletion

**Test: Delete Transaction**
1. Hover over any transaction in the list
2. Click delete icon (trash can)
3. Confirmation dialog appears: "Delete?"
4. Click "Yes"

**Expected Results:**
- ✅ Delete button appears on hover
- ✅ Confirmation dialog appears
- ✅ Transaction is removed from list
- ✅ Toast: "Transaction deleted"
- ✅ Total expenses/income updates immediately
- ✅ Charts refresh automatically

**Test: Cancel Delete**
1. Hover over transaction
2. Click delete icon
3. Click "No"

**Expected Results:**
- ✅ Dialog closes
- ✅ Transaction remains in list
- ✅ No changes to data

---

### 6. Charts & Analytics

**Test: Category Breakdown Chart**
1. Add multiple expense transactions with different categories
2. Go to Dashboard
3. Look for "Spending by Category" pie chart

**Expected Results:**
- ✅ Pie chart displays all categories
- ✅ Colors are distinct for each category
- ✅ Legend shows category names and amounts
- ✅ Chart updates when new transactions are added

**Test: Monthly Trends Chart**
1. Add transactions across multiple months (if testing with different dates)
2. Look at "Monthly Trends" line chart

**Expected Results:**
- ✅ Line chart shows income and expense trends
- ✅ X-axis shows months
- ✅ Y-axis shows amounts
- ✅ Legend distinguishes between income and expense

---

### 7. Transaction List Filtering

**Test: Filter by Transaction Type**
1. Go to Transactions page
2. Click filter buttons: "All", "Income", "Expense"

**Expected Results:**
- ✅ "All" shows all transactions
- ✅ "Income" shows only income transactions
- ✅ "Expense" shows only expense transactions
- ✅ Count updates when filtering

**Test: Search Transactions**
1. Go to Transactions page
2. Type in search box: "food"

**Expected Results:**
- ✅ Only "Food & Dining" transactions appear
- ✅ Search works on category and description
- ✅ Results update in real-time

**Test: Export to CSV**
1. Add several transactions
2. Go to Transactions page
3. Click "Export" button

**Expected Results:**
- ✅ CSV file downloads
- ✅ File is named "transactions.csv"
- ✅ CSV contains all transaction data
- ✅ Spreadsheet opens correctly in Excel/Sheets

---

### 8. Responsive Design

**Test: Mobile View**
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone 12 (375x667)
4. Test all features on mobile

**Expected Results:**
- ✅ Sidebar collapses to hamburger menu
- ✅ Cards stack vertically
- ✅ Charts are readable on small screens
- ✅ Buttons are touch-friendly (at least 44x44px)
- ✅ No horizontal scroll

**Test: Tablet View**
1. Select iPad (768x1024)
2. Verify layout adapts

**Expected Results:**
- ✅ Two-column layout for charts
- ✅ Responsive navigation
- ✅ All features are accessible

---

### 9. Real-time Updates

**Test: Multiple Tabs**
1. Open app in Tab 1
2. Open app in Tab 2
3. Add transaction in Tab 1
4. Switch to Tab 2

**Note:** Currently, Tab 2 won't auto-update (would need WebSocket). Refresh to see updates.

---

### 10. Error Handling

**Test: API Failure Handling**
1. Open DevTools Network tab
2. Go offline (DevTools → Network → Offline)
3. Try to add a transaction

**Expected Results:**
- ✅ Error toast appears: "Failed to add transaction"
- ✅ Error message is descriptive
- ✅ User can try again when online

**Test: Invalid Input**
1. Click "+ Add Transaction"
2. Leave amount empty
3. Click "Add"

**Expected Results:**
- ✅ Error toast: "Please enter a valid amount"
- ✅ Form doesn't submit
- ✅ Data is not saved

---

### 11. Performance

**Test: Load Time**
1. Navigate to Dashboard
2. Open DevTools → Performance tab
3. Record performance

**Expected Results:**
- ✅ Initial load < 3 seconds
- ✅ Charts render < 1 second
- ✅ Transactions load < 500ms
- ✅ No long-running JavaScript tasks

**Test: Adding Many Transactions**
1. Add 50+ transactions
2. Check if list and charts remain responsive

**Expected Results:**
- ✅ List doesn't freeze when scrolling
- ✅ Charts still responsive
- ✅ No memory leaks (check DevTools Memory tab)

---

### 12. Data Persistence

**Test: Database Persistence**
1. Add a transaction
2. Close browser completely
3. Reopen app and login

**Expected Results:**
- ✅ Transaction still exists
- ✅ Budget still set to updated value
- ✅ Data survives server restarts

**Test: Session Persistence**
1. Login
2. Close browser tab
3. Reopen browser
4. Navigate to `http://localhost:3000`

**Expected Results:**
- ✅ Still logged in (session cookie valid)
- ✅ Redirected directly to dashboard
- ✅ No need to login again

---

## Quick Test Checklist

Run this before marking as complete:

- [ ] Login works
- [ ] Can add income transaction
- [ ] Can add expense transaction
- [ ] Budget alert triggers at 80%
- [ ] Budget alert triggers at 100%
- [ ] Can update budget
- [ ] Can delete transaction
- [ ] Charts render with data
- [ ] Filter transactions works
- [ ] Export to CSV works
- [ ] Mobile view works
- [ ] Data persists after refresh
- [ ] No console errors

---

## Reporting Issues

If you find a bug:

1. **Record the steps** to reproduce
2. **Check the console** for errors (F12 → Console)
3. **Check Network tab** for API errors (F12 → Network)
4. **Take a screenshot** of the issue
5. **Include environment details**:
   - Browser version
   - OS
   - Device (desktop/mobile)

---

## Performance Baseline

**Target metrics:**
- First Contentful Paint (FCP): < 2 seconds
- Largest Contentful Paint (LCP): < 3 seconds
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 4 seconds

**Measure with:**
```bash
npm run build
npm start
# Then use Google PageSpeed Insights or Lighthouse
```
