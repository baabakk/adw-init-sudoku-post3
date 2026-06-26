import {
  ScoreRequest,
  ScoreResponse,
  LeaderboardResponse,
} from '@init-sudoku-post3/contracts';
import { apiPost, apiGet } from '../utils/api.js';

/**
 * Hook providing functions to interact with the Scores Service.
 */
export const useScoresService = () => {
  const postScore = async (payload: ScoreRequest): Promise<ScoreResponse> => {
    const response = await apiPost<ScoreResponse>('/scores', payload);
    return response;
  };

  const fetchLeaderboard = async (difficulty: string): Promise<LeaderboardResponse> => {
    const response = await apiGet<LeaderboardResponse>(`/leaderboard?difficulty=${difficulty}`);
    return response;
  };

  return { postScore, fetchLeaderboard };
};
