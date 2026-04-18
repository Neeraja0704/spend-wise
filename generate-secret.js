#!/usr/bin/env node

// Generate a secure NextAuth secret
const crypto = require('crypto');

const secret = crypto.randomBytes(32).toString('hex');

console.log('🔐 Generated NextAuth Secret:');
console.log(secret);
console.log('');
console.log('Add this to your .env.local file:');
console.log(`NEXTAUTH_SECRET=${secret}`);