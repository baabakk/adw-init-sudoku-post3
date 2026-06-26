import type { PuzzleDifficulty, PuzzleResponse, ValidateResponse } from '@init-sudoku-post3/contracts';
/**
 * Service for interacting with the Puzzle Service API.
 */
export declare const puzzleService: {
    /**
     * Fetch a new puzzle board for the given difficulty.
     */
    fetchPuzzle(difficulty: PuzzleDifficulty): Promise<PuzzleResponse>;
    /**
     * Validate the completed board on the server.
     */
    validateBoard(board: number[][]): Promise<ValidateResponse>;
};
