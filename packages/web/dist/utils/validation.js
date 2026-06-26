/**
 * Client‑side Sudoku validation utilities.
 * These functions are deliberately simple and do not attempt to solve the puzzle;
 * they only enforce the basic Sudoku constraints for a single move.
 */
/**
 * Checks whether placing `value` at (`row`, `col`) respects Sudoku rules.
 * Returns `true` if the move is valid, `false` otherwise.
 */
export const isValidMove = (board, row, col, value) => {
    if (value < 1 || value > 9)
        return false;
    // Row check
    for (let c = 0; c < 9; c++) {
        if (c !== col && board[row][c] === value)
            return false;
    }
    // Column check
    for (let r = 0; r < 9; r++) {
        if (r !== row && board[r][col] === value)
            return false;
    }
    // Subgrid check
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if ((r !== row || c !== col) && board[r][c] === value)
                return false;
        }
    }
    return true;
};
