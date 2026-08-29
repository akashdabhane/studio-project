const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'public', 'site_bundle.js'), 'utf8');

const jrStart = content.indexOf('Jr=[');
if (jrStart !== -1) {
  // Find where Jr array ends
  const arrayStart = content.indexOf('[', jrStart);
  // Scan for matching bracket
  let depth = 0;
  let inString = false;
  let quoteChar = '';
  let endPos = -1;
  for (let i = arrayStart; i < content.length; i++) {
    const char = content[i];
    if (inString) {
      if (char === quoteChar && content[i - 1] !== '\\') {
        inString = false;
      }
    } else {
      if (char === '"' || char === "'") {
        inString = true;
        quoteChar = char;
      } else if (char === '[') {
        depth++;
      } else if (char === ']') {
        depth--;
        if (depth === 0) {
          endPos = i;
          break;
        }
      }
    }
  }
  if (endPos !== -1) {
    const castJs = content.substring(arrayStart, endPos + 1);
    const cast = eval(castJs);
    console.log('Successfully extracted CAST array! Count:', cast.length);
    fs.mkdirSync(path.join(__dirname, 'src', 'data'), { recursive: true });
    fs.writeFileSync(path.join(__dirname, 'src', 'data', 'cast.json'), JSON.stringify(cast, null, 2));
  }
}
