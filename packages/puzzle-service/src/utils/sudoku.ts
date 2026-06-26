import { SudokuBoard } from '@init-sudoku-post3/contracts';

/** Shuffle an array in place using Fisher-Yates */
function shuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/** Check if placing `num` at (row, col) is valid according to Sudoku rules */
function isPlacementValid(board: SudokuBoard, row: number, col: number, num: number): boolean {
  // Row check
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === num) return false;
  }
  // Column check
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false;
  }
  // 3x3 subgrid check
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}

/** Validate a fully filled board (or partially filled with zeros) */
export function isValidBoard(board: SudokuBoard): boolean {
  for (let row = 0; row < 9; row++) {
    const seenRow = new Set<number>();
    for (let col = 0; col < 9; col++) {
      const val = board[row][col];
      if (val === 0) continue;
      if (val < 1 || val > 9) return false;
      if (seenRow.has(val)) return false;
      seenRow.add(val);
    }
  }
  for (let col = 0; col < 9; col++) {
    const seenCol = new Set<number>();
    for (let row = 0; row < 9; row++) {
      const val = board[row][col];
      if (val === 0) continue;
      if (seenCol.has(val)) return false;
      seenCol.add(val);
    }
  }
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seenBox = new Set<number>();
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const val = board[boxRow * 3 + r][boxCol * 3 + c];
          if (val === 0) continue;
          if (seenBox.has(val)) return false;
          seenBox.add(val);
        }
      }
    }
  }
  return true;
}

/** Solve the board using backtracking. Returns true if a solution is found and mutates the board. */
function solveBoard(board: SudokuBoard): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffle(numbers);
        for (const num of numbers) {
          if (isPlacementValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false; // No valid number leads to solution
      }
    }
  }
  return true; // No empty cells -> solved
}

/** Generate a completely solved Sudoku board. */
export function generateFullBoard(): SudokuBoard {
  const board: SudokuBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
  const success = solveBoard(board);
  if (!success) throw new Error('Failed to generate a full Sudoku board');
  return board;
}

/** Count the number of possible solutions for a given board up to `max` (default Infinity). */
export function countSolutions(board: SudokuBoard, max = Infinity): number {
  let count = 0;
  const copy: SudokuBoard = board.map(row => row.slice());

  function backtrack(): void {
    if (count >= max) return;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (copy[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isPlacementValid(copy, row, col, num)) {
              copy[row][col] = num;
              backtrack();
              copy[row][col] = 0;
            }
          }
          return; // backtrack to previous cell
        }
      }
    }
    // No empty cells -> found a solution
    count++;
  }

  backtrack();
  return count;
}

/** Deep copy a Sudoku board */
export function cloneBoard(board: SudokuBoard): SudokuBoard {
  return board.map(row => row.slice());
}

/** Count filled cells (non‑zero) */
export function filledCellCount(board: SudokuBoard): number {
  return board.reduce((sum, row) => sum + row.filter(v => v !== 0).length, 0);
}
