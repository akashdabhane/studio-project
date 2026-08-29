const fs = require('fs');
const path = require('path');
const https = require('https');

const matches = JSON.parse(fs.readFileSync('all_image_matches.json', 'utf8'));
const films = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'data', 'films.json'), 'utf8'));

// Build lookup: baseHash -> realFilename (prefer .jpeg or .webp)
const hashMap = new Map();

matches.forEach(relPath => {
  const filename = path.basename(relPath);
  // Example: 4bgof0gD4qa5fOynU3jzcqHbOcF.Ix4CO9XK.jpeg
  // baseId: 4bgof0gD4qa5fOynU3jzcqHbOcF
  const parts = filename.split('.');
  if (parts.length >= 3) {
    const baseId = parts[0];
    const ext = parts[parts.length - 1];
    
    // We prefer .jpeg or .jpg over .avif/.webp for standard browser compatibility
    if (!hashMap.has(baseId) || ext === 'jpeg' || ext === 'jpg') {
      hashMap.set(baseId, filename);
    }
  }
});

console.log(`Mapped ${hashMap.size} unique base image IDs to real CDN filenames!`);

// Map all film media and spotlight images
const targetImages = new Set();
const filmImageMap = {};

films.forEach(film => {
  const mappedMedia = [];
  let mappedSpotlight = null;

  if (film.media) {
    film.media.forEach(m => {
      const baseId = m.split('.')[0];
      const realName = hashMap.get(baseId);
      if (realName) {
        mappedMedia.push(realName);
        targetImages.add(realName);
      }
    });
  }

  if (film.spotlight_image) {
    const baseId = film.spotlight_image.split('.')[0];
    const realName = hashMap.get(baseId);
    if (realName) {
      mappedSpotlight = realName;
      targetImages.add(realName);
    }
  }

  filmImageMap[film.id] = {
    spotlight: mappedSpotlight,
    media: mappedMedia
  };
});

console.log(`Total unique image files to download: ${targetImages.size}`);
fs.writeFileSync('film_image_map.json', JSON.stringify(filmImageMap, null, 2));

const assetsDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

async function downloadFile(filename) {
  const targetPath = path.join(assetsDir, filename);
  if (fs.existsSync(targetPath)) return;

  const url = `https://maddockfilms.com/_app/immutable/assets/${encodeURIComponent(filename)}`;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const stream = fs.createWriteStream(targetPath);
        res.pipe(stream);
        stream.on('finish', () => { stream.close(); resolve(); });
      } else {
        console.warn(`Failed ${filename}: HTTP ${res.statusCode}`);
        resolve();
      }
    }).on('error', (err) => {
      console.warn(`Error ${filename}: ${err.message}`);
      resolve();
    });
  });
}

async function runDownload() {
  const files = Array.from(targetImages);
  for (let i = 0; i < files.length; i += 5) {
    const batch = files.slice(i, i + 5);
    await Promise.all(batch.map(f => downloadFile(f)));
    console.log(`Progress: ${Math.min(i + 5, files.length)} / ${files.length}`);
  }
  console.log('ALL FILM IMAGES DOWNLOADED SUCCESSFULLY!');
}

runDownload();
