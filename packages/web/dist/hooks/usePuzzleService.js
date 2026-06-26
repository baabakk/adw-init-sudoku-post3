import { apiPost, apiGet } from '../utils/api';
/**
 * Hook providing functions to interact with the Puzzle Service.
 */
export const usePuzzleService = () => {
    const fetchPuzzle = async (difficulty) => {
        const response = await apiGet(`/puzzle?difficulty=${difficulty}`);
        return response;
    };
    const validateBoard = async (board) => {
        const response = await apiPost('/validate', { board });
        return response;
    };
    return { fetchPuzzle, validateBoard };
};
