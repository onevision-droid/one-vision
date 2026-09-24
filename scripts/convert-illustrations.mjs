/**
 * Converts all PNG illustrations in public/new-illustrations to WebP.
 * Target: quality 82, effort 6 (good balance of size vs quality).
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = join(__dirname, '..', 'public', 'new-illustrations');

async function convert() {
  const files = await readdir(INPUT_DIR);
  const pngs = files.filter(f => extname(f).toLowerCase() === '.png');

  console.log(`Found ${pngs.length} PNG files to convert…\n`);

  for (const file of pngs) {
    const inputPath = join(INPUT_DIR, file);
    const outputName = basename(file, '.png') + '.webp';
    const outputPath = join(INPUT_DIR, outputName);

    const before = (await stat(inputPath)).size;

    await sharp(inputPath)
      .webp({ quality: 82, effort: 6 })
      .toFile(outputPath);

    const after = (await stat(outputPath)).size;
    const savings = ((1 - after / before) * 100).toFixed(1);

    console.log(
      `  ${file.padEnd(30)} ${(before / 1e6).toFixed(2)} MB  →  ${(after / 1e6).toFixed(2)} MB  (${savings}% smaller)`
    );
  }

  console.log('\nDone. WebP files written to public/new-illustrations/');
}

convert().catch(err => { console.error(err); process.exit(1); });
