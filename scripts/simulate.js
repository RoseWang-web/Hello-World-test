// ES module simulation script: import dist files and simulate marking found for 'keys' at 'class'
import fs from 'fs/promises';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LostAndFound } from '../dist/lostAndFound.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async function(){
  const distDataPath = path.join(__dirname, '..', 'dist', 'data.json');
  const srcDataPath = path.join(__dirname, '..', 'src', 'data.json');

  let distObj;
  try {
    const raw = await fs.readFile(distDataPath, 'utf8');
    distObj = JSON.parse(raw);
  } catch (e) {
    distObj = { items: [] };
  }

  const items = distObj.items || [];
  const store = new LostAndFound(items);

  // simulate markFound
  store.markFound('keys', 'class');

  const content = JSON.stringify({ items: store.getItems() }, null, 2);

  // write to dist
  await fs.writeFile(distDataPath, content, 'utf8');
  // write to src
  try {
    await fs.writeFile(srcDataPath, content, 'utf8');
    console.log('Wrote to src/data.json');
  } catch (e) {
    console.error('Could not write src/data.json', e?.message ?? e);
  }

  console.log('Simulation done.');
})();