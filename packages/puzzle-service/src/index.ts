import express, { Application } from 'express';
import bodyParser from 'body-parser';
import puzzleRouter from './routes/puzzle';
import validateRouter from './routes/validate';

// Create Express application
export const createApp = (): Application => {
  const app = express();
  app.use(bodyParser.json());
  // Mount routers
  app.use(puzzleRouter);
  app.use(validateRouter);
  // Simple health check
  app.get('/health', (_req, res) => res.send('OK'));
  return app;
};

// If this file is executed directly, start the server
if (require.main === module) {
  const PORT = process.env.PORT ?? 3000;
  const app = createApp();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Puzzle service listening on port ${PORT}`);
  });
}
