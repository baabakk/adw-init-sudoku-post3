import type { ScoreRequest, LeaderboardEntry, PuzzleDifficulty } from '@init-sudoku-post3/contracts';
/**
 * Inserts a new score record into the database.
 * @param score The score data to insert.
 * @returns The generated id of the inserted record.
 */
export declare function insertScore(score: ScoreRequest): string;
/**
 * Retrieves the top 10 scores for a given difficulty, ordered by timeToSolve ascending.
 * @param difficulty The difficulty level to query.
 * @returns An array of leaderboard entries.
 */
export declare function getTopScores(difficulty: PuzzleDifficulty): LeaderboardEntry[];
