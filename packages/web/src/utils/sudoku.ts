/**
 * General Sudoku utility functions used by the web client.
 * These helpers are intentionally lightweight and do not attempt to solve puzzles.
 */

/**
 * Creates a new empty 9x9 Sudoku board (filled with zeros).
 */
export const createEmptyBoard = (): number[][] =>
  Array.from({ length: 9 }, () => Array(9).fill(0));

/**
 * Returns a deep copy of the given board.
 */
export const copyBoard = (board: number[][]): number[][] => board.map((row) => row.slice());

/**
 * Checks whether the board is completely filled (no zeros).
 */
export const isBoardComplete = (board: number[][]): boolean =>
  board.every((row) => row.every((cell) => cell !== 0));

/**
 * Validates that each row, column, and 3x3 subgrid contains the numbers 1‑9 exactly once.
 * Returns true if the board is a valid solved Sudoku board.
 */
export const isBoardValid = (board: number[][]): boolean => {
  const checkGroup = (group: number[]): boolean => {
    const seen = new Set<number>();
    for (const val of group) {
      if (val < 1 || val > 9) return false;
      if (seen.has(val)) return false;
      seen.add(val);
    }
    return true;
  };

  // Rows
  for (let r = 0; r < 9; r++) {
    if (!checkGroup(board[r])) return false;
  }
  // Columns
  for (let c = 0; c < 9; c++) {
    const col = board.map((row) => row[c]);
    if (!checkGroup(col)) return false;
  }
  // Subgrids
  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const subgrid: number[] = [];
      for (let r = br * 3; r < br * 3 + 3; r++) {
        for (let c = bc * 3; c < bc * 3 + 3; c++) {
          subgrid.push(board[r][c]);
        }
      }
      if (!checkGroup(subgrid)) return false;
    }
  }
  return true;
};
