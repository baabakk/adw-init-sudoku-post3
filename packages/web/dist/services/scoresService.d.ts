import type { ScoreRequest, ScoreResponse, LeaderboardResponse, PuzzleDifficulty } from '@init-sudoku-post3/contracts';
/**
 * Service for interacting with the Scores Service API.
 */
export declare const scoresService: {
    /**
     * Post a completed game score.
     */
    postScore(payload: ScoreRequest): Promise<ScoreResponse>;
    /**
     * Fetch the leaderboard for a given difficulty.
     */
    fetchLeaderboard(difficulty: PuzzleDifficulty): Promise<LeaderboardResponse>;
};
