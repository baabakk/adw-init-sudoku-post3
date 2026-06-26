/**
 * Shared contract types for the Sudoku platform.
 * All services and the web client import these types to ensure type‑safe HTTP communication.
 * The file is compiled with `strict` enabled.
 */

/**
 * Difficulty levels supported by the puzzle generator and leaderboard.
 */
export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

/**
 * A Sudoku cell value. `0` represents an empty cell; values 1‑9 are the possible digits.
 */
export type SudokuCell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * A 9×9 Sudoku board. The type does not enforce dimensions at compile time, but runtime
 * implementations must provide a 9‑by‑9 array of `SudokuCell` values.
 */
export type Board = SudokuCell[][];

/**
 * Request payload for fetching a puzzle.
 */
export interface PuzzleRequest {
  /** Desired difficulty of the generated puzzle. */
  difficulty: Difficulty;
}

/**
 * Response payload containing a generated puzzle board.
 */
export interface PuzzleResponse {
  /** 9×9 Sudoku board where `0` denotes an empty cell. */
  board: Board;
}

/**
 * Request payload for validating a completed Sudoku board.
 */
export interface ValidateRequest {
  /** The board to validate. Must be a fully‑filled 9×9 grid (no zeros). */
  board: Board;
}

/**
 * Response indicating whether the submitted board is a correct solution.
 */
export interface ValidateResponse {
  /** `true` if the board satisfies Sudoku rules; otherwise `false`. */
  correct: boolean;
}

/**
 * Request payload for recording a completed game score.
 */
export interface ScoreRequest {
  /** Player's display name. */
  playerName: string;
  /** Difficulty of the puzzle that was solved. */
  difficulty: Difficulty;
  /** Time taken to solve the puzzle, in milliseconds. */
  timeToSolve: number;
}

/**
 * Response payload after a score has been persisted.
 */
export interface ScoreResponse {
  /** Identifier of the stored score record. */
  id: string;
}

/**
 * Single entry in a leaderboard.
 */
export interface LeaderboardEntry {
  /** Player's display name. */
  playerName: string;
  /** Time taken to solve the puzzle, in milliseconds. */
  timeToSolve: number;
}

/**
 * Response payload for a leaderboard query.
 */
export interface LeaderboardResponse {
  /** Array of up to ten entries ordered by ascending `timeToSolve`. */
  entries: LeaderboardEntry[];
}

/**
 * Aggregate type exposing all request and response contracts.
 * This can be useful for documentation or generic tooling.
 */
export interface Contracts {
  PuzzleRequest: PuzzleRequest;
  PuzzleResponse: PuzzleResponse;
  ValidateRequest: ValidateRequest;
  ValidateResponse: ValidateResponse;
  ScoreRequest: ScoreRequest;
  ScoreResponse: ScoreResponse;
  LeaderboardResponse: LeaderboardResponse;
}
