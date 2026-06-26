"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const database_1 = require("../db/database");
const scores_repository_1 = require("../db/scores-repository");
// Ensure a clean state before each test suite
beforeEach(() => {
    database_1.db.exec('DELETE FROM scores');
});
describe('Integration tests for Scores Service', () => {
    it('should record a score and retrieve it via leaderboard', async () => {
        const scorePayload = {
            playerName: 'IntegrationUser',
            difficulty: 'hard',
            timeToSolve: 77,
        };
        // POST /scores
        const postRes = await (0, supertest_1.default)(index_1.default).post('/scores').send(scorePayload);
        expect(postRes.status).toBe(201);
        expect(postRes.body).toHaveProperty('id');
        // Directly insert another score to test ordering
        (0, scores_repository_1.insertScore)({ playerName: 'FastUser', difficulty: 'hard', timeToSolve: 50 });
        // GET /leaderboard?difficulty=hard
        const getRes = await (0, supertest_1.default)(index_1.default).get('/leaderboard?difficulty=hard');
        expect(getRes.status).toBe(200);
        expect(getRes.body).toHaveProperty('entries');
        const entries = getRes.body.entries;
        // Should contain both entries, FastUser first (lower time)
        expect(entries[0].playerName).toBe('FastUser');
        expect(entries[0].timeToSolve).toBe(50);
        // Find the second entry
        const second = entries.find((e) => e.playerName === 'IntegrationUser');
        expect(second).toBeDefined();
        expect(second.timeToSolve).toBe(77);
    });
});
