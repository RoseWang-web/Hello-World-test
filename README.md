# Lost And Found Game

This repository contains a small TypeScript command-line application: a "Lost and Found" helper. It suggests likely locations for lost items using historical data and lets users report where they found an item. Reported findings update stored location frequencies so future suggestions improve.

## Instructions for Build and Use

Steps to build and/or run the software (Windows PowerShell examples):

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Development (recommended): run with ts-node so the app reads/writes `src/data.json` directly:

   ```powershell
   npm run dev
   ```

3. Production / built run:

   ```powershell
   npm run build
   npm run start
   ```

CLI interaction flow (when running):

- The app asks: "What item did you lose?"
- It prints suggested locations (based on historical frequencies from `data.json`).
- It asks: "Did you find it? (yes/no)"
- If you answer yes, it will ask: "Where did you find it?" and then update the data file.

Important note on data persistence:

- When running the compiled code (`node dist/index.js`), the program resolves `./data.json` relative to the running module and will therefore read/write `dist/data.json`.
- For convenience during development, the application also attempts to write back to `src/data.json` so the source data file stays in sync (this requires write permission).
- To avoid accidental changes to `src/data.json`, prefer `npm run dev` while developing.

## Development Environment 

To recreate the development environment, install the following:

- Node.js (v16+ recommended)
- npm (bundled with Node.js)
- TypeScript (installed via `npm install` as a dev dependency)

Key dev scripts in `package.json`:

- `build`: compile TypeScript to `dist/`
- `start`: build then run compiled `dist/index.js`
- `dev`: run `ts-node` against `src/index.ts` for interactive development
- `test`: run unit tests (configured for Jest/ts-jest; tests currently use a Vitest-like API)

## Useful Websites to Learn More

- Node.js: https://nodejs.org/
- TypeScript: https://www.typescriptlang.org/
- Jest: https://jestjs.io/
- Vitest: https://vitest.dev/

## Future Work

The following items I plan to fix, improve, and/or add to this project in the future:

* [add more text to print ] 
* [do some math thing ] 
* [ create an array]