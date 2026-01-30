import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetsDir = join(__dirname, '..', 'src', 'assets');
const quality = 85;

async function convertImages() {
  console.log('🔄 Starting WebP conversion...\n');

  try {
    const files = await readdir(assetsDir);
    const pngFiles = files.filter(f => f.endsWith('.png') && f.startsWith('showcase-'));

    let totalSaved = 0;

    for (const file of pngFiles) {
      const input = join(assetsDir, file);
      const output = input.replace('.png', '.webp');

      // Get original file size
      const originalStats = await stat(input);
      const originalSize = originalStats.size;

      // Convert to WebP
      await sharp(input)
        .webp({ quality, effort: 6 })
        .toFile(output);

      // Get new file size
      const newStats = await stat(output);
      const newSize = newStats.size;
      const saved = originalSize - newSize;
      const percentage = ((saved / originalSize) * 100).toFixed(1);

      totalSaved += saved;

      console.log(`✓ ${file}`);
      console.log(`  ${(originalSize / 1024).toFixed(1)} KB → ${(newSize / 1024).toFixed(1)} KB (${percentage}% kleiner)\n`);
    }

    console.log(`\n🎉 Conversion complete!`);
    console.log(`📊 Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB\n`);
  } catch (error) {
    console.error('❌ Error during conversion:', error);
    process.exit(1);
  }
}

convertImages();
