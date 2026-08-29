const fs = require('fs');
const path = require('path');
const https = require('https');

const films = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'data', 'films.json'), 'utf8'));

const assetsDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Collect image filenames
const imageFiles = new Set();

// Logo
imageFiles.add('logo.Bid-RU14.png');
imageFiles.add('favicon.DMhi30Pi.svg');
imageFiles.add('Dinesh Ver.hE2HMXfl.jpeg');

// Films media and spotlight images
films.forEach(film => {
  if (film.spotlight_image) imageFiles.add(film.spotlight_image);
  if (Array.isArray(film.media)) {
    film.media.forEach(m => imageFiles.add(m));
  }
});

console.log(`Found ${imageFiles.size} unique image files to download...`);

async function downloadFile(filename) {
  const targetPath = path.join(assetsDir, filename);
  if (fs.existsSync(targetPath)) {
    return; // Already downloaded
  }

  // Encode filename for URL if it contains spaces
  const url = `https://maddockfilms.com/_app/immutable/assets/${encodeURIComponent(filename)}`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(targetPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        // Try fallback to jpeg or webp
        console.warn(`Failed to download ${filename}: HTTP ${res.statusCode}`);
        resolve();
      }
    }).on('error', (err) => {
      console.warn(`Error downloading ${filename}: ${err.message}`);
      resolve();
    });
  });
}

async function downloadAll() {
  const array = Array.from(imageFiles);
  for (let i = 0; i < array.length; i += 5) {
    const batch = array.slice(i, i + 5);
    await Promise.all(batch.map(f => downloadFile(f)));
    console.log(`Downloaded batch ${Math.min(i + 5, array.length)} / ${array.length}`);
  }
  console.log('All image downloads completed!');
}

downloadAll();
