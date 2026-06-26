import { PuzzleDifficulty, PuzzleResponse, ValidateResponse } from '@init-sudoku-post3/contracts';
/**
 * Hook providing functions to interact with the Puzzle Service.
 */
export declare const usePuzzleService: () => {
    fetchPuzzle: (difficulty: PuzzleDifficulty) => Promise<PuzzleResponse>;
    validateBoard: (board: number[][]) => Promise<ValidateResponse>;
};
