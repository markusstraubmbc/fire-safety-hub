import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetsDir = join(__dirname, '..', 'src', 'assets');
const quality = 80;
const maxWidth = 1920;

// Hero image gets responsive variants
const heroFile = 'german_firefighters_fixed_bg.png';
const heroWidths = [640, 1024, 1920];

async function convertImages() {
  console.log('Starting WebP conversion and optimization...\n');

  const files = await readdir(assetsDir);
  const imageFiles = files.filter(f => {
    const ext = extname(f).toLowerCase();
    return (ext === '.png' || ext === '.jpg' || ext === '.jpeg') && !f.endsWith('.webp');
  });

  // Skip files that already have a .webp version
  const existingWebp = new Set(files.filter(f => f.endsWith('.webp')).map(f => f.replace('.webp', '')));

  let totalSaved = 0;
  let converted = 0;

  for (const file of imageFiles) {
    const input = join(assetsDir, file);
    const nameWithoutExt = file.replace(extname(file), '');

    // Skip if webp already exists
    if (existingWebp.has(nameWithoutExt)) {
      console.log(`SKIP ${file} (WebP exists)`);
      continue;
    }

    const originalStats = await stat(input);
    const originalSize = originalStats.size;

    // Get image metadata
    const metadata = await sharp(input).metadata();
    const needsResize = metadata.width > maxWidth;

    // Convert to WebP (resize if needed)
    let pipeline = sharp(input);
    if (needsResize) {
      pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
    }

    const output = join(assetsDir, `${nameWithoutExt}.webp`);
    await pipeline.webp({ quality, effort: 6 }).toFile(output);

    const newStats = await stat(output);
    const newSize = newStats.size;
    const saved = originalSize - newSize;
    const percentage = ((saved / originalSize) * 100).toFixed(1);
    totalSaved += saved;
    converted++;

    const resizeInfo = needsResize ? ` (resized ${metadata.width}px -> ${maxWidth}px)` : '';
    console.log(`OK ${file}${resizeInfo}`);
    console.log(`   ${(originalSize / 1024).toFixed(0)} KB -> ${(newSize / 1024).toFixed(0)} KB (${percentage}% smaller)\n`);
  }

  // Create responsive hero variants
  const heroInput = join(assetsDir, heroFile);
  try {
    await stat(heroInput);
    console.log(`\nCreating responsive hero variants...`);
    for (const w of heroWidths) {
      const output = join(assetsDir, `hero-${w}w.webp`);
      await sharp(heroInput)
        .resize(w, null, { withoutEnlargement: true })
        .webp({ quality, effort: 6 })
        .toFile(output);
      const s = await stat(output);
      console.log(`OK hero-${w}w.webp (${(s.size / 1024).toFixed(0)} KB)`);
    }
  } catch {
    console.log(`Hero file ${heroFile} not found, skipping responsive variants`);
  }

  console.log(`\nDone! Converted ${converted} images.`);
  console.log(`Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB\n`);
}

convertImages().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
