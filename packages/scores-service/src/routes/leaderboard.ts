import { Router, Request, Response } from 'express';
import { getTopScores } from '../storage';
import type { LeaderboardResponse, LeaderboardEntry, PuzzleDifficulty } from '@init-sudoku-post3/contracts';

const router = Router();

/**
 * GET /leaderboard?difficulty=easy|medium|hard
 * Returns the top 10 leaderboard entries for the given difficulty.
 */
router.get('/leaderboard', (req: Request, res: Response) => {
  const difficulty = req.query.difficulty as string;
  if (!difficulty || !['easy', 'medium', 'hard'].includes(difficulty)) {
    return res.status(400).json({ error: 'Invalid or missing difficulty parameter' });
  }

  const diff = difficulty as PuzzleDifficulty;
  const entries: LeaderboardEntry[] = getTopScores(diff);
  const response: LeaderboardResponse = { entries };
  res.json(response);
});

export default router;
