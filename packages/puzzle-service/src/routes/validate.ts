import { Request, Response, Router } from 'express';
import { validateSolution } from '../validator';
import { ValidateRequest, ValidateResponse } from '../types';

const router = Router();

router.post('/validate', (req: Request, res: Response) => {
  const body = req.body as ValidateRequest;
  if (!body || !Array.isArray(body.board) || body.board.length !== 9) {
    return res.status(400).json({ error: 'Invalid request payload' });
  }
  const correct = validateSolution(body.board);
  const response: ValidateResponse = { correct };
  res.json(response);
});

export default router;
