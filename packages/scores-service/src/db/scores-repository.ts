import { db } from './database';
import { v4 as uuidv4 } from 'uuid';
import type { ScoreRequest, LeaderboardEntry, PuzzleDifficulty } from '@init-sudoku-post3/contracts';

/**
 * Inserts a new score record into the database.
 * Accepts either a fully typed ScoreRequest or a loosely typed object with string difficulty.
 */
export function insertScore(score: ScoreRequest | { playerName: string; difficulty: string; timeToSolve: number }): string {
  // Cast to ScoreRequest after runtime validation (basic)
  const validatedScore: ScoreRequest = {
    playerName: score.playerName,
    difficulty: score.difficulty as PuzzleDifficulty,
    timeToSolve: score.timeToSolve,
  };

  const id = uuidv4();
  const stmt = db.prepare(
    `INSERT INTO scores (id, playerName, difficulty, timeToSolve, createdAt)
     VALUES (@id, @playerName, @difficulty, @timeToSolve, @createdAt)`
  );
  stmt.run({
    id,
    playerName: validatedScore.playerName,
    difficulty: validatedScore.difficulty,
    timeToSolve: validatedScore.timeToSolve,
    createdAt: new Date().toISOString(),
  });
  return id;
}

/**
 * Retrieves the top 10 scores for a given difficulty, ordered by timeToSolve ascending.
 * @param difficulty The difficulty level to query.
 * @returns An array of leaderboard entries.
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
