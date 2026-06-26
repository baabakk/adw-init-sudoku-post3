import { SudokuBoard } from '@init-sudoku-post3/contracts';
/** Validate a fully filled board (or partially filled with zeros) */
export declare function isValidBoard(board: SudokuBoard): boolean;
/** Generate a completely solved Sudoku board. */
export declare function generateFullBoard(): SudokuBoard;
/** Count the number of possible solutions for a given board up to `max` (default Infinity). */
export declare function countSolutions(board: SudokuBoard, max?: number): number;
/** Deep copy a Sudoku board */
export declare function cloneBoard(board: SudokuBoard): SudokuBoard;
/** Count filled cells (non‑zero) */
export declare function filledCellCount(board: SudokuBoard): number;
