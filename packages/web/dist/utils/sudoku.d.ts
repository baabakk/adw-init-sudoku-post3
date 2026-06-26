/**
 * General Sudoku utility functions used by the web client.
 * These helpers are intentionally lightweight and do not attempt to solve puzzles.
 */
/**
 * Creates a new empty 9x9 Sudoku board (filled with zeros).
 */
export declare const createEmptyBoard: () => number[][];
/**
 * Returns a deep copy of the given board.
 */
export declare const copyBoard: (board: number[][]) => number[][];
/**
 * Checks whether the board is completely filled (no zeros).
 */
export declare const isBoardComplete: (board: number[][]) => boolean;
/**
 * Validates that each row, column, and 3x3 subgrid contains the numbers 1‑9 exactly once.
 * Returns true if the board is a valid solved Sudoku board.
 */
export declare const isBoardValid: (board: number[][]) => boolean;
