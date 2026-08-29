const fs = require('fs');
const path = require('path');
const https = require('https');

const chunks = [
  '_app/immutable/entry/start.BLwskx-g.js',
  '_app/immutable/chunks/RY3KYjYG.js',
  '_app/immutable/chunks/Cag-HOOc.js',
  '_app/immutable/chunks/PbcwGfc1.js',
  '_app/immutable/chunks/D_zFPf8n.js',
  '_app/immutable/entry/app.TjkjN6ck.js',
  '_app/immutable/chunks/DsnmJJEf.js',
  '_app/immutable/chunks/S5zLV2LE.js',
  '_app/immutable/chunks/DJISk7T0.js',
  '_app/immutable/chunks/Cdi6RlS8.js',
  '_app/immutable/chunks/C-zwQux9.js',
  '_app/immutable/nodes/0.CMM5jm6p.js',
  '_app/immutable/chunks/CK4I3y-7.js',
  '_app/immutable/chunks/D568DQlT.js',
  '_app/immutable/chunks/BTttyoVO.js',
  '_app/immutable/nodes/3.BFheeG_C.js'
];

async function downloadChunk(relPath) {
  const url = `https://maddockfilms.com/${relPath}`;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    }).on('error', () => resolve(''));
  });
}

async function run() {
  let allJs = '';
  for (const chunk of chunks) {
    console.log(`Fetching ${chunk}...`);
    const content = await downloadChunk(chunk);
    allJs += '\n' + content;
  }
  fs.writeFileSync('all_chunks.js', allJs);
  console.log('Downloaded all JS chunks! Combined size:', allJs.length);

  // Search for asset mapping patterns
  // SvelteKit enhanced-img outputs object mapping hashes to URLs like "/_app/immutable/assets/<hash>.<ext>"
  const assetRegex = /\/_app\/immutable\/assets\/([a-zA-Z0-9_\-%]+(?:\.[a-zA-Z0-9_\-%]+)+)/g;
  let match;
  const foundAssets = new Set();
  while ((match = assetRegex.exec(allJs)) !== null) {
    foundAssets.add(match[1]);
  }
  console.log(`Found ${foundAssets.size} asset file references in JS chunks!`);
  fs.writeFileSync('found_assets.json', JSON.stringify(Array.from(foundAssets), null, 2));
}

run();
