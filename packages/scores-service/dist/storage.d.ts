import type { ScoreRequest, LeaderboardEntry, PuzzleDifficulty } from '@init-sudoku-post3/contracts';
/**
 * In-memory fallback storage for scores. For this phase we use a simple SQLite DB,
 * but expose the same API as an in‑memory store would.
 */
/**
 * Adds a new score and returns its generated id.
 */
export declare function addScore(score: ScoreRequest): string;
/**
 * Retrieves the top 10 leaderboard entries for a given difficulty.
 */
export declare function getTopScores(difficulty: PuzzleDifficulty): LeaderboardEntry[];
