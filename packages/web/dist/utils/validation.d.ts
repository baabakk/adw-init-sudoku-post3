/**
 * Client‑side Sudoku validation utilities.
 * These functions are deliberately simple and do not attempt to solve the puzzle;
 * they only enforce the basic Sudoku constraints for a single move.
 */
/**
 * Checks whether placing `value` at (`row`, `col`) respects Sudoku rules.
 * Returns `true` if the move is valid, `false` otherwise.
 */
export declare const isValidMove: (board: number[][], row: number, col: number, value: number) => boolean;
