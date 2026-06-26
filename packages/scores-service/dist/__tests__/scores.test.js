"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const database_1 = require("../db/database");
// Clean the scores table before each test
beforeEach(() => {
    database_1.db.exec('DELETE FROM scores');
});
describe('POST /scores', () => {
    it('should create a score and return an id', async () => {
        const payload = {
            playerName: 'Alice',
            difficulty: 'easy',
            timeToSolve: 42,
        };
        const response = await (0, supertest_1.default)(index_1.default).post('/scores').send(payload);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        const id = response.body.id;
        // Verify that the record exists in the DB
        const row = database_1.db
            .prepare('SELECT * FROM scores WHERE id = ?')
            .get(id);
        expect(row).toBeDefined();
        expect(row.playerName).toBe(payload.playerName);
        expect(row.difficulty).toBe(payload.difficulty);
        expect(row.timeToSolve).toBe(payload.timeToSolve);
    });
    it('should reject invalid payload', async () => {
        const payload = { playerName: 'Bob', difficulty: 'easy' }; // missing timeToSolve
        const response = await (0, supertest_1.default)(index_1.default).post('/scores').send(payload);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});
