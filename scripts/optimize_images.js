const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

async function processImage(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;
  const outPath = file.replace(/\.(png|jpe?g)$/i, '.webp');
  await sharp(file)
    .webp({ quality: 70 })
    .toFile(outPath);
  console.log(`Converted ${file} -> ${outPath}`);
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (entry.isFile()) {
      await processImage(full);
    }
  }
}

walk(imagesDir)
  .then(() => console.log('Image optimization complete'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
