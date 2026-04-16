# 🗂️ File Directory Guide

## Quick Navigation

### 📍 START HERE
- **New to the project?** → Read `QUICKSTART.md` (5 min)
- **Setup issues?** → Check `SETUP_GUIDE.md` (troubleshooting section)
- **Want to understand code?** → Read `ARCHITECTURE.md`
- **Looking for features?** → Check `README.md`
- **What's included?** → This file `FILE_GUIDE.md`

---

## 📁 Project Structure

### 🎯 Main Application (`src/`)

#### `src/App.js`
**Purpose:** Root component, handles routing and authentication
**Key Functions:**
- `handleLogin()` - Authenticate user
- `handleSignup()` - Create account
- `handleLogout()` - Logout user
- `showAlert()` - Display notifications
**When to Edit:** To change auth flow or add new pages

#### `src/index.js`
**Purpose:** React entry point
**When to Edit:** Rarely - only for root-level changes

#### `src/App.css`
**Purpose:** All styling for the application
**Sections:**
- Global styles (lines 1-50)
- Authentication pages (lines 50-200)
- Alerts (lines 200-250)
- Dashboard layout (lines 250-400)
- Cards & stats (lines 400-550)
- Budget section (lines 550-650)
- Transaction features (lines 650-850)
- Responsive design (lines 850-1000)
- Chart styles (lines 1000-1100)
**When to Edit:** To change colors, spacing, or layout

---

### 📄 Pages (`src/pages/`)

#### `src/pages/Login.js`
**Purpose:** Login page component
**Key Features:**
- Email/password form
- Form validation
- Google auth simulation
- Link to signup
- Demo credentials hint
**When to Edit:** To customize login UI or add social auth

#### `src/pages/Signup.js`
**Purpose:** Account creation page
**Key Features:**
- Name, email, password form
- Password confirmation
- Validation checks
- Link to login
**When to Edit:** To add fields (phone, age, etc.) or customize validation

#### `src/pages/Dashboard.js`
**Purpose:** Main dashboard - core of the application
**Key Functions:**
- `loadTransactions()` - Load from localStorage
- `loadBudget()` - Load budget settings
- `handleAddTransaction()` - Save new transaction
- `handleDeleteTransaction()` - Remove transaction
- `handleSetBudget()` - Update budget
- `handleExportCSV()` - Export to CSV
- `handleClearAllData()` - Clear all data
**Key Calculations:**
- totalIncome, totalExpense, totalBalance
- remainingBudget, budgetPercentage
**When to Edit:** To add features or modify dashboard behavior

---

### 🧩 Components (`src/components/`)

#### `src/components/Alert.js`
**Purpose:** Notification component
**Props:**
- `message` - Alert text
- `type` - 'success' | 'error' | 'warning' | 'info'
**When to Edit:** To change alert styling or add animations

#### `src/components/BudgetSection.js`
**Purpose:** Display and manage monthly budget
**Props:**
- `budget` - Budget object
- `totalExpense` - Current spending
- `remainingBudget` - Amount left
- `budgetPercentage` - Usage %
- `onSetBudget` - Callback for setting budget
**Key Features:**
- Progress bar
- Color indicators
- Status message
- Budget modal trigger
**When to Edit:** To change budget calculations or display

#### `src/components/TransactionForm.js`
**Purpose:** Form to add new transactions
**Key Variables:**
- `CATEGORIES` - Available categories
- `type` - 'income' or 'expense'
- `amount`, `category`, `date`, `note` - Form fields
**Key Functions:**
- `handleSubmit()` - Validate and submit
**When to Edit:** To add/remove categories or fields

#### `src/components/TransactionsList.js`
**Purpose:** Display all transactions
**Key Variables:**
- `CATEGORY_EMOJIS` - Emoji mapping for categories
**Key Features:**
- Color coding (green/red)
- Date formatting
- Delete button
- Empty state
**When to Edit:** To change display format or add sorting/filtering

#### `src/components/Chart.js`
**Purpose:** Visual chart of income vs expense
**Props:**
- `totalIncome` - Total income amount
- `totalExpense` - Total expense amount
**Key Features:**
- Responsive bars
- Color coding
- Value display
**When to Edit:** To change chart style or add more metrics

---

### 🎨 Styles (`src/styles/`)

#### `src/styles/theme.css`
**Purpose:** Design system and color variables
**Key Sections:**
- Color palette (lines 1-30)
- CSS variables (lines 1-50)
- Animations (lines 50-70)
- Utility classes (lines 70-100)
**When to Edit:** To change app colors or add design tokens

---

### 📝 Public Assets (`public/`)

#### `public/index.html`
**Purpose:** HTML template for React app
**Contains:**
- Meta tags
- Root div for React
- Loading state styles
**When to Edit:** To change page title or add meta tags

---

### 📚 Documentation

#### `README.md`
**Purpose:** Complete project documentation
**Contains:**
- Feature overview
- Installation guide
- Usage instructions
- Technology stack
- Deployment options
**When to Use:** First overview, comprehensive guide

#### `QUICKSTART.md`
**Purpose:** 5-minute quick start
**Contains:**
- Installation steps
- Demo credentials
- Basic usage
- Troubleshooting summary
**When to Use:** Fastest way to get running

#### `SETUP_GUIDE.md`
**Purpose:** Detailed setup and troubleshooting
**Contains:**
- Step-by-step setup
- All troubleshooting scenarios
- Environment verification
- Deployment options
**When to Use:** Setup issues or detailed guidance

#### `ARCHITECTURE.md`
**Purpose:** System design and developer guide
**Contains:**
- Data flow diagrams
- Component hierarchy
- State management
- localStorage schema
- Performance tips
- Extension points
**When to Use:** Understanding code structure or extending features

#### `DELIVERABLES.md`
**Purpose:** Project completion summary
**Contains:**
- Feature checklist
- File statistics
- Design system
- Use cases
- Testing checklist
**When to Use:** Project overview and what's included

#### `FILE_GUIDE.md`
**Purpose:** This file - navigation guide
**When to Use:** Finding files and understanding structure

---

### ⚙️ Configuration Files

#### `package.json`
**Purpose:** NPM dependencies and scripts
**Key Fields:**
- `dependencies` - React libraries
- `scripts` - npm commands (start, build, test)
**When to Edit:** To add new packages

#### `.env.example`
**Purpose:** Environment variables template
**When to Edit:** To add new environment variables
**Note:** Rename to `.env` to use

#### `.gitignore`
**Purpose:** Files to exclude from git
**Includes:** node_modules, build, .env, etc.
**When to Edit:** To add new git-ignored files

---

## 🔍 Finding Things

### By Feature
| Feature | Files |
|---------|-------|
| Authentication | `Login.js`, `Signup.js`, `App.js` |
| Dashboard | `Dashboard.js`, `App.css` |
| Transactions | `TransactionForm.js`, `TransactionsList.js` |
| Budget | `BudgetSection.js`, `Dashboard.js` |
| Alerts | `Alert.js`, `App.js` |
| Styling | `App.css`, `theme.css` |
| Charts | `Chart.js` |

### By Function
| Function | File | Line |
|----------|------|------|
| Login handling | `App.js` | ~40 |
| Add transaction | `Dashboard.js` | ~80 |
| Delete transaction | `Dashboard.js` | ~105 |
| Export CSV | `Dashboard.js` | ~130 |
| Budget calculation | `Dashboard.js` | ~165 |
| Form submission | `TransactionForm.js` | ~25 |
| Display chart | `Chart.js` | ~15 |

### By Style Element
| Element | File | CSS |
|---------|------|-----|
| Colors | `theme.css` | Lines 1-30 |
| Buttons | `App.css` | Lines 150-220 |
| Cards | `App.css` | Lines 350-400 |
| Forms | `App.css` | Lines 700-800 |
| Responsive | `App.css` | Lines 850-1000 |

---

## 📊 File Size Reference

| File | Type | Size |
|------|------|------|
| App.js | Component | ~10KB |
| Dashboard.js | Component | ~12KB |
| App.css | Styling | ~35KB |
| TransactionForm.js | Component | ~4KB |
| TransactionsList.js | Component | ~4KB |
| theme.css | Styling | ~3KB |
| Total App | - | ~70KB |

---

## 🚀 Common Tasks

### "I want to change the app color"
→ Edit `src/styles/theme.css` (lines 1-30)

### "I want to add a new category"
→ Edit `src/components/TransactionForm.js` (CATEGORIES variable)

### "I want to change the layout"
→ Edit `src/App.css` or component JSX

### "I want to add a new page"
→ Create in `src/pages/`, add route in `App.js`

### "I want to export features"
→ Check `src/pages/Dashboard.js` (handleExportCSV)

### "I want to understand the code"
→ Read `ARCHITECTURE.md`

### "I want to deploy"
→ Read `README.md` deployment section

### "I'm stuck with setup"
→ Check `SETUP_GUIDE.md` troubleshooting

---

## 🔗 Dependencies & Imports

### React Core
```javascript
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
```

### Local Components
```javascript
import Dashboard from './pages/Dashboard'
import Alert from './components/Alert'
import App from './App'
```

### CSS
```javascript
import './App.css'
import './styles/theme.css'
```

### No External Libraries
✨ Application uses only React and CSS!

---

## 📝 Code Comments

All files include comments explaining:
- Component purpose
- Function behavior
- Complex logic
- localStorage operations
- Calculations

Look for `//` and `/* */` comments throughout code.

---

## 🎯 Learning Path

1. **Start:** Read `QUICKSTART.md` (5 min)
2. **Setup:** Follow `SETUP_GUIDE.md` (10 min)
3. **Explore:** Test all features in app (10 min)
4. **Read Code:** Review `App.js` → `Dashboard.js` (15 min)
5. **Understand:** Read `ARCHITECTURE.md` (20 min)
6. **Extend:** Add a feature or customize (30 min)

**Total Time:** ~90 minutes to fully understand

---

## 💡 Pro Tips

1. **Use Ctrl+F** to search files while reading
2. **Check comments** at top of each file
3. **Follow imports** to understand dependencies
4. **Use DevTools** (F12) to debug
5. **Read ARCHITECTURE.md** for big picture
6. **Start with README.md** for overview

---

## 🎓 Educational Value

### React Concepts
- Functional components
- Hooks (useState, useEffect)
- Props passing
- State management
- Component composition

### Web Development
- localStorage API
- localStorage persistence
- CSV generation
- Responsive CSS
- Form handling

### UX/Design
- Color theory
- Component design
- Responsive design
- Animation & transitions
- User feedback

---

This guide should help you navigate the entire project efficiently! 🗺️

**Happy coding!** 💻
