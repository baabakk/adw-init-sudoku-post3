import express, { Request, Response, NextFunction } from 'express';
import scoresRouter from './routes/scores';
import leaderboardRouter from './routes/leaderboard';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount routers
app.use(scoresRouter);
app.use(leaderboardRouter);

// Simple health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Error handling middleware (fallback)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Scores service listening on port ${PORT}`);
  });
}

export default app;
