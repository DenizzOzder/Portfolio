import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

function getAllFiles(dir: string, fileArray: string[] = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, fileArray);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      fileArray.push(fullPath);
    }
  }
  return fileArray;
}

const files = getAllFiles(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace relative imports to src files
  // Match single or double quotes
  content = content.replace(/from\s+(['"])(\.\.\/|\.\.\/\.\.\/)(.*?)(['"])/g, (match, p1, p2, p3, p4) => {
    // p2 is the relative path part: '../' or '../../'
    // Calculate the absolute path of the target file
    const currentDir = path.dirname(file);
    const targetAbsPath = path.resolve(currentDir, p2 + p3);
    
    // Check if target is inside srcDir
    if (targetAbsPath.startsWith(srcDir)) {
      // Calculate relative path from srcDir
      let relToSrc = path.relative(srcDir, targetAbsPath);
      // Replace Windows backslashes with forward slashes
      relToSrc = relToSrc.replace(/\\/g, '/');
      return `from ${p1}@/${relToSrc}${p4}`;
    }
    return match; // If outside src, leave it alone
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated import paths in: ${path.relative(__dirname, file)}`);
  }
});
