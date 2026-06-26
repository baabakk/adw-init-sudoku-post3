"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.initDatabase = initDatabase;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
// Ensure a data directory exists at the repository root.
const dataDir = path_1.default.resolve(__dirname, '../../../data');
if (!(0, fs_1.existsSync)(dataDir)) {
    (0, fs_1.mkdirSync)(dataDir, { recursive: true });
}
const dbPath = path_1.default.join(dataDir, 'scores.db');
// Initialize the SQLite database connection.
exports.db = new better_sqlite3_1.default(dbPath);
// Create the scores table if it does not exist.
function initDatabase() {
    exports.db.exec(`
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
exports.default = exports.db;
