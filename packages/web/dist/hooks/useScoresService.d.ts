import { ScoreRequest, ScoreResponse, LeaderboardResponse } from '@init-sudoku-post3/contracts';
/**
 * Hook providing functions to interact with the Scores Service.
 */
export declare const useScoresService: () => {
    postScore: (payload: ScoreRequest) => Promise<ScoreResponse>;
    fetchLeaderboard: (difficulty: string) => Promise<LeaderboardResponse>;
};
