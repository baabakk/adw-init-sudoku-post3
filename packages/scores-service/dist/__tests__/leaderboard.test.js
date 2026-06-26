"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const database_1 = require("../db/database");
const scores_repository_1 = require("../db/scores-repository");
// Clean the scores table before each test
beforeEach(() => {
    database_1.db.exec('DELETE FROM scores');
});
describe('GET /leaderboard', () => {
    it('should return top 10 entries sorted by timeToSolve', async () => {
        // Insert 12 scores with varying times
        const scores = Array.from({ length: 12 }, (_, i) => ({
            playerName: `Player${i}`,
            difficulty: 'medium',
            timeToSolve: 100 - i * 5, // decreasing times
        }));
        for (const s of scores) {
            (0, scores_repository_1.insertScore)(s);
        }
        const response = await (0, supertest_1.default)(index_1.default).get('/leaderboard?difficulty=medium');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('entries');
        const entries = response.body.entries;
        // Should return only top 10
        expect(entries).toHaveLength(10);
        // Verify sorting ascending (fastest time first)
        for (let i = 0; i < entries.length - 1; i++) {
            expect(entries[i].timeToSolve).toBeLessThanOrEqual(entries[i + 1].timeToSolve);
        }
        // The fastest (lowest time) should be Player11 (time 45)
        expect(entries[0].playerName).toBe('Player11');
    });
    it('should reject invalid difficulty', async () => {
        const response = await (0, supertest_1.default)(index_1.default).get('/leaderboard?difficulty=invalid');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});
