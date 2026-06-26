/**
 * Types representing the Sudoku game state.
 */

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Board = number[][]; // 9x9 grid, 0 indicates empty cell

export interface GameState {
  board: Board;
  difficulty: Difficulty;
  elapsed: number; // seconds
  inProgress: boolean;
  leaderboard: { playerName: string; timeToSolve: number }[];
}
