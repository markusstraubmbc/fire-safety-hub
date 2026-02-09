import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

async function generateFavicons() {
    const source = path.resolve('public/logo.png');
    const targetDir = path.resolve('public');

    const sizes = [16, 32, 48, 180, 192, 512];

    for (const size of sizes) {
        const fileName = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}x${size}.png`;
        await sharp(source)
            .resize(size, size)
            .toFile(path.join(targetDir, fileName));
        console.log(`Generated ${fileName}`);
    }

    // Also update favicon.ico (not easy with sharp, but we can at least make sure favicon.png is 32x32 or 48x48)
    await sharp(source)
        .resize(48, 48)
        .toFile(path.join(targetDir, 'favicon.png'));
    console.log(`Updated favicon.png to 48x48`);
}

generateFavicons().catch(console.error);
