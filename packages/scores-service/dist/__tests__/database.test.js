"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../db/database");
const scores_repository_1 = require("../db/scores-repository");
beforeEach(() => {
    // Reset the database by dropping and recreating the table
    database_1.db.exec('DROP TABLE IF EXISTS scores');
    (0, database_1.initDatabase)();
});
describe('Database layer', () => {
    it('should create the scores table', () => {
        const row = database_1.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='scores'").get();
        expect(row).toBeDefined();
        expect(row.name).toBe('scores');
    });
    it('should insert a score and retrieve it via repository', () => {
        const score = {
            playerName: 'TestPlayer',
            difficulty: 'hard',
            timeToSolve: 123,
        };
        const id = (0, scores_repository_1.insertScore)(score);
        const stored = database_1.db.prepare('SELECT * FROM scores WHERE id = ?').get(id);
        expect(stored).toBeDefined();
        expect(stored.playerName).toBe(score.playerName);
        expect(stored.difficulty).toBe(score.difficulty);
        expect(stored.timeToSolve).toBe(score.timeToSolve);
    });
    it('should return top scores ordered correctly', () => {
        const scores = [
            { playerName: 'A', difficulty: 'easy', timeToSolve: 50 },
            { playerName: 'B', difficulty: 'easy', timeToSolve: 30 },
            { playerName: 'C', difficulty: 'easy', timeToSolve: 40 },
        ];
        scores.forEach(scores_repository_1.insertScore);
        const top = (0, scores_repository_1.getTopScores)('easy');
        expect(top).toHaveLength(3);
        expect(top[0].playerName).toBe('B'); // fastest
        expect(top[1].playerName).toBe('C');
        expect(top[2].playerName).toBe('A');
    });
});
