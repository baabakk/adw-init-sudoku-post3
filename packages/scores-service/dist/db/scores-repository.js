"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertScore = insertScore;
exports.getTopScores = getTopScores;
const database_1 = require("./database");
const uuid_1 = require("uuid");
/**
 * Inserts a new score record into the database.
 * @param score The score data to insert.
 * @returns The generated id of the inserted record.
 */
function insertScore(score) {
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
 * Retrieves the top 10 scores for a given difficulty, ordered by timeToSolve ascending.
 * @param difficulty The difficulty level to query.
 * @returns An array of leaderboard entries.
 */
function getTopScores(difficulty) {
    const stmt = database_1.db.prepare(`SELECT playerName, timeToSolve FROM scores
     WHERE difficulty = ?
     ORDER BY timeToSolve ASC, createdAt ASC
     LIMIT 10`);
    const rows = stmt.all(difficulty);
    return rows.map((row) => ({ playerName: row.playerName, timeToSolve: row.timeToSolve }));
}
