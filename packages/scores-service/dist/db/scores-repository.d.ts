import type { ScoreRequest, LeaderboardEntry, PuzzleDifficulty } from '@init-sudoku-post3/contracts';
/**
 * Inserts a new score record into the database.
 * Accepts either a fully typed ScoreRequest or a loosely typed object with string difficulty.
 */
export declare function insertScore(score: ScoreRequest | {
    playerName: string;
    difficulty: string;
    timeToSolve: number;
}): string;
/**
 * Retrieves the top 10 scores for a given difficulty, ordered by timeToSolve ascending.
 * @param difficulty The difficulty level to query.
 * @returns An array of leaderboard entries.
 */
export declare function getTopScores(difficulty: PuzzleDifficulty): LeaderboardEntry[];
