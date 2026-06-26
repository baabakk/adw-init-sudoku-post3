import { SudokuBoard, PuzzleDifficulty } from '@init-sudoku-post3/contracts';
import { generateFullBoard, cloneBoard, countSolutions, filledCellCount } from './utils/sudoku';

/**
 * Desired number of filled cells for each difficulty level.
 * These numbers are typical for Sudoku puzzles ensuring increasing difficulty.
 */
const difficultyFilledMap: Record<PuzzleDifficulty, number> = {
  easy: 36, // ~36 clues
  medium: 32,
  hard: 28,
};

/**
 * Generate a Sudoku puzzle board with a unique solution.
 * The algorithm:
 *   1. Generate a full solved board.
 *   2. Create a shuffled list of cell positions.
 *   3. Iteratively remove numbers while maintaining a unique solution.
 *   4. Stop when the number of filled cells reaches the target for the difficulty.
 */
export function generatePuzzle(difficulty: PuzzleDifficulty): SudokuBoard {
  const targetFilled = difficultyFilledMap[difficulty];
  const fullBoard = generateFullBoard();
  const puzzle = cloneBoard(fullBoard);

  // List of all cell coordinates
  const cells: [number, number][] = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      cells.push([r, c]);
    }
  }
  // Shuffle cells to randomize removal order
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  for (const [row, col] of cells) {
    const backup = puzzle[row][col];
    puzzle[row][col] = 0; // remove
    // If removal leads to multiple solutions, revert
    const solutions = countSolutions(puzzle, 2);
    if (solutions !== 1) {
      puzzle[row][col] = backup; // revert removal
    }
    // Stop if we have reached the desired difficulty (i.e., enough clues remain)
    if (filledCellCount(puzzle) <= targetFilled) {
      break;
    }
  }

  return puzzle;
}
