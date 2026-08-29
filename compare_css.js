const fs = require('fs');

const step12 = 'C:\\Users\\Akash\\.gemini\\antigravity\\brain\\87d9088e-0479-43fa-b800-fe1c31725709\\.system_generated\\steps\\12\\content.md';
const origCss = fs.readFileSync(step12, 'utf8');
const ourCss = fs.readFileSync('src/app/globals.css', 'utf8');

// Parse rules with font-family, font-size, font-weight, letter-spacing, text-transform
const origRules = origCss.split('}');
const fontDeclarations = [];

origRules.forEach(rule => {
  if (rule.includes('font') || rule.includes('letter-spacing') || rule.includes('text-transform')) {
    const parts = rule.split('{');
    if (parts.length === 2) {
      const selector = parts[0].trim();
      const body = parts[1].trim();
      // extract font properties
      const styles = {};
      body.split(';').forEach(style => {
        const [k, v] = style.split(':').map(s => s ? s.trim() : '');
        if (k && v && (k.startsWith('font') || k === 'letter-spacing' || k === 'text-transform' || k === 'line-height')) {
          styles[k] = v;
        }
      });
      if (Object.keys(styles).length > 0) {
        fontDeclarations.push({ selector, styles });
      }
    }
  }
});

console.log(`Found ${fontDeclarations.length} font declarations in original CSS:`);
console.log(JSON.stringify(fontDeclarations, null, 2));
