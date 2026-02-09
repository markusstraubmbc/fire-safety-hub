import sharp from 'sharp';
import path from 'path';

async function checkImages() {
    const images = [
        'public/logo.png',
        'public/favicon.png',
        'src/assets/logo.png'
    ];

    for (const img of images) {
        try {
            const metadata = await sharp(path.resolve(img)).metadata();
            console.log(`${img}: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);
        } catch (err) {
            console.error(`Error reading ${img}:`, err.message);
        }
    }
}

checkImages();
