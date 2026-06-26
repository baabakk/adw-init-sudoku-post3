import { Router, Request, Response } from 'express';
import { addScore } from '../storage';
import type { ScoreRequest, ScoreResponse, PuzzleDifficulty } from '@init-sudoku-post3/contracts';

const router = Router();

/**
 * POST /scores
 * Accepts a ScoreRequest and returns a ScoreResponse with the generated id.
 */
router.post('/scores', (req: Request, res: Response) => {
  const body = req.body as Partial<ScoreRequest>;
  // Basic validation
  if (
    typeof body.playerName !== 'string' ||
    typeof body.difficulty !== 'string' ||
    typeof body.timeToSolve !== 'number'
  ) {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  const score: ScoreRequest = {
    playerName: body.playerName,
    // Cast after validation
    difficulty: body.difficulty as PuzzleDifficulty,
    timeToSolve: body.timeToSolve,
  };

  const id = addScore(score);
  const response: ScoreResponse = { id };
  res.status(201).json(response);
});

export default router;
