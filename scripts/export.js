const fs = require('fs');
const path = require('path');

// Create export directory if it doesn't exist
const exportDir = path.join(process.cwd(), 'export');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

console.log('Export directory created at:', exportDir);
console.log('After running "npm run build", copy the contents of the "dist" folder to your hosting provider.');
