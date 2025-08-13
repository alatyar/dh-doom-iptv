const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function buildStatic() {
  try {
    console.log('🔨 Building Next.js app for static export...');

    // Set environment for static export
    process.env.NODE_ENV = 'production';
    process.env.NEXT_TELEMETRY_DISABLED = '1';

    execSync('npm run build', { stdio: 'inherit' });

    console.log('📁 Creating static export...');
    const distPath = path.join(process.cwd(), 'dist');
    const exportPath = path.join(process.cwd(), 'static-export');

    // Copy dist to static-export
    if (fs.existsSync(exportPath)) {
      fs.removeSync(exportPath);
    }

    if (fs.existsSync(distPath)) {
      fs.copySync(distPath, exportPath);

      // Create .htaccess for proper routing
      const htaccessContent = `
# Enable HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle Next.js routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
</IfModule>
`;

      fs.writeFileSync(path.join(exportPath, '.htaccess'), htaccessContent.trim());

      console.log('✅ Static export created in "static-export" folder');
      console.log('📤 Upload the contents of "static-export" to your hosting provider');
      console.log('🔧 .htaccess file created for proper routing and optimization');

    } else {
      console.error('❌ Build output not found. Make sure the build completed successfully.');
    }

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    console.log('\n🔍 Troubleshooting tips:');
    console.log('1. Make sure all dependencies are installed: npm install');
    console.log('2. Check for TypeScript errors: npm run type-check');
    console.log('3. Try building without export first: npm run build');
  }
}

buildStatic();
