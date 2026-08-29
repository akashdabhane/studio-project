const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'public', 'site_bundle.js'), 'utf8');

const regex = /JSON\.parse\((['"`])(.*?)\1\)/g;
let match;
while ((match = regex.exec(content)) !== null) {
  try {
    const rawQuote = match[1];
    const rawVal = match[0];
    const data = eval(rawVal);
    if (Array.isArray(data) && data.length > 0) {
      if (data[0].title) {
        console.log('Successfully extracted FILMS array! Count:', data.length);
        fs.mkdirSync(path.join(__dirname, 'src', 'data'), { recursive: true });
        fs.writeFileSync(path.join(__dirname, 'src', 'data', 'films.json'), JSON.stringify(data, null, 2));
      } else if (data[0].name) {
        console.log('Successfully extracted CAST array! Count:', data.length);
        fs.mkdirSync(path.join(__dirname, 'src', 'data'), { recursive: true });
        fs.writeFileSync(path.join(__dirname, 'src', 'data', 'cast.json'), JSON.stringify(data, null, 2));
      }
    }
  } catch(e) {
    console.error('Err:', e.message);
  }
}
