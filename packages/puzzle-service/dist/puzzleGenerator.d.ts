import { SudokuBoard, PuzzleDifficulty } from '@init-sudoku-post3/contracts';
/**
 * Generate a Sudoku puzzle board with a unique solution.
 * The algorithm:
 *   1. Generate a full solved board.
 *   2. Create a shuffled list of cell positions.
 *   3. Iteratively remove numbers while maintaining a unique solution.
 *   4. Stop when the number of filled cells reaches the target for the difficulty.
 */
export declare function generatePuzzle(difficulty: PuzzleDifficulty): SudokuBoard;
