import fs from "fs/promises";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { LostAndFound } from "./lostAndFound.js";
import type { Item } from "./lostAndFound.js";
import { fileURLToPath } from "url";
import path from "path";

// The data file next to the running module (when compiled this is dist/data.json,
// when running with ts-node this is src/data.json). Keep as a URL so fs can read it directly.
const DATA_PATH = new URL('./data.json', import.meta.url);

// Also compute the repository source data path (src/data.json). When running from
// dist this resolves to ../src/data.json (dist/../src/data.json -> project/src/data.json).
const SRC_DATA_PATH = fileURLToPath(new URL('../src/data.json', import.meta.url));

async function loadData(): Promise<Item[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    const obj = JSON.parse(raw);
    return obj.items ?? [];
  } catch {
    return [];
  }
}

async function saveData(items: Item[]) {
  const content = JSON.stringify({ items }, null, 2);
  // Write to the data file next to the running module (this is where the app reads from)
  await fs.writeFile(DATA_PATH, content, "utf8");
  // Also attempt to persist back to the project's source file so changes survive builds
  try {
    await fs.writeFile(SRC_DATA_PATH, content, "utf8");
  } catch (err: any) {
    // Non-fatal: log a warning so developer knows src wasn't updated
    console.warn("Warning: could not write src/data.json:", err?.message ?? err);
  }
}

async function main() {
  const rl = readline.createInterface({ input, output });
  try {
    const items = await loadData();
    const store = new LostAndFound(items);

    const name = (await rl.question("What item did you lose? ")).trim();
    if (!name) {
      console.log("No item provided. Exiting.");
      return;
    }

    const suggestions = store.findSuggestions(name);
    console.log("Possible locations:", suggestions.join(", "));
    const found = (await rl.question("Did you find it? (yes/no) ")).trim().toLowerCase();

    if (found === "yes" || found === "y") {
      const loc = (await rl.question("Where did you find it? ")).trim();
      if (loc) {
        store.markFound(name, loc);
        await saveData(store.getItems());
        console.log("Thanks — updated locations.");
      } else {
        console.log("No location entered.");
      }
    } else {
      console.log("No Way! Try harder at:", suggestions.join(", "));
    }
  } catch (err: any) {
    console.error("Error:", err?.message ?? err);
  } finally {
    rl.close();
  }
}

// run when executed directly
if (process.argv[1] === fileURLToPath(import.meta.url) || process.argv.includes("--run")) {
    main();
}