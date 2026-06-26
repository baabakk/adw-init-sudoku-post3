"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puzzleGenerator_1 = require("../puzzleGenerator");
const sudoku_1 = require("../utils/sudoku");
/** Helper to map difficulty to expected maximum filled cells (minimum clues) */
const difficultyMinFilled = {
    easy: 36,
    medium: 32,
    hard: 28,
};
describe('Puzzle Generator', () => {
    const difficulties = ['easy', 'medium', 'hard'];
    test.each(difficulties)('generates a uniquely solvable %s puzzle', (difficulty) => {
        const board = (0, puzzleGenerator_1.generatePuzzle)(difficulty);
        // Ensure board dimensions
        expect(board).toHaveLength(9);
        board.forEach((row) => expect(row).toHaveLength(9));
        // Count filled cells should be >= target (since we stop when <= target, but may be slightly higher due to early break)
        const filled = (0, sudoku_1.filledCellCount)(board);
        expect(filled).toBeGreaterThanOrEqual(difficultyMinFilled[difficulty]);
        // Verify unique solution
        const solutions = (0, sudoku_1.countSolutions)(board, 2);
        expect(solutions).toBe(1);
    });
});
//# sourceMappingURL=puzzleGenerator.test.js.map