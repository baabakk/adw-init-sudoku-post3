import { db, initDatabase } from '../db/database';
import { insertScore, getTopScores } from '../db/scores-repository';
import type { ScoreRequest } from '@init-sudoku-post3/contracts';

beforeEach(() => {
  // Reset the database by dropping and recreating the table
  db.exec('DROP TABLE IF EXISTS scores');
  initDatabase();
});

describe('Database layer', () => {
  it('should create the scores table', () => {
    const row = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='scores'").get();
    expect(row).toBeDefined();
    expect(row.name).toBe('scores');
  });

  it('should insert a score and retrieve it via repository', () => {
    const score: ScoreRequest = {
      playerName: 'TestPlayer',
      difficulty: 'hard',
      timeToSolve: 123,
    };
    const id = insertScore(score);
    const stored = db.prepare('SELECT * FROM scores WHERE id = ?').get(id) as any;
    expect(stored).toBeDefined();
    expect(stored.playerName).toBe(score.playerName);
    expect(stored.difficulty).toBe(score.difficulty);
    expect(stored.timeToSolve).toBe(score.timeToSolve);
  });

  it('should return top scores ordered correctly', () => {
    const scores: ScoreRequest[] = [
      { playerName: 'A', difficulty: 'easy', timeToSolve: 50 },
      { playerName: 'B', difficulty: 'easy', timeToSolve: 30 },
      { playerName: 'C', difficulty: 'easy', timeToSolve: 40 },
    ];
    scores.forEach(insertScore);
    const top = getTopScores('easy');
    expect(top).toHaveLength(3);
    expect(top[0].playerName).toBe('B'); // fastest
    expect(top[1].playerName).toBe('C');
    expect(top[2].playerName).toBe('A');
  });
});
