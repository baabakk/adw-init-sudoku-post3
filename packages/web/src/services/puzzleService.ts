import type { PuzzleDifficulty, PuzzleRequest, PuzzleResponse, ValidateRequest, ValidateResponse } from '@init-sudoku-post3/contracts';

/**
 * Service for interacting with the Puzzle Service API.
 */
export const puzzleService = {
  /**
   * Fetch a new puzzle board for the given difficulty.
   */
  async fetchPuzzle(difficulty: PuzzleDifficulty): Promise<PuzzleResponse> {
    const req: PuzzleRequest = { difficulty };
    const query = new URLSearchParams({ difficulty } as Record<string, string>).toString();
    const response = await fetch(`/puzzle?${query}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch puzzle: ${response.status}`);
    }
    const data = (await response.json()) as PuzzleResponse;
    return data;
  },

  /**
   * Validate the completed board on the server.
   */
  async validateBoard(board: number[][]): Promise<ValidateResponse> {
    const payload: ValidateRequest = { board };
    const response = await fetch('/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Failed to validate board: ${response.status}`);
    }
    const data = (await response.json()) as ValidateResponse;
    return data;
  },
};
