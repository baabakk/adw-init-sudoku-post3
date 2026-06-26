import Database from 'better-sqlite3';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';

// Ensure a data directory exists at the repository root.
const dataDir = path.resolve(__dirname, '../../../data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'scores.db');

// Initialize the SQLite database connection.
export const db = new Database(dbPath);

// Create the scores table if it does not exist.
export function initDatabase(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS scores (
      id TEXT PRIMARY KEY,
      playerName TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      timeToSolve REAL NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);
}

// Run initialization on module load.
initDatabase();

export default db;
