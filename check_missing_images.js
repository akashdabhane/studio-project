const fs = require('fs');
const path = require('path');

const films = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'data', 'films.json'), 'utf8'));
const assetFiles = fs.readdirSync(path.join(__dirname, 'public', 'assets'));

console.log(`Total downloaded asset files: ${assetFiles.length}`);

const missing = [];
films.forEach((film) => {
  const images = [...(film.media || []), film.spotlight_image].filter(Boolean);
  const existing = images.filter(img => {
    // Check direct match or filename without extension matching
    return assetFiles.some(f => f.includes(img.split('.')[0]));
  });
  if (existing.length === 0) {
    missing.push({ id: film.id, title: film.title, media: film.media, spotlight: film.spotlight_image });
  }
});

console.log(`Films with NO matching downloaded image: ${missing.length} / ${films.length}`);
console.log('Missing films sample:', missing.slice(0, 10));
