import type { ScoreRequest, ScoreResponse, LeaderboardResponse, PuzzleDifficulty } from '@init-sudoku-post3/contracts';

/**
 * Service for interacting with the Scores Service API.
 */
export const scoresService = {
  /**
   * Post a completed game score.
   */
  async postScore(payload: ScoreRequest): Promise<ScoreResponse> {
    const response = await fetch('/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Failed to post score: ${response.status}`);
    }
    const data = (await response.json()) as ScoreResponse;
    return data;
  },

  /**
   * Fetch the leaderboard for a given difficulty.
   */
  async fetchLeaderboard(difficulty: PuzzleDifficulty): Promise<LeaderboardResponse> {
    const query = new URLSearchParams({ difficulty } as Record<string, string>).toString();
    const response = await fetch(`/leaderboard?${query}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch leaderboard: ${response.status}`);
    }
    const data = (await response.json()) as LeaderboardResponse;
    return data;
  },
};
