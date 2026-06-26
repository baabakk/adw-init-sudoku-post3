"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../validator");
const sudoku_1 = require("../utils/sudoku");
describe('Validator', () => {
    test('accepts a correct solved board', () => {
        const solved = (0, sudoku_1.generateFullBoard)();
        const result = (0, validator_1.validateSolution)(solved);
        expect(result).toBe(true);
    });
    test('rejects a board with duplicate in a row', () => {
        const solved = (0, sudoku_1.generateFullBoard)();
        // Introduce duplicate in first row
        solved[0][1] = solved[0][0];
        const result = (0, validator_1.validateSolution)(solved);
        expect(result).toBe(false);
    });
    test('rejects a board with zeros (incomplete)', () => {
        const solved = (0, sudoku_1.generateFullBoard)();
        solved[0][0] = 0;
        const result = (0, validator_1.validateSolution)(solved);
        expect(result).toBe(false);
    });
});
//# sourceMappingURL=validator.test.js.map