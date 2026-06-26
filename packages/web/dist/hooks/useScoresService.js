import { apiPost, apiGet } from '../utils/api';
/**
 * Hook providing functions to interact with the Scores Service.
 */
export const useScoresService = () => {
    const postScore = async (payload) => {
        const response = await apiPost('/scores', payload);
        return response;
    };
    const fetchLeaderboard = async (difficulty) => {
        const response = await apiGet(`/leaderboard?difficulty=${difficulty}`);
        return response;
    };
    return { postScore, fetchLeaderboard };
};
