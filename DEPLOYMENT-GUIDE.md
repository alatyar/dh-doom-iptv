# 🚀 Deployment Guide - Doom VIP IPTV

## 🔍 Troubleshooting 503 Service Unavailable Error

### Common Causes and Solutions:

#### 1. **Server Overload**
- **Cause:** Too many requests or insufficient resources
- **Solution:** 
  - Contact hosting provider to increase resources
  - Implement caching (already configured)
  - Use CDN for static assets

#### 2. **Node.js Version Issues**
- **Cause:** Hosting doesn't support Node.js 18+
- **Solution:**
  - Check hosting Node.js version: `node --version`
  - Update to Node.js 18+ or use compatible version
  - Use `.nvmrc` file: `echo "18" > .nvmrc`

#### 3. **Missing Dependencies**
- **Cause:** Production dependencies not installed
- **Solution:**
  ```bash
  npm ci --only=production
  # or
  npm install --production
  ```

#### 4. **Port Configuration**
- **Cause:** App trying to use wrong port
- **Solution:**
  - Set PORT environment variable
  - Use `process.env.PORT || 3000`

#### 5. **Memory Limits**
- **Cause:** App exceeds memory limits
- **Solution:**
  - Optimize bundle size (already done)
  - Increase memory limits in hosting
  - Use `--max-old-space-size=1024`

## 📦 Deployment Options:

### Option 1: Static Export (Recommended for shared hosting)
```bash
# Build static version
npm run build
npm run export

# Upload 'out' folder to hosting
```

### Option 2: Node.js Hosting
```bash
# Build for production
npm run build

# Upload all files except:
# - node_modules (will be installed on server)
# - .next/cache
# - .env.local
```

### Option 3: Docker Deployment
```bash
# Build Docker image
docker build -t doom-vip-iptv .

# Run container
docker run -p 3000:3000 doom-vip-iptv
```

## 🔧 Pre-deployment Checklist:

- [ ] Build completes without errors
- [ ] All environment variables set
- [ ] Database connections working
- [ ] Static assets optimized
- [ ] Security headers configured
- [ ] SSL certificate installed
- [ ] Domain DNS configured

## 📞 Support:

If 503 error persists:
1. Check hosting provider status page
2. Contact technical support
3. Provide error logs and build information
4. Mention this is a Next.js 15 application
