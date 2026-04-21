# Production Readiness Checklist

## Environment Configuration

### 1. Create Production `.env.production` file

```bash
# NextAuth
NEXTAUTH_SECRET=<generate-with-openssl-rand-hex-32>
NEXTAUTH_URL=https://yourdomain.com

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=your_production_client_id
GOOGLE_CLIENT_SECRET=your_production_client_secret

# MongoDB (MongoDB Atlas)
MONGODB_URI=mongodb+srv://prod_user:prod_password@prod-cluster.mongodb.net/expense-tracker-prod?retryWrites=true&w=majority

# API Configuration
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

### 2. Generate NEXTAUTH_SECRET

```bash
# On Linux/Mac:
openssl rand -base64 32

# On Windows PowerShell:
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString())) 
```

## MongoDB Atlas Setup (Production)

1. **Create dedicated cluster**:
   - Cluster tier: M2 or higher (minimum for production)
   - Enable automated backups
   - Enable Multi-AZ deployment

2. **Create database user**:
   - Username: `expense_tracker_prod`
   - Use strong password (32+ characters)
   - Database: `expense-tracker-prod`

3. **Network Security**:
   - Add production server IP to IP whitelist
   - Use VPC peering for Vercel deployment

4. **Backups**:
   - Enable automated backups (daily)
   - Store in separate region for disaster recovery

## Google Cloud OAuth Setup (Production)

1. **Create new OAuth app for production**:
   - Go to Google Cloud Console
   - Create new project: "ExpenseTracker Production"

2. **Configure OAuth consent screen**:
   - User type: External
   - Add required scopes: `email`, `profile`

3. **Create OAuth credentials**:
   - Application type: Web Application
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs:
     - `https://yourdomain.com/api/auth/callback/google`
     - `https://yourdomain.com`

4. **Add to authorized domains**:
   - Go to Settings
   - Authorized domains: `yourdomain.com`

## Deployment to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Environment variables in Vercel**:
   - Go to Project Settings → Environment Variables
   - Add all production variables
   - Redeploy with new variables

4. **Configure Custom Domain**:
   - Add your domain
   - Update DNS records (provided by Vercel)

## Security Checklist

- [ ] HTTPS enabled on domain
- [ ] NEXTAUTH_SECRET is strong (32+ characters)
- [ ] Google OAuth credentials are production-only
- [ ] MongoDB password is strong (32+ characters)
- [ ] IP whitelist configured in MongoDB
- [ ] Rate limiting configured (add to API routes)
- [ ] CORS properly configured
- [ ] No console.log statements in production
- [ ] Error pages configured (500, 404)
- [ ] Monitoring enabled (Sentry/LogRocket)

## Performance Optimization

```javascript
// next.config.js - Already configured:
- swcMinify: true (faster build)
- compress: true (gzip compression)
- Image optimization
- Bundle analysis: npm run analyze
```

## Monitoring & Logging

### Add Sentry for Error Tracking:

```bash
npm i @sentry/nextjs
```

### Add Analytics:

```bash
npm i next-plausible
```

## Database Optimization

```javascript
// Already configured in models:
- Compound indexes for userId, month, year
- Proper relationships and references
- Field validation and sanitization
```

## API Rate Limiting

Add to critical endpoints:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Testing Checklist

- [ ] All API endpoints tested
- [ ] Authentication flow tested
- [ ] Budget alerts trigger correctly
- [ ] Transactions save properly
- [ ] Charts render with data
- [ ] Mobile responsiveness verified
- [ ] Load testing completed (min 1000 concurrent users)
- [ ] Security testing done (SQL injection, XSS, CSRF)

## Deployment Verification

After deploying to production:

1. Test login with Google OAuth
2. Create a transaction and verify it saves
3. Check budget alerts trigger at 80% and 100%
4. Verify data persists after page reload
5. Test on mobile and tablet
6. Check console for errors
7. Monitor performance metrics

## Rollback Plan

If production is down:

```bash
# Revert to previous Vercel deployment
vercel --rollback

# Or redeploy current version
vercel --prod
```

## Maintenance

- Monitor logs weekly
- Check MongoDB connection and indexes
- Review error rates in Sentry
- Update dependencies monthly
- Backup database weekly (MongoDB Atlas does this)
- Test disaster recovery monthly

## Support & Troubleshooting

### OAuth not working in production:
- Verify redirect URI exactly matches
- Check authorized domains
- Clear browser cookies

### Slow API responses:
- Check MongoDB indexes
- Review slow query logs
- Add caching layer if needed

### High error rates:
- Check Sentry dashboard
- Review recent deployments
- Check database connection
