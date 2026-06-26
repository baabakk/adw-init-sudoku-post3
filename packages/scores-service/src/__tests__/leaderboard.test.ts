import request from 'supertest';
import app from '../index';
import { db } from '../db/database';
import { insertScore } from '../db/scores-repository';

// Clean the scores table before each test
beforeEach(() => {
  db.exec('DELETE FROM scores');
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
      insertScore(s);
    }

    const response = await request(app).get('/leaderboard?difficulty=medium');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('entries');
    const entries = response.body.entries as Array<{ playerName: string; timeToSolve: number }>;
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
    const response = await request(app).get('/leaderboard?difficulty=invalid');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
