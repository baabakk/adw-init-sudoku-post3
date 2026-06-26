import { PuzzleDifficulty, PuzzleResponse, ValidateResponse, ScoreRequest, ScoreResponse, LeaderboardResponse } from '@init-sudoku-post3/contracts';
export type { PuzzleDifficulty, PuzzleResponse, ValidateResponse, ScoreRequest, ScoreResponse, LeaderboardResponse };
/**
 * Represents the current game state within the client.
 */
export interface GameState {
    /** Current board values (0 for empty cells). */
    board: number[][];
    /** Difficulty of the current puzzle. */
    difficulty: PuzzleDifficulty;
    /** Seconds elapsed since the game started. */
    elapsed: number;
    /** Whether the game is currently being solved (true) or finished. */
    inProgress: boolean;
}
