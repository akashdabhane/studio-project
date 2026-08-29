const fs = require('fs');

const content = fs.readFileSync('all_chunks.js', 'utf8');

// Search for any string ending in .avif, .webp, .jpeg, .jpg, .png
const imgRegex = /["']([^"']+\.(?:avif|webp|jpeg|jpg|png))["']/g;
let match;
const matches = new Set();
while ((match = imgRegex.exec(content)) !== null) {
  matches.add(match[1]);
}

console.log(`Found ${matches.size} image string matches:`);
const array = Array.from(matches);
console.log(array.slice(0, 50));
fs.writeFileSync('all_image_matches.json', JSON.stringify(array, null, 2));
