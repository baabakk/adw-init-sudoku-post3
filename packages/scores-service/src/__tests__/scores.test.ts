import request from 'supertest';
import app from '../index';
import { db } from '../db/database';

// Clean the scores table before each test
beforeEach(() => {
  db.exec('DELETE FROM scores');
});

describe('POST /scores', () => {
  it('should create a score and return an id', async () => {
    const payload = {
      playerName: 'Alice',
      difficulty: 'easy',
      timeToSolve: 42,
    };
    const response = await request(app).post('/scores').send(payload);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    const id = response.body.id;
    // Verify that the record exists in the DB
    const row = db
      .prepare('SELECT * FROM scores WHERE id = ?')
      .get(id) as any;
    expect(row).toBeDefined();
    expect(row.playerName).toBe(payload.playerName);
    expect(row.difficulty).toBe(payload.difficulty);
    expect(row.timeToSolve).toBe(payload.timeToSolve);
  });

  it('should reject invalid payload', async () => {
    const payload = { playerName: 'Bob', difficulty: 'easy' }; // missing timeToSolve
    const response = await request(app).post('/scores').send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
