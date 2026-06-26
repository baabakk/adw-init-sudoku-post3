import { generatePuzzle } from '../puzzleGenerator';
import { countSolutions, filledCellCount } from '../utils/sudoku';
import { PuzzleDifficulty } from '@init-sudoku-post3/contracts';

/** Helper to map difficulty to expected minimum filled cells (clues) */
const difficultyMinFilled: Record<PuzzleDifficulty, number> = {
  easy: 36,
  medium: 32,
  hard: 28,
};

describe('Puzzle Generator', () => {
  const difficulties: PuzzleDifficulty[] = ['easy', 'medium', 'hard'];

  test.each(difficulties)('generates a uniquely solvable %s puzzle', (difficulty) => {
    const board = generatePuzzle(difficulty);
    // Ensure board dimensions
    expect(board).toHaveLength(9);
    board.forEach((row) => expect(row).toHaveLength(9));

    // Count filled cells should be >= target (since we stop when <= target, but may be slightly higher due to early break)
    const filled = filledCellCount(board);
    expect(filled).toBeGreaterThanOrEqual(difficultyMinFilled[difficulty]);

    // Verify unique solution
    const solutions = countSolutions(board, 2);
    expect(solutions).toBe(1);
  });
});
