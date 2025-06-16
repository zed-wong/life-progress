import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const sourceIcon = path.join(process.cwd(), 'static', 'icon.png');
const outputDir = path.join(process.cwd(), 'static', 'icons');

async function generateIcons() {
  try {
    // Create icons directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });

    // Generate 192x192 icon
    await sharp(sourceIcon)
      .resize(192, 192)
      .toFile(path.join(outputDir, 'icon-192x192.png'));

    // Generate 512x512 icon
    await sharp(sourceIcon)
      .resize(512, 512)
      .toFile(path.join(outputDir, 'icon-512x512.png'));

    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons(); 