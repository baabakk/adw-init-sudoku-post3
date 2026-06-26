import { PuzzleDifficulty, PuzzleResponse, ValidateResponse } from '@init-sudoku-post3/contracts';
import { apiPost, apiGet } from '../utils/api';

/**
 * Hook providing functions to interact with the Puzzle Service.
 */
export const usePuzzleService = () => {
  const fetchPuzzle = async (difficulty: PuzzleDifficulty): Promise<PuzzleResponse> => {
    const response = await apiGet<PuzzleResponse>(`/puzzle?difficulty=${difficulty}`);
    return response;
  };

  const validateBoard = async (board: number[][]): Promise<ValidateResponse> => {
    const response = await apiPost<ValidateResponse>('/validate', { board });
    return response;
  };

  return { fetchPuzzle, validateBoard };
};
