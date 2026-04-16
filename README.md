# 💳 ExpenseTracker - Professional Fintech Expense Tracker

A beautiful, responsive, and feature-rich expense tracking application built with React. Designed with a modern light theme UI/UX following professional fintech standards.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

## ✨ Features

### 👤 Authentication
- **Login & Signup** - Create account and log in with email/password
- **Google Auth UI** - Simulated "Continue with Google" button
- **Session Management** - localStorage-based authentication
- **Demo Account** - Pre-configured demo credentials for testing

### 📊 Dashboard
- **Greeting** - Personalized greeting with user's name
- **Financial Overview** - Total Balance, Income, and Expense at a glance
- **Interactive Stats Cards** - Hover effects and smooth animations
- **Income vs Expense Chart** - Visual comparison using bar chart

### 💰 Budget Management
- **Set Monthly Budget** - Easy-to-use budget setting modal
- **Budget Progress Bar** - Visual indicator of spending progress
- **Status Alerts** - Color-coded indicators:
  - 🟢 Green (Within Budget)
  - 🟡 Orange (Approaching Limit >80%)
  - 🔴 Red (Exceeded)
- **Remaining Balance** - Clear display of budget remaining

### 📝 Transaction Management
- **Add Transactions** - Easy form to add income/expense
- **Toggle Type** - Quick switch between Income/Expense
- **Category Selection** - Pre-defined categories for organization
- **Date Picker** - Set transaction date easily
- **Optional Notes** - Add notes to transactions
- **Color Coding** - Green for income, Red for expense
- **Delete Transactions** - With confirmation dialog
- **Real-time Updates** - Instant UI updates after adding/deleting

### 📄 Transaction List
- **Clear Display** - All transactions at a glance
- **Sorting** - Most recent first
- **Category Icons** - Visual indicators for each category
- **Date Formatting** - Easy-to-read date format
- **Empty State** - Helpful message when no transactions
- **Mobile Responsive** - Optimized for all screen sizes

### 💾 Data Export
- **CSV Export** - Download all transactions as CSV file
- **Date Stamped** - Files saved with current date
- **Easy Share** - Excel/Google Sheets compatible format

### 🎯 Bonus Features
- **Clear All Data** - Option to reset all transactions (with confirmation)
- **Logout Button** - Secure session termination
- **Income vs Expense Chart** - Visual analytics
- **Responsive Design** - Mobile, tablet, and desktop optimized

## 🎨 Design System

### Color Palette
```
Primary: #4F46E5 (Indigo)
Income: #16A34A (Green)
Expense: #DC2626 (Red)
Warning: #F59E0B (Amber)
Background: #F8FAFC (Light Blue-Gray)
Card: #FFFFFF (White)
Border: #E5E7EB (Light Gray)
Text Primary: #0F172A (Dark)
Text Secondary: #64748B (Medium Gray)
```

### Design Features
- ✨ Light, minimal, premium theme
- 🎯 Card-based layout with soft shadows
- 🔄 Smooth transitions and animations
- 📱 Fully responsive design
- ♿ Clean, accessible UI components
- 🎪 Professional fintech aesthetic

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or Download** the project
```bash
cd expense-tracker
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Start Development Server**
```bash
npm start
# or
yarn start
```

The app will open at `http://localhost:3000`

### Demo Credentials
```
Email: demo@test.com
Password: demo123
```

## 📁 Project Structure

```
expense-tracker/
├── public/
│   └── index.html                 # HTML template
├── src/
│   ├── pages/
│   │   ├── Login.js              # Login page
│   │   ├── Signup.js             # Signup page
│   │   └── Dashboard.js          # Main dashboard
│   ├── components/
│   │   ├── Alert.js              # Alert notifications
│   │   ├── BudgetSection.js      # Budget display & management
│   │   ├── TransactionForm.js    # Add transaction form
│   │   ├── TransactionsList.js   # Display transactions
│   │   └── Chart.js              # Income vs Expense chart
│   ├── styles/
│   │   └── theme.css             # Color variables & utilities
│   ├── App.js                    # Main app component
│   ├── App.css                   # Main styles
│   └── index.js                  # Entry point
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 🔧 Usage

### Adding a Transaction
1. Fill in the amount
2. Select type (Income/Expense)
3. Choose category
4. Pick date
5. Add optional note
6. Click "Add Transaction"

### Setting Budget
1. Click "⚙️ Set Budget" button in budget section
2. Enter budget amount
3. Click "Save Budget"

### Exporting Data
1. Click "📥" button in header
2. CSV file downloads automatically

### Managing Transactions
1. View all transactions in the list
2. Click "Delete" to remove a transaction
3. Confirm deletion in the dialog

## 💾 Data Storage

All data is stored locally in your browser using **localStorage**:
- User credentials (users)
- Transactions (per user)
- Budget settings (per user)
- Session data (current user)

**Note:** Data is cleared when browser storage is cleared. Consider exporting CSV for backup.

## 📱 Responsive Breakpoints

- **Desktop**: 1400px+ (optimal experience)
- **Tablet**: 768px - 1399px (optimized layout)
- **Mobile**: 480px - 767px (stacked layout)
- **Mobile Small**: < 480px (minimal layout)

## 🔒 Security Notes

- Passwords are stored in localStorage (development only)
- For production, use backend authentication
- No sensitive data should be stored locally
- Always use HTTPS in production

## 🎯 Key Technologies

- **React** - UI library
- **React Hooks** - State management (useState, useEffect)
- **localStorage** - Data persistence
- **CSS3** - Styling and animations
- **Responsive Design** - Mobile-first approach

## ✅ Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🚀 Build for Production

```bash
npm run build
# or
yarn build
```

Creates optimized build in `build/` folder ready for deployment.

## 📝 Future Enhancements

- Backend API integration
- Cloud sync
- Multiple currency support
- Recurring transactions
- Category analytics
- Budget alerts/notifications
- Dark mode theme
- Multi-user support with cloud sync
- Mobile app version

## 🤝 Contributing

For improvements or bug fixes, feel free to create issues or pull requests!

## 📄 License

This project is open source and available under the MIT License.

## 💬 Support

For issues or questions, please create an issue in the repository.

---

**Made with ❤️ for better financial management**

💳 **ExpenseTracker** - Track, Budget, and Grow
