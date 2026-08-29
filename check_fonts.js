const fs = require('fs');
const path = require('path');

const step10 = 'C:\\Users\\Akash\\.gemini\\antigravity\\brain\\87d9088e-0479-43fa-b800-fe1c31725709\\.system_generated\\steps\\10\\content.md';
const step12 = 'C:\\Users\\Akash\\.gemini\\antigravity\\brain\\87d9088e-0479-43fa-b800-fe1c31725709\\.system_generated\\steps\\12\\content.md';

const css0 = fs.existsSync(step10) ? fs.readFileSync(step10, 'utf8') : '';
const css3 = fs.existsSync(step12) ? fs.readFileSync(step12, 'utf8') : '';
const chunks = fs.existsSync('all_chunks.js') ? fs.readFileSync('all_chunks.js', 'utf8') : '';

const fullText = css0 + '\n' + css3 + '\n' + chunks;

// Search for font-family:
const fontFamilyMatches = [...fullText.matchAll(/font-family:\s*([^;}]+)/gi)].map(m => m[1].trim());
console.log('Unique font-family declarations in original site CSS/bundle:');
console.log([...new Set(fontFamilyMatches)]);

// Search for @import or Google fonts links in CSS/bundle
const googleFonts = [...fullText.matchAll(/https:\/\/fonts\.googleapis\.com\/css2\?[^"'\s)]+/gi)].map(m => m[0]);
console.log('\nGoogle Fonts links:');
console.log([...new Set(googleFonts)]);
