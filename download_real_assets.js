const fs = require('fs');
const path = require('path');
const https = require('https');

const exactFiles = [
  'daf93eb13a04.CU1O9lDy.jpeg',
  'ccdb67c1de18.eafRkhPC.jpeg',
  '19b61dd2b244.C41wA0eS.jpeg',
  'b3d99d6d8017.BpaUke21.jpeg',
  '26e7714088b4.ovn2qWA-.jpeg',
  '7c8d43ea53fc.DbrCnIEd.jpeg',
  '2CPtFVZWzThp9cjxUcpf2i2J6Qi.BrIzcl7C.jpeg',
  '6N9sUbnu1FwwY8qT1mtHVSSBsdh.CEi_1YtL.jpeg',
  '7aSh2ZAJQvZIzw6yikc7XJ1zJmz.8Z5bGF7B.jpeg',
  '8LJdtgDzNTVQxRMOd8nCXtJh8Wr.B-BB56iH.jpeg',
  'd1SbIg1r1eowrCWsxHO6BJqQQwN.DFR6jCRz.jpeg',
  'i4fYoxLwDxMnu8N5VKaNERYAv6b.CXMwhWYP.jpeg',
  'jl3hyw4yE1dlw0YKSvpfjsiKWSB.yGIob2XK.jpeg',
  'qNVE6bAPivA6txGZ60797J0sjrC.FcnJp8sW.jpeg',
  'tRrTpdwBKuAgx2WrSMNOQwSegaV.BWDDRWH4.jpeg',
  'udkbDwBbysCGEydt0FHnl9dVO2k.CEpMu0ru.jpeg',
  'z20u8Yt9oGmpSm2NUnlPlo8lJVO.Gqp8-tED.jpeg',
  '2NC7sj8rheKxWqLYAbHnCa4mYBH.6MsJ7t0E.jpeg',
  'yudyxWcSts44556WWpJkoBZvylO.B2EHXfcW.jpeg',
  'pgAlKZVLX0eKu7By7LeRArqW7Jh.D4m4JIMG.jpeg',
  'ylYdXu0SM79Qs7vOz6q7mBxanVD.BLTv2MgE.jpeg',
  'A2qPWAJmnq3wVk3zBIupTdyJfxR.BFxDqjPS.jpeg',
  'MOFfgbFGYsMOPghNJHKANn4WWQ.o6IoOWJE.jpeg',
  'iZtq44ZmxBW0E3tAeLG6UdJe9aj.Dy3ecwp_.jpeg',
  'o970SSCQFsdsTZTzMW76UXHoXJG.BhaGpD7H.jpeg',
  '10kCy34fbgU9nI5ScfMcCGebNgo.D1WTDxyb.jpeg',
  'dseX3duyu7mHwzZqymdiDdXUaMR.jExhC15a.jpeg',
  'qHpEGFx13ntiAVl94e08EJ5ss4U.C5DK8VOK.jpeg',
  '6EXmk9vRC1Nyo18yElHe98RvGHg.DYvtoTAO.jpeg',
  '8857yhGrS85did6DfUAc1cF4ato.d7BcZafc.jpeg'
];

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
        console.warn(`404: ${filename}`);
        resolve();
      }
    }).on('error', () => resolve());
  });
}

async function run() {
  for (const f of exactFiles) {
    await downloadFile(f);
  }
  console.log('Real JPEG asset download complete!');
}

run();
