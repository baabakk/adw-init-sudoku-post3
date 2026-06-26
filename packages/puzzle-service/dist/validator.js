"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSolution = validateSolution;
const sudoku_1 = require("./utils/sudoku");
/**
 * Validate that a submitted Sudoku board is a correct solution.
 * Returns true if the board is completely filled (no zeros) and satisfies all Sudoku constraints.
 */
function validateSolution(board) {
    // Ensure board is 9x9 and fully filled
    if (board.length !== 9)
        return false;
    for (const row of board) {
        if (!Array.isArray(row) || row.length !== 9)
            return false;
        for (const cell of row) {
            if (cell === 0)
                return false; // incomplete
        }
    }
    // Use generic validation (no duplicates, values 1-9)
    return (0, sudoku_1.isValidBoard)(board);
}
//# sourceMappingURL=validator.js.map