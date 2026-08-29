const fs = require('fs');

const step12 = 'C:\\Users\\Akash\\.gemini\\antigravity\\brain\\87d9088e-0479-43fa-b800-fe1c31725709\\.system_generated\\steps\\12\\content.md';
const origCss = fs.readFileSync(step12, 'utf8');

const regex = /\.film-card[^{]*\{[^}]*\}/g;
let match;
console.log('Film card CSS rules from original site:');
while ((match = regex.exec(origCss)) !== null) {
  console.log(match[0]);
}

// Search for any other rule containing film-card
const regex2 = /\.film-[^{]*\{[^}]*\}/g;
while ((match = regex2.exec(origCss)) !== null) {
  console.log(match[0]);
}
