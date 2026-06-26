import { v4 as uuidv4 } from 'uuid';
import type { ScoreRequest, LeaderboardEntry, PuzzleDifficulty } from '@init-sudoku-post3/contracts';
import { db } from './db/database';

/**
 * In-memory fallback storage for scores. For this phase we use a simple SQLite DB,
 * but expose the same API as an in‑memory store would.
 */

/**
 * Adds a new score and returns its generated id.
 */
export function addScore(score: ScoreRequest): string {
  const id = uuidv4();
  const stmt = db.prepare(
    `INSERT INTO scores (id, playerName, difficulty, timeToSolve, createdAt)
     VALUES (@id, @playerName, @difficulty, @timeToSolve, @createdAt)`
  );
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
export function getTopScores(difficulty: PuzzleDifficulty): LeaderboardEntry[] {
  const stmt = db.prepare(
    `SELECT playerName, timeToSolve FROM scores
     WHERE difficulty = ?
     ORDER BY timeToSolve ASC, createdAt ASC
     LIMIT 10`
  );
  const rows = stmt.all(difficulty) as Array<{ playerName: string; timeToSolve: number }>;
  return rows.map((row) => ({ playerName: row.playerName, timeToSolve: row.timeToSolve }));
}
