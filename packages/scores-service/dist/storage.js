"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addScore = addScore;
exports.getTopScores = getTopScores;
const uuid_1 = require("uuid");
const database_1 = require("./db/database");
/**
 * In-memory fallback storage for scores. For this phase we use a simple SQLite DB,
 * but expose the same API as an in‑memory store would.
 */
/**
 * Adds a new score and returns its generated id.
 */
function addScore(score) {
    const id = (0, uuid_1.v4)();
    const stmt = database_1.db.prepare(`INSERT INTO scores (id, playerName, difficulty, timeToSolve, createdAt)
     VALUES (@id, @playerName, @difficulty, @timeToSolve, @createdAt)`);
    stmt.run({
        id,
        playerName: score.playerName,
        difficulty: score.difficulty,
        timeToSolve: score.timeToSolve,
        createdAt: new Date().toISOString(),
    });
    return id;
}
/**
 * Retrieves the top 10 leaderboard entries for a given difficulty.
 */
function getTopScores(difficulty) {
    const stmt = database_1.db.prepare(`SELECT playerName, timeToSolve FROM scores
     WHERE difficulty = ?
     ORDER BY timeToSolve ASC, createdAt ASC
     LIMIT 10`);
    const rows = stmt.all(difficulty);
    return rows.map((row) => ({ playerName: row.playerName, timeToSolve: row.timeToSolve }));
}
