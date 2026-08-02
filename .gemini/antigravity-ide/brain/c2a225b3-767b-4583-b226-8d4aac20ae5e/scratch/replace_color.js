const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
        walkDir(dirPath, callback);
      }
    } else {
      callback(dirPath);
    }
  });
}

let targetDirs = [
  path.join(__dirname, '../../frontend'),
  path.join(__dirname, '../../docs')
];

let replacedCount = 0;

targetDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    walkDir(dir, (filePath) => {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css') || filePath.endsWith('.md')) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('#F59E0B') || content.includes('#f59e0b')) {
          let updated = content.replace(/#F59E0B/g, '#ffd01d').replace(/#f59e0b/g, '#ffd01d');
          fs.writeFileSync(filePath, updated, 'utf8');
          console.log(`Replaced in: ${filePath}`);
          replacedCount++;
        }
      }
    });
  }
});

console.log(`Finished replacing color in ${replacedCount} files.`);
