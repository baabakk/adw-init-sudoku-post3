import request from 'supertest';
import app from '../index';
import { db } from '../db/database';
import { insertScore } from '../db/scores-repository';

// Ensure a clean state before each test suite
beforeEach(() => {
  db.exec('DELETE FROM scores');
});

describe('Integration tests for Scores Service', () => {
  it('should record a score and retrieve it via leaderboard', async () => {
    const scorePayload = {
      playerName: 'IntegrationUser',
      difficulty: 'hard',
      timeToSolve: 77,
    };
    // POST /scores
    const postRes = await request(app).post('/scores').send(scorePayload);
    expect(postRes.status).toBe(201);
    expect(postRes.body).toHaveProperty('id');

    // Directly insert another score to test ordering
    insertScore({ playerName: 'FastUser', difficulty: 'hard', timeToSolve: 50 });

    // GET /leaderboard?difficulty=hard
    const getRes = await request(app).get('/leaderboard?difficulty=hard');
    expect(getRes.status).toBe(200);
    expect(getRes.body).toHaveProperty('entries');
    const entries = getRes.body.entries as Array<{ playerName: string; timeToSolve: number }>;
    // Should contain both entries, FastUser first (lower time)
    expect(entries[0].playerName).toBe('FastUser');
    expect(entries[0].timeToSolve).toBe(50);
    // Find the second entry
    const second = entries.find((e) => e.playerName === 'IntegrationUser');
    expect(second).toBeDefined();
    expect(second!.timeToSolve).toBe(77);
  });
});
