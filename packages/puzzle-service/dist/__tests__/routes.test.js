"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const app = (0, index_1.createApp)();
describe('Puzzle Service Routes', () => {
    test('GET /puzzle returns a board for each difficulty', async () => {
        const difficulties = ['easy', 'medium', 'hard'];
        for (const diff of difficulties) {
            const response = await (0, supertest_1.default)(app).get('/puzzle').query({ difficulty: diff });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('board');
            const board = response.body.board;
            expect(board).toHaveLength(9);
            board.forEach((row) => expect(row).toHaveLength(9));
        }
    });
    test('GET /puzzle with invalid difficulty returns 400', async () => {
        const response = await (0, supertest_1.default)(app).get('/puzzle').query({ difficulty: 'invalid' });
        expect(response.status).toBe(400);
    });
    test('POST /validate returns correct true for a solved board', async () => {
        // Use generator to produce a full solved board
        const { generateFullBoard } = await Promise.resolve().then(() => __importStar(require('../utils/sudoku')));
        const solved = generateFullBoard();
        const response = await (0, supertest_1.default)(app).post('/validate').send({ board: solved });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('correct', true);
    });
    test('POST /validate returns correct false for an invalid board', async () => {
        const { generateFullBoard } = await Promise.resolve().then(() => __importStar(require('../utils/sudoku')));
        const solved = generateFullBoard();
        // corrupt the board
        solved[0][0] = 0;
        const response = await (0, supertest_1.default)(app).post('/validate').send({ board: solved });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('correct', false);
    });
});
//# sourceMappingURL=routes.test.js.map