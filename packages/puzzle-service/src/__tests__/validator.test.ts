import { validateSolution } from '../validator';
import { generateFullBoard } from '../utils/sudoku';

describe('Validator', () => {
  test('accepts a correct solved board', () => {
    const solved = generateFullBoard();
    const result = validateSolution(solved);
    expect(result).toBe(true);
  });

  test('rejects a board with duplicate in a row', () => {
    const solved = generateFullBoard();
    // Introduce duplicate in first row
    solved[0][1] = solved[0][0];
    const result = validateSolution(solved);
    expect(result).toBe(false);
  });

  test('rejects a board with zeros (incomplete)', () => {
    const solved = generateFullBoard();
    solved[0][0] = 0;
    const result = validateSolution(solved);
    expect(result).toBe(false);
  });
});
