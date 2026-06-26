import request from 'supertest';
import { createApp } from '../index';
import { PuzzleDifficulty } from '@init-sudoku-post3/contracts';

const app = createApp();

describe('Puzzle Service Routes', () => {
  test('GET /puzzle returns a board for each difficulty', async () => {
    const difficulties: PuzzleDifficulty[] = ['easy', 'medium', 'hard'];
    for (const diff of difficulties) {
      const response = await request(app).get('/puzzle').query({ difficulty: diff });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('board');
      const board = response.body.board;
      expect(board).toHaveLength(9);
      board.forEach((row: any) => expect(row).toHaveLength(9));
    }
  });

  test('GET /puzzle with invalid difficulty returns 400', async () => {
    const response = await request(app).get('/puzzle').query({ difficulty: 'invalid' });
    expect(response.status).toBe(400);
  });

  test('POST /validate returns correct true for a solved board', async () => {
    // Use generator to produce a full solved board
    const { generateFullBoard } = await import('../utils/sudoku');
    const solved = generateFullBoard();
    const response = await request(app).post('/validate').send({ board: solved });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('correct', true);
  });

  test('POST /validate returns correct false for an invalid board', async () => {
    const { generateFullBoard } = await import('../utils/sudoku');
    const solved = generateFullBoard();
    // corrupt the board
    solved[0][0] = 0;
    const response = await request(app).post('/validate').send({ board: solved });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('correct', false);
  });
});
