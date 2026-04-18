#!/usr/bin/env node

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Test environment variables
console.log('🔍 Checking Environment Variables...\n');

const requiredVars = [
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'MONGODB_URI'
];

let allSet = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (!value || value.includes('your_') || value.includes('here') || value.includes('supersecret')) {
    console.log(`❌ ${varName}: NOT SET (placeholder value)`);
    allSet = false;
  } else {
    console.log(`✅ ${varName}: SET`);
  }
});

console.log('\n' + '='.repeat(50));

if (allSet) {
  console.log('🎉 All environment variables are properly configured!');
  console.log('🚀 Your app should work with real authentication and database.');
} else {
  console.log('⚠️  Some environment variables need to be configured.');
  console.log('📖 Check PRODUCTION_SETUP.md for detailed instructions.');
}

console.log('\n🔗 Next steps:');
console.log('1. Set up Google OAuth credentials');
console.log('2. Set up MongoDB Atlas database');
console.log('3. Update .env.local with real values');
console.log('4. Test locally: npm run dev');
console.log('5. Deploy to Vercel: vercel --prod');