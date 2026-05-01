const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (file.includes('node_modules') || file.includes('.next')) return;
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/"white"/g, '"#111111"')
    .replace(/'white'/g, '"#111111"')
    .replace(/rgba\(255,255,255,/g, 'rgba(17,17,17,')
    .replace(/rgba\(255, 255, 255,/g, 'rgba(17,17,17,')
    .replace(/#ffffff/g, '#111111')
    .replace(/#fff/g, '#111')
    .replace(/#000000/g, '#ffffff')
    .replace(/#000/g, '#fff');
    
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    updatedCount++;
    console.log('Updated', file);
  }
});

console.log('Total files updated:', updatedCount);
