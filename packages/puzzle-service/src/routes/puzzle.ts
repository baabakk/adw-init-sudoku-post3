import { Request, Response, Router } from 'express';
import { generatePuzzle } from '../puzzleGenerator';
import { PuzzleResponse, PuzzleRequest } from '../types';

const router = Router();

router.get('/puzzle', (req: Request, res: Response) => {
  const difficulty = req.query.difficulty as PuzzleRequest['difficulty'];
  if (!difficulty || !['easy', 'medium', 'hard'].includes(difficulty)) {
    return res.status(400).json({ error: 'Invalid or missing difficulty' });
  }
  const board = generatePuzzle(difficulty);
  const response: PuzzleResponse = { board };
  res.json(response);
});

export default router;
